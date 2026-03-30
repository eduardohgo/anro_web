const TIKTOK_OEMBED_ENDPOINT = "https://www.tiktok.com/oembed";

function isTikTokEpisode(data = {}) {
  return data.platform === "TIKTOK";
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

async function fetchTikTokOEmbed(externalUrl) {
  const encodedUrl = encodeURIComponent(externalUrl);
  const endpoint = `${TIKTOK_OEMBED_ENDPOINT}?url=${encodedUrl}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TikTok oEmbed respondió con status ${response.status}`);
  }

  return response.json();
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
    const oEmbed = await fetchTikTokOEmbed(data.externalUrl.trim());
    const nextData = { ...data };

    if (needsThumbnail && hasText(oEmbed?.thumbnail_url)) {
      nextData.thumbnailUrl = oEmbed.thumbnail_url.trim();
    }

    if (needsTitle && hasText(oEmbed?.title)) {
      nextData.title = oEmbed.title.trim();
    }

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
