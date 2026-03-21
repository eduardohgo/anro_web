const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ninguna imagen" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/podcast/${req.file.filename}`;

    return res.status(201).json({
      message: "Imagen subida correctamente",
      filename: req.file.filename,
      imageUrl,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al subir imagen",
    });
  }
};

module.exports = {
  uploadImage,
};