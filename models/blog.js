const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now },
    author: {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    },
});

module.exports = mongoose.model('Blog', blogSchema);
