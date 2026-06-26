import mongoose, { type Document, Schema } from 'mongoose';
import type { IContactSubmission } from '@/types';

const ContactSubmissionSchema = new Schema<IContactSubmission & Document>(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 254 },
    phone: { type: String, maxlength: 10 },
    projectType: { type: String, required: true, maxlength: 1000 },
    budget: {
      type: String,
      required: true,
      enum: ['under-1k', '1k-3k', '3k-7k', '7k-plus', 'not-sure'],
    },
    timeline: {
      type: String,
      required: true,
      enum: ['asap', '1-3-months', '3-plus-months', 'flexible'],
    },
    message: { type: String, maxlength: 2000 },
    ip: { type: String, required: true },
    userAgent: { type: String },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
  },
  { timestamps: true, collection: 'leads' },
);

export const ContactSubmission =
  mongoose.models['ContactSubmission'] ??
  mongoose.model<IContactSubmission & Document>('ContactSubmission', ContactSubmissionSchema);
