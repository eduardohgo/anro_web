const TIKTOK_OEMBED_ENDPOINT = "https://www.tiktok.com/oembed";
const OEMBED_TIMEOUT_MS = 7000;

function isTikTokEpisode(data = {}) {
  return data.platform === "TIKTOK";
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function canBeShortTikTokUrl(externalUrl) {
  try {
    const parsed = new URL(externalUrl);
    const host = parsed.hostname.toLowerCase();
    return host === "vt.tiktok.com" || host === "vm.tiktok.com" || parsed.pathname.startsWith("/t/");
  } catch {
    return false;
  }
}

async function resolveTikTokPublicUrl(externalUrl) {
  if (!canBeShortTikTokUrl(externalUrl)) {
    return externalUrl;
  }

  try {
    const response = await fetch(externalUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "ANRO-Podcast/1.0 (+https://anro.test)",
      },
    });

    if (response.url) {
      return response.url;
    }
  } catch (error) {
    console.warn("[Podcast][TikTok oEmbed] No se pudo resolver URL corta.", {
      externalUrl,
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }

  return externalUrl;
}

async function fetchTikTokOEmbed(externalUrl) {
  const endpoint = new URL(TIKTOK_OEMBED_ENDPOINT);
  endpoint.searchParams.set("url", externalUrl);
  endpoint.searchParams.set("omitscript", "true");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OEMBED_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "ANRO-Podcast/1.0 (+https://anro.test)",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`TikTok oEmbed respondió con status ${response.status}`);
  }

  const payload = await response.json();
  return payload;
}

async function enrichTikTokEpisodeData(data = {}, context = "create") {
  if (!isTikTokEpisode(data) || !hasText(data.externalUrl)) {
    return data;
  }

  const needsThumbnail = !hasText(data.thumbnailUrl);
  const needsTitle = !hasText(data.title);

  if (!needsThumbnail && !needsTitle) {
    return data;
  }

  try {
    const resolvedExternalUrl = await resolveTikTokPublicUrl(data.externalUrl.trim());
    const oEmbed = await fetchTikTokOEmbed(resolvedExternalUrl);
    const nextData = { ...data, externalUrl: resolvedExternalUrl };

    if (needsThumbnail && hasText(oEmbed?.thumbnail_url)) {
      nextData.thumbnailUrl = oEmbed.thumbnail_url.trim();
    } else if (needsThumbnail) {
      console.warn(
        `[Podcast][TikTok oEmbed][${context}] oEmbed sin thumbnail_url utilizable.`,
        {
          externalUrl: data.externalUrl,
          thumbnail_url: oEmbed?.thumbnail_url ?? null,
        }
      );
    }

    if (needsTitle && hasText(oEmbed?.title)) {
      nextData.title = oEmbed.title.trim();
    }

    console.info(
      `[Podcast][TikTok oEmbed][${context}] Enriquecimiento aplicado.`,
      {
        externalUrl: data.externalUrl,
        thumbnailResolved: hasText(nextData.thumbnailUrl),
        titleResolved: hasText(nextData.title),
      }
    );

    return nextData;
  } catch (error) {
    console.warn(
      `[Podcast][TikTok oEmbed][${context}] No se pudo enriquecer episodio automáticamente.`,
      {
        externalUrl: data.externalUrl,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    );
    return data;
  }
}

module.exports = {
  enrichTikTokEpisodeData,
};
