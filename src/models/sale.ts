import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*sale schema*/
const schema = new mongoose.Schema<any>({
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

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product',
    autopopulate: { maxDepth: 1 },
  },

  total_amount: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0
  },

  quantity: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    default: "cart"
  },

  month: {
    type: String,
    default: currentPeriod('month')
  },

  year: {
    type: Number,
    default: currentPeriod('year')
  },

  profit: {
    type: Number,
    required: true,
  },

  visible: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

/* sale schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ customer: -1 }, { background: true });
schema.index({ product: -1 }, { background: true });
schema.index({ total_amount: -1 }, { background: true });
schema.index({ discount: -1 }, { background: true });
schema.index({ quantity: -1 }, { background: true });
schema.index({ status: -1 }, { background: true });
schema.index({ type: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.index({ profit: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*sale model*/
const sale = mongoose.model<any>('sale', schema);

/*exporting sale model*/
export default sale