import mongoose from 'mongoose';

/*webpush schema*/
const schema = new mongoose.Schema<any>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    autopopulate: { maxDepth: 1 },
  },

  endpoint: {
    type: String,
    required: true,
  },

  keys: {
    type: Object,
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
  },

}, {
  timestamps: true
});

/* webpush schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ user: -1 }, { background: true });
schema.index({ endpoint: -1 }, { background: true });
schema.index({ keys: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*webpush model*/
const webpush = mongoose.model<any>('webpush', schema);

/*exporting webpush model*/
export default webpush