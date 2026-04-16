import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const podcastPlatforms = ["youtube", "tiktok", "spotify", "other"] as const;
const podcastStatuses = ["draft", "published"] as const;

const podcastEpisodeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      enum: podcastPlatforms,
      required: true,
    },
    externalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    embedUrl: {
      type: String,
      default: "",
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: podcastStatuses,
      default: "draft",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
      required: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

podcastEpisodeSchema.index({ status: 1, featured: -1, displayOrder: 1, publishedAt: -1 });

podcastEpisodeSchema.set("toJSON", {
  transform: (_, ret: Record<string, unknown>) => {
    ret.id = String(ret._id);
    delete ret._id;
    return ret;
  },
});

export type PodcastEpisodeDocument = InferSchemaType<typeof podcastEpisodeSchema>;

export const PodcastEpisodeModel: Model<PodcastEpisodeDocument> =
  models.PodcastEpisode ||
  model<PodcastEpisodeDocument>("PodcastEpisode", podcastEpisodeSchema);
