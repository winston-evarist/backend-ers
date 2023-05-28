import mongoose from 'mongoose'

/* order schema */
const schema = new mongoose.Schema<any>({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        autopopulate: { maxDepth: 1 },
    },

    branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'branch',
        autopopulate: { maxDepth: 1 },
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'customer',
        autopopulate: { maxDepth: 1 },
    },

    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'sale',
        autopopulate: { maxDepth: 2 },
    }],

    type: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

/* order schema indexing*/
schema.index({ createdAt: -1 }, { background: true });
schema.index({ updatedAt: -1 }, { background: true });
schema.index({ customer: -1 }, { background: true });
schema.index({ created_by: -1 }, { background: true });
schema.index({ branch: -1 }, { background: true });
schema.index({ sales: -1 }, { background: true });
schema.index({ visible: -1 }, { background: true });
schema.index({ type: -1 }, { background: true });
schema.plugin(require('mongoose-autopopulate'));

/*order model*/
const order = mongoose.model<any>('order', schema);

/*exporting order model*/
export default order