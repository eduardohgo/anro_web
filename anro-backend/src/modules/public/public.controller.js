const publicService = require("./public.service");

const getHomeContent = async (req, res) => {
  try {
    const homeContent = await publicService.getPublicHomeContent();

    if (!homeContent) {
      return res.status(404).json({
        message: "Contenido público de home no encontrado",
      });
    }

    return res.status(200).json(homeContent);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener contenido público de home",
    });
  }
};

module.exports = {
  getHomeContent,
};
