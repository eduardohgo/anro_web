const authService = require("./auth.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginAdmin({ email, password });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Error al iniciar sesión",
    });
  }
};

const me = async (req, res) => {
  try {
    const admin = await authService.getAdminById(req.user.id);

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener usuario",
    });
  }
};

module.exports = {
  login,
  me,
};