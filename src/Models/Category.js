const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
