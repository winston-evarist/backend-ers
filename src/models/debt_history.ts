import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*debt_history schema*/
const schema = new mongoose.Schema<any>({
  debt: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'debt',
    autopopulate: { maxDepth: 1 },
  },

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

  total_amount: {
    type: Number,
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

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'branch',
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

}, {
  timestamps: true
});

/* debt_history schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ debt: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ total_amount: -1 }, { background: true });
schema.index({ description: -1 }, { background: true });
schema.index({ date: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ customer: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*debt_history model*/
const debt_history = mongoose.model<any>('debt_history', schema);

/*exporting debt_history model*/
export default debt_history