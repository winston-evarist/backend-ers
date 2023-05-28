import mongoose from 'mongoose'

/* store schema */
const schema = new mongoose.Schema<any>({
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        required: true,
        autopopulate: { maxDepth: 1 }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: { maxDepth: 1 }
    },

    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: { maxDepth: 1 },
        default: null
    },

    name: {
        type: String,
        requires: true
    },

    visible: {
        type: Boolean,
        default: true
      },
}, {
    timestamps: true
})

/* store schema indexing */
schema.index({ branch: -1 }, { background: true })
schema.index({ visible: -1 }, { background: true });
schema.index({ user: -1 }, { background: true })
schema.index({ updated_by: -1 }, { background: true })
schema.index({ name: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })

// mongoose population plugin
schema.plugin(require('mongoose-autopopulate'))


/* creating store model  */
const store = mongoose.model<any>('store', schema)

/* exporting model*/
export default store