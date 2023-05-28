import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*expense schema*/
const schema = new mongoose.Schema<any>({
  name: {
    type: String,
    required: true,
  },

  total_amount: {
    type: Number,
    required: true,
  },

  paid_amount: {
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

  description: {
    type: String,
    required: true,
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

  expense_type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'expense_type',
    autopopulate: { maxDepth: 1 },
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'branch',
    autopopulate: { maxDepth: 1 },
  },

  visible: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

/* expense schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ total_amount: -1 }, { background: true });
schema.index({ paid_amount: -1 }, { background: true });
schema.index({ date: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.index({ description: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ expense_type: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*expense model*/
const expense = mongoose.model<any>('expense', schema);

/*exporting expense model*/
export default expense