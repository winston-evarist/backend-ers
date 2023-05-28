import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*service schema*/
const schema = new mongoose.Schema<any>({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'device',
    autopopulate: { maxDepth: 1 },
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
    ref: 'user',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  service_name: {
    type: String,
    required: true,
  },

  service_cost: {
    type: Number,
    required: true,
  },

  service_description: {
    type: String,
    required: true,
  },

  product_cost: {
    type: Number,
    default: 0
  },

  discount: {
    type: Number,
    default: 0
  },

  profit: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
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

}, {
  timestamps: true
});

/* service schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ device: -1 }, { background: true });
schema.index({ customer: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ product: -1 }, { background: true });
schema.index({ service_name: -1 }, { background: true });
schema.index({ service_cost: -1 }, { background: true });
schema.index({ service_description: -1 }, { background: true });
schema.index({ product_cost: -1 }, { background: true });
schema.index({ discount: -1 }, { background: true });
schema.index({ profit: -1 }, { background: true });
schema.index({ status: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*service model*/
const service = mongoose.model<any>('service', schema);

/*exporting service model*/
export default service