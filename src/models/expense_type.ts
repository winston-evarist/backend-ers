import mongoose from 'mongoose';

/*expense_type schema*/
const schema = new mongoose.Schema<any>({
  name: {
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

/* expense_type schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ name: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ updated_by: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*expense_type model*/
const expense_type = mongoose.model<any>('expense_type', schema);

/*exporting expense_type model*/
export default expense_type