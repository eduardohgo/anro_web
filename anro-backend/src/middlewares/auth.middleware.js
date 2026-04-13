const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const hasAdminRole = (role) => {
  if (typeof role !== "string") return false;
  return role.trim().toUpperCase().includes("ADMIN");
};

const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!hasAdminRole(decoded.role)) {
      return res.status(403).json({ message: "Permisos insuficientes" });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!admin || !admin.isActive || !hasAdminRole(admin.role)) {
      return res.status(401).json({ message: "Usuario no autorizado" });
    }

    req.user = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = {
  protectAdmin,
};
