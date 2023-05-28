import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*payment schema*/
const schema = new mongoose.Schema<any>({
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'branch',
    autopopulate: { maxDepth: 1 },
  },

  days: {
    type: Number,
    required: true,
  },

  agent: {
    type: String,
    required: true,
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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

  total_amount: {
    type: Number,
    required: true
  },

  visible: {
    type: Boolean,
    default: true
  },

  package: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

/* payment schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ days: -1 }, { background: true });
schema.index({ agent: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.index({ total_amount: -1 }, { background: true });
schema.index({ package: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*payment model*/
const payment = mongoose.model<any>('payment', schema);

/*exporting payment model*/
export default payment