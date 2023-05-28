import mongoose from 'mongoose';
import  currentPeriod  from '../helpers/currentPeriod';

/*customer schema*/
const schema = new mongoose.Schema<any>({
  name: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
    required: true,
  },

  location: {
    type: String,
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

  tin: {
    type: String,
    default: null
  }

}, {
  timestamps: true
});

/* customer schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ location: -1 }, { background: true });
schema.index({ phone_number: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.index({ tin: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*customer model*/
const customer = mongoose.model<any>('customer', schema);

/*exporting customer model*/
export default customer