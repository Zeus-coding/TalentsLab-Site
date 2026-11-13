import { describe, expect, it } from "vitest";

import { SITE_URL, absoluteUrl, organizationJsonLd, organizationSchema, socialMeta } from "./seo";

type Meta = ReturnType<typeof socialMeta>;

function find(meta: Meta, key: string) {
  return meta.find(
    (tag) => ("property" in tag && tag.property === key) || ("name" in tag && tag.name === key),
  ) as { content?: string } | undefined;
}

describe("absoluteUrl", () => {
  it("trasforma un percorso in un indirizzo completo del sito", () => {
    expect(absoluteUrl("/about")).toBe(`${SITE_URL}/about`);
    expect(absoluteUrl("/")).toBe(`${SITE_URL}/`);
  });
});

describe("socialMeta", () => {
  it("usa indirizzi assoluti per og:url e og:image (i social non leggono quelli relativi)", () => {
    const meta = socialMeta({ title: "Shop", path: "/shop" });
    expect(find(meta, "og:url")?.content).toBe(`${SITE_URL}/shop`);
    expect(find(meta, "og:image")?.content).toMatch(/^https:\/\//);
    expect(find(meta, "twitter:image")?.content).toBe(find(meta, "og:image")?.content);
  });

  it("riporta lo stesso titolo nel tag title, in Open Graph e in Twitter", () => {
    const meta = socialMeta({ title: "News" });
    expect(meta[0]).toEqual({ title: "News" });
    expect(find(meta, "og:title")?.content).toBe("News");
    expect(find(meta, "twitter:title")?.content).toBe("News");
  });
});

describe("dati strutturati", () => {
  it("il logo punta a un file immagine, non alla home", () => {
    expect(organizationSchema().logo).toMatch(/\.(png|webp|jpe?g)$/);
  });

  it("non contiene mai '<' (impedisce di chiudere in anticipo il tag script)", () => {
    const json = organizationJsonLd();
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual(organizationSchema());
  });
});
