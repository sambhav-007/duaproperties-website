import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    price: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    type: {
      type: String,
      required: true,
      enum: [
        '1BHK',
        '2BHK',
        '3BHK',
        '4BHK',
        '5BHK',
        'plot',
        'villa',
        'apartment',
        'commercial',
        'independent-floor',
        'penthouse',
        'studio',
        'other',
      ],
    },
    images: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    featuredInSlideshow: {
      type: Boolean,
      default: false,
      index: true,
    },
    video_url: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },
    description: {
      type: String,
      default: '',
      maxlength: 5000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
