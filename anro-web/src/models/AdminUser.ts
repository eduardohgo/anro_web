import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const adminRole = ["admin"] as const;

const adminUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      enum: adminRole,
      default: "admin",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

adminUserSchema.set("toJSON", {
  transform: (_, ret: Record<string, unknown>) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.passwordHash;
    return ret;
  },
});

export type AdminUserDocument = InferSchemaType<typeof adminUserSchema>;

export const AdminUser: Model<AdminUserDocument> =
  models.AdminUser || model<AdminUserDocument>("AdminUser", adminUserSchema);
