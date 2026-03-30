const prisma = require("../../config/prisma");
const slugify = require("slugify");
const { enrichTikTokEpisodeData } = require("./tiktok-oembed.service");

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

  return prisma.podcastEpisode.create({
    data: {
      title: enrichedData.title,
      slug,
      shortDescription: enrichedData.shortDescription || null,
      fullDescription: enrichedData.fullDescription || null,
      contentType: enrichedData.contentType || "EPISODE",
      platform: enrichedData.platform || "YOUTUBE",
      externalUrl: enrichedData.externalUrl || null,
      embedUrl: enrichedData.embedUrl || null,
      thumbnailUrl: enrichedData.thumbnailUrl || null,
      episodeNumber: enrichedData.episodeNumber ? Number(enrichedData.episodeNumber) : null,
      seasonNumber: enrichedData.seasonNumber ? Number(enrichedData.seasonNumber) : null,
      duration: enrichedData.duration || null,
      guests: enrichedData.guests || null,
      publishedAt: enrichedData.publishedAt ? new Date(enrichedData.publishedAt) : null,
      status: enrichedData.status || "DRAFT",
      isFeatured: enrichedData.isFeatured ?? false,
      displayOrder: enrichedData.displayOrder ? Number(enrichedData.displayOrder) : 0,
    },
  });
};

const updateEpisode = async (id, data) => {
  const enrichedData = await enrichTikTokEpisodeData(data, "update");

  if (!enrichedData.title || !enrichedData.title.trim()) {
    throw new Error("El título es obligatorio");
  }

  return prisma.podcastEpisode.update({
    where: { id },
    data: {
      title: enrichedData.title,
      shortDescription: enrichedData.shortDescription || null,
      fullDescription: enrichedData.fullDescription || null,
      contentType: enrichedData.contentType || "EPISODE",
      platform: enrichedData.platform || "YOUTUBE",
      externalUrl: enrichedData.externalUrl || null,
      embedUrl: enrichedData.embedUrl || null,
      thumbnailUrl: enrichedData.thumbnailUrl || null,
      episodeNumber: enrichedData.episodeNumber ? Number(enrichedData.episodeNumber) : null,
      seasonNumber: enrichedData.seasonNumber ? Number(enrichedData.seasonNumber) : null,
      duration: enrichedData.duration || null,
      guests: enrichedData.guests || null,
      publishedAt: enrichedData.publishedAt ? new Date(enrichedData.publishedAt) : null,
      status: enrichedData.status || "DRAFT",
      isFeatured: enrichedData.isFeatured ?? false,
      displayOrder: enrichedData.displayOrder ? Number(enrichedData.displayOrder) : 0,
    },
  });
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