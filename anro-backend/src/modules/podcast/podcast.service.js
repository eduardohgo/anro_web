const prisma = require("../../config/prisma");
const slugify = require("slugify");

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
  const slug = await buildUniqueSlug(data.title);

  return prisma.podcastEpisode.create({
    data: {
      title: data.title,
      slug,
      shortDescription: data.shortDescription || null,
      fullDescription: data.fullDescription || null,
      contentType: data.contentType || "EPISODE",
      platform: data.platform || "YOUTUBE",
      externalUrl: data.externalUrl || null,
      embedUrl: data.embedUrl || null,
      thumbnailUrl: data.thumbnailUrl || null,
      episodeNumber: data.episodeNumber ? Number(data.episodeNumber) : null,
      seasonNumber: data.seasonNumber ? Number(data.seasonNumber) : null,
      duration: data.duration || null,
      guests: data.guests || null,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      status: data.status || "DRAFT",
      isFeatured: data.isFeatured ?? false,
      displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
    },
  });
};

const updateEpisode = async (id, data) => {
  return prisma.podcastEpisode.update({
    where: { id },
    data: {
      title: data.title,
      shortDescription: data.shortDescription || null,
      fullDescription: data.fullDescription || null,
      contentType: data.contentType || "EPISODE",
      platform: data.platform || "YOUTUBE",
      externalUrl: data.externalUrl || null,
      embedUrl: data.embedUrl || null,
      thumbnailUrl: data.thumbnailUrl || null,
      episodeNumber: data.episodeNumber ? Number(data.episodeNumber) : null,
      seasonNumber: data.seasonNumber ? Number(data.seasonNumber) : null,
      duration: data.duration || null,
      guests: data.guests || null,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      status: data.status || "DRAFT",
      isFeatured: data.isFeatured ?? false,
      displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
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