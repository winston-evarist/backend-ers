import mongoose from 'mongoose';

/*role schema*/
const schema = new mongoose.Schema<any>({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  permissions: {
    type: Array,
    required: true,
  },

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

  visible: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

/* role schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ description: -1 }, { background: true });
schema.index({ permissions: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*role model*/
const role = mongoose.model<any>('role', schema);

/*exporting role model*/
export default role