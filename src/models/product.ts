import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*product schema*/
const schema = new mongoose.Schema<any>({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    autopopulate: { maxDepth: 1 },
    default: null
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

  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'unit',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  name: {
    type: String,
    required: true,
  },

  generic_name: {
    type: String,
    default: null
  },

  description: {
    type: String,
    default: null
  },

  manufactured_date: {
    type: Date,
    default: null
  },

  expire_date: {
    type: Date,
    default: null
  },

  buying_price: {
    type: Number,
    required: true,
  },

  selling_price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  reorder_stock_level: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batch',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  type: {
    type: String,
    default: null
  },

  barcode: {
    type: String,
    default: null
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

/* product schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ category: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ supplier: -1 }, { background: true });
schema.index({ manufacture: -1 }, { background: true });
schema.index({ unit: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ generic_name: -1 }, { background: true });
schema.index({ description: -1 }, { background: true });
schema.index({ manufactured_date: -1 }, { background: true });
schema.index({ expire_date: -1 }, { background: true });
schema.index({ buying_price: -1 }, { background: true });
schema.index({ selling_price: -1 }, { background: true });
schema.index({ stock: -1 }, { background: true });
schema.index({ reorder_stock_level: -1 }, { background: true });
schema.index({ quantity: -1 }, { background: true });
schema.index({ batch: -1 }, { background: true });
schema.index({ type: -1 }, { background: true });
schema.index({ barcode: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*product model*/
const product = mongoose.model<any>('product', schema);

/*exporting product model*/
export default product