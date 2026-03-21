const podcastService = require("./podcast.service");

const getEpisodes = async (req, res) => {
  try {
    const episodes = await podcastService.getPublishedEpisodes();
    return res.status(200).json(episodes);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener episodios" });
  }
};

const getEpisodeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const episode = await podcastService.getEpisodeBySlug(slug);

    if (!episode) {
      return res.status(404).json({ message: "Episodio no encontrado" });
    }

    return res.status(200).json(episode);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener episodio" });
  }
};

const getAdminEpisodes = async (req, res) => {
  try {
    const episodes = await podcastService.getAdminEpisodes();
    return res.status(200).json(episodes);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener episodios del panel" });
  }
};

const getAdminEpisodeById = async (req, res) => {
  try {
    const episode = await podcastService.getAdminEpisodeById(req.params.id);

    if (!episode) {
      return res.status(404).json({ message: "Episodio no encontrado" });
    }

    return res.status(200).json(episode);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener episodio" });
  }
};

const createEpisode = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    const episode = await podcastService.createEpisode(req.body);
    return res.status(201).json(episode);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al crear episodio",
    });
  }
};

const updateEpisode = async (req, res) => {
  try {
    const episode = await podcastService.updateEpisode(req.params.id, req.body);
    return res.status(200).json(episode);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al actualizar episodio",
    });
  }
};

const deleteEpisode = async (req, res) => {
  try {
    await podcastService.deleteEpisode(req.params.id);
    return res.status(200).json({ message: "Episodio eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al eliminar episodio",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }

    const episode = await podcastService.updateEpisodeStatus(req.params.id, status);
    return res.status(200).json(episode);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al cambiar status",
    });
  }
};

const toggleFeatured = async (req, res) => {
  try {
    const { isFeatured } = req.body;

    const episode = await podcastService.toggleFeaturedEpisode(
      req.params.id,
      Boolean(isFeatured)
    );

    return res.status(200).json(episode);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al actualizar destacado",
    });
  }
};

module.exports = {
  getEpisodes,
  getEpisodeBySlug,
  getAdminEpisodes,
  getAdminEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  updateStatus,
  toggleFeatured,
};