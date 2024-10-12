const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Subcategory', subcategorySchema);
