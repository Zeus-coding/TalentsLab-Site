import { describe, expect, it, vi } from "vitest";

import { MAILERLITE_ENDPOINT, subscribe } from "./newsletter.core";

const input = { email: "fan@example.com", source: "footer" as const };

// fetch finto: risponde con lo stato richiesto senza contattare MailerLite.
function fakeFetch(status: number) {
  return vi.fn(async (_url: string, _init?: RequestInit) => new Response("{}", { status }));
}

const quiet = () => {};

describe("subscribe", () => {
  it.each([
    [201, "subscribed"],
    [200, "already"],
    [422, "invalid_email"],
    [500, "error"],
  ])("MailerLite risponde %i → %s", async (status, expected) => {
    const result = await subscribe(input, {
      apiKey: "key",
      fetchImpl: fakeFetch(status) as unknown as typeof fetch,
      log: quiet,
    });
    expect(result).toEqual({ status: expected });
  });

  it("invia email, provenienza e gruppo con il token nell'intestazione", async () => {
    const fetchImpl = fakeFetch(201);
    await subscribe(
      { ...input, source: "shop" },
      { apiKey: "key", groupId: "42", fetchImpl: fetchImpl as unknown as typeof fetch, log: quiet },
    );

    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(MAILERLITE_ENDPOINT);
    expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer key");
    expect(JSON.parse(init?.body as string)).toEqual({
      email: "fan@example.com",
      fields: { source: "shop" },
      groups: ["42"],
    });
  });

  it("se la rete non risponde restituisce error", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("offline");
    });
    const result = await subscribe(input, {
      apiKey: "key",
      fetchImpl: fetchImpl as unknown as typeof fetch,
      log: quiet,
    });
    expect(result).toEqual({ status: "error" });
  });

  it.each([undefined, "", "INCOLLA_QUI_IL_TOKEN"])(
    "senza un token valido (%s) non chiama MailerLite",
    async (apiKey) => {
      const fetchImpl = fakeFetch(201);
      const result = await subscribe(input, {
        apiKey,
        fetchImpl: fetchImpl as unknown as typeof fetch,
        log: quiet,
      });
      expect(result).toEqual({ status: "not_configured" });
      expect(fetchImpl).not.toHaveBeenCalled();
    },
  );

  it("se il campo trappola è compilato (bot) finge il successo ma non salva nulla", async () => {
    const fetchImpl = fakeFetch(201);
    const result = await subscribe(
      { ...input, website: "http://spam.example" },
      { apiKey: "key", fetchImpl: fetchImpl as unknown as typeof fetch, log: quiet },
    );
    expect(result).toEqual({ status: "subscribed" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
