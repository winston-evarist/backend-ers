import mongoose from 'mongoose'

/* activity schema */
const schema = new mongoose.Schema<any>({
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        default: null,
        autopopulate: { maxDepth: 1 }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: { maxDepth: 1 }
    },

    data: {
        type: Object,
        required: true
    },

    activity_model: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    visible: {
        type: Boolean,
        default: true
    },

    restored: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

/* activity schema indexing */
schema.index({ branch: -1 }, { background: true })
schema.index({ user: -1 }, { background: true })
schema.index({ name: -1 }, { background: true })
schema.index({ activity_model: -1 }, { background: true })
schema.index({ createdAt: -1 }, { background: true })
schema.index({ updatedAt: -1 }, { background: true })
schema.index({ visible: -1 }, { background: true })
schema.index({ restored: -1 }, { background: true })

/* activity schema plugin */
schema.plugin(require('mongoose-autopopulate'))

/* activity model */
const activity = mongoose.model<any>('activity', schema)

/* export activity schema for global accessibility */

export default activity