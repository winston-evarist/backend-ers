import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*purchase schema*/
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

  total_amount: {
    type: Number,
    required: true,
  },

  paid_amount: {
    type: Number,
    default: 0
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product',
    autopopulate: { maxDepth: 1 },
  },

  quantity: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
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

  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'supplier',
    autopopulate: { maxDepth: 1 },
  },

  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'manufacturer',
    autopopulate: { maxDepth: 1 },
  },

  visible: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

/* purchase schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ total_amount: -1 }, { background: true });
schema.index({ paid_amount: -1 }, { background: true });
schema.index({ product: -1 }, { background: true });
schema.index({ quantity: -1 }, { background: true });
schema.index({ date: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.index({ supplier: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ manufacture: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*purchase model*/
const purchase = mongoose.model<any>('purchase', schema);

/*exporting purchase model*/
export default purchase