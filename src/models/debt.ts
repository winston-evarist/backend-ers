import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*debt schema*/
const schema = new mongoose.Schema<any>({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customer',
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

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'branch',
    autopopulate: { maxDepth: 1 },
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'product',
    autopopulate: { maxDepth: 1 },
  },

  sale: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'sale',
    autopopulate: { maxDepth: 1 },
  },

  total_amount: {
    type: Number,
    required: true,
  },

  paid_amount: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  editable: {
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

  visible: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

/* debt schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ customer: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ total_amount: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ status: -1 }, { background: true });
schema.index({ type: -1 }, { background: true });
schema.index({ description: -1 }, { background: true });
schema.index({ date: -1 }, { background: true });
schema.index({ paid_amount: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*debt model*/
const debt = mongoose.model<any>('debt', schema);

/*exporting debt model*/
export default debt