const prisma = require("../../config/prisma");
const slugify = require("slugify");
const { enrichTikTokEpisodeData } = require("./tiktok-oembed.service");

const toNullableTrimmedString = (value) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

const buildEpisodeWriteData = (data) => ({
  title: data.title?.trim(),
  shortDescription: toNullableTrimmedString(data.shortDescription),
  fullDescription: toNullableTrimmedString(data.fullDescription),
  contentType: data.contentType || "EPISODE",
  platform: data.platform || "YOUTUBE",
  externalUrl: toNullableTrimmedString(data.externalUrl),
  embedUrl: toNullableTrimmedString(data.embedUrl),
  thumbnailUrl: toNullableTrimmedString(data.thumbnailUrl),
  episodeNumber: data.episodeNumber ? Number(data.episodeNumber) : null,
  seasonNumber: data.seasonNumber ? Number(data.seasonNumber) : null,
  duration: toNullableTrimmedString(data.duration),
  guests: toNullableTrimmedString(data.guests),
  publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
  status: data.status || "DRAFT",
  isFeatured: data.isFeatured ?? false,
  displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
});

const buildUniqueSlug = async (title) => {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.podcastEpisode.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

const getPublishedEpisodes = async () => {
  return prisma.podcastEpisode.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: [
      { isFeatured: "desc" },
      { displayOrder: "asc" },
      { publishedAt: "desc" },
    ],
  });
};

const getEpisodeBySlug = async (slug) => {
  return prisma.podcastEpisode.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });
};

const getAdminEpisodes = async () => {
  return prisma.podcastEpisode.findMany({
    orderBy: [
      { createdAt: "desc" },
    ],
  });
};

const getAdminEpisodeById = async (id) => {
  return prisma.podcastEpisode.findUnique({
    where: { id },
  });
};

const createEpisode = async (data) => {
  const enrichedData = await enrichTikTokEpisodeData(data, "create");

  if (!enrichedData.title || !enrichedData.title.trim()) {
    throw new Error("El título es obligatorio");
  }

  const slug = await buildUniqueSlug(enrichedData.title);

  const createData = {
    ...buildEpisodeWriteData(enrichedData),
    slug,
  };

  const episode = await prisma.podcastEpisode.create({ data: createData });

  console.info("[Podcast][create] Episodio guardado.", {
    id: episode.id,
    platform: episode.platform,
    externalUrl: episode.externalUrl,
    thumbnailUrl: episode.thumbnailUrl,
    thumbnailPersisted: Boolean(episode.thumbnailUrl),
  });

  return episode;
};

const updateEpisode = async (id, data) => {
  const enrichedData = await enrichTikTokEpisodeData(data, "update");

  if (!enrichedData.title || !enrichedData.title.trim()) {
    throw new Error("El título es obligatorio");
  }

  const updateData = buildEpisodeWriteData(enrichedData);
  const episode = await prisma.podcastEpisode.update({
    where: { id },
    data: updateData,
  });

  console.info("[Podcast][update] Episodio actualizado.", {
    id: episode.id,
    platform: episode.platform,
    externalUrl: episode.externalUrl,
    thumbnailUrl: episode.thumbnailUrl,
    thumbnailPersisted: Boolean(episode.thumbnailUrl),
  });

  return episode;
};

const deleteEpisode = async (id) => {
  return prisma.podcastEpisode.delete({
    where: { id },
  });
};

const updateEpisodeStatus = async (id, status) => {
  return prisma.podcastEpisode.update({
    where: { id },
    data: { status },
  });
};

const toggleFeaturedEpisode = async (id, isFeatured) => {
  return prisma.podcastEpisode.update({
    where: { id },
    data: { isFeatured },
  });
};

module.exports = {
  getPublishedEpisodes,
  getEpisodeBySlug,
  getAdminEpisodes,
  getAdminEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  updateEpisodeStatus,
  toggleFeaturedEpisode,
};
