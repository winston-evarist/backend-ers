import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*device schema*/
const schema = new mongoose.Schema<any>({
  name: {
    type: String,
    required: true,
  },

  device_model: {
    type: String,
    default: null
  },

  imei: {
    type: String,
    default: null
  },

  keys: {
    type: Array,
    required: true,
  },

  values: {
    type: Array,
    required: true,
  },

  brand: {
    type: String,
    default: null
  },

  description: {
    type: String,
    required: true,
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customer',
    autopopulate: { maxDepth: 1 },
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'branch',
    autopopulate: { maxDepth: 1 },
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    autopopulate: { maxDepth: 1 },
  },

  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'user',
    autopopulate: { maxDepth: 1 },
  },

  month: {
    type: String,
    default: currentPeriod('month')
  },

  year: {
    type: Number,
    default: currentPeriod('year')
  },

  visible: {
    type: Boolean,
    default: true
  },

  type: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

/* device schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ type: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ device_model: -1 }, { background: true });
schema.index({ imei: -1 }, { background: true });
schema.index({ keys: -1 }, { background: true });
schema.index({ values: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ brand: -1 }, { background: true });
schema.index({ description: -1 }, { background: true });
schema.index({ customer: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*device model*/
const device = mongoose.model<any>('device', schema);

/*exporting device model*/
export default device