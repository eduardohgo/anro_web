import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI es requerido.");
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL y ADMIN_PASSWORD son requeridos.");
}

const adminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "" },
    role: { type: String, enum: ["admin"], default: "admin" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const admin = await AdminUser.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase().trim() },
    {
      $set: {
        passwordHash,
        name: ADMIN_NAME ?? "Administrador ANRO",
        role: "admin",
        isActive: true,
      },
    },
    { new: true, upsert: true }
  );

  console.log(`Admin listo: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Error create-admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
