import mongoose, { type Document, Schema } from 'mongoose';
import type { ISubscriber } from '@/types';

const SubscriberSchema = new Schema<ISubscriber & Document>(
  {
    email: {
      type: String,
      required: true,
      maxlength: 254,
      unique: true,
      lowercase: true,
      trim: true,
    },
    source: { type: String, required: true, default: 'timed-modal' },
    ip: { type: String, required: true },
    userAgent: { type: String },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed'],
      default: 'subscribed',
    },
  },
  { timestamps: true, collection: 'subscribers' },
);

export const Subscriber =
  mongoose.models['Subscriber'] ??
  mongoose.model<ISubscriber & Document>('Subscriber', SubscriberSchema);
