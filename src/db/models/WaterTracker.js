import { model, Schema } from 'mongoose';

const WaterTrackerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WaterTrackerCollection = model('waterTracker', WaterTrackerSchema);
export default WaterTrackerCollection;
