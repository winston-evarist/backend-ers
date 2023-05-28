import mongoose from 'mongoose';
import currentPeriod from '../helpers/currentPeriod';

/*branch schema*/
const schema = new mongoose.Schema<any>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    autopopulate: { maxDepth: 1 },
  },

  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  location: {
    type: String,
    default: null
  },

  phone_number: {
    type: String,
    required: true
  },

  tin: {
    type: String,
    default: null
  },

  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  days: {
    type: Number,
    default: 0
  },

  visible: {
    type: Boolean,
    default: true
  },

  month: {
    type: String,
    default: currentPeriod('month')
  },

  year: {
    type: Number,
    default: currentPeriod('year')
  },

  package: {
    type: String,
    default: 'premium'
  }

}, {
  timestamps: true
});

/* branch schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ user: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ location: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ type: -1 }, { background: true });
schema.index({ days: -1 }, { background: true });
schema.index({ phone_number: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ tin: -1 }, { background: true });
schema.index({ package: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*branch model*/
const branch = mongoose.model<any>('branch', schema);

/*exporting branch model*/
export default branch