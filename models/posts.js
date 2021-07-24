const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        img: String,
        thoughts: String,
        views: { type: Number, default: 0}
    },
    { timestamps: true }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;