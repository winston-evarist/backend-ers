import mongoose from 'mongoose';
import currentPeriod from '../helpers/currentPeriod';

/*user schema*/
const schema = new mongoose.Schema<any>({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  phone_number: {
    type: String,
    required: true,
    unique: true,
  },

  phone_number_verified: {
    type: Boolean,
    default: false
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'branch',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role',
    autopopulate: { maxDepth: 1 },
    default: null
  },

  password: {
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

  setting: {
    type: Object,
    required: true
  },

  account_type: {
    type: String,
    default: 'user'
  },

  visible: {
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

}, {
  timestamps: true
});

/* user schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ phone_number_verified: -1 }, { background: true });
schema.index({ role: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ month: -1 }, { background: true });
schema.index({ year: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*user model*/
const user = mongoose.model<any>('user', schema);

/*exporting user model*/
export default user