import mongoose from 'mongoose';

/*manufacture schema*/
const schema = new mongoose.Schema<any>({
  name: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
    default: null
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

  visible: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

/* manufacture schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ phone_number: -1 }, { background: true });
schema.index({ location: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*manufacture model*/
const manufacturer = mongoose.model<any>('manufacturer', schema);

/*exporting manufacture model*/
export default manufacturer