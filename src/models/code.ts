import mongoose from 'mongoose';

/*code schema*/
const schema = new mongoose.Schema<any>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    autopopulate: { maxDepth: 2 },
  },

  code: {
    type: Number,
    required: true,
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
  }

}, {
  timestamps: true
});

/* code schema indexing*/
schema.index({ createdAt: 1 }, { expireAfterSeconds: 300 })
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ user: -1 }, { background: true });
schema.index({ code: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*code model*/
const code = mongoose.model<any>('code', schema);

/*exporting code model*/
export default code