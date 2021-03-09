var Blog = require('../models/blog');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');
}

function checkblogOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id, function (err, blog) {
            if (err) {
                req.flash('error', 'Something went wrong!');
                res.redirect('back');
            } else {
                if (blog.author.authorId.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that!");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('back');
    }
}

module.exports = {
    isLoggedIn,
    checkblogOwnership,
};
