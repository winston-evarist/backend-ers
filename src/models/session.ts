import mongoose from 'mongoose';

/*session schema*/
const schema = new mongoose.Schema<any>({
  status: {
    type: String,
    default: 'active'
  },

  user: {
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
    ref: 'branch',
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

/* session schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ status: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*session model*/
const session = mongoose.model<any>('session', schema);

/*exporting session model*/
export default session