const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        img: { type: String, required: true },
        thoughts: String
    },
    { timestamps: true }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;