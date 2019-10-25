// Add post model to top of file
const Post = require('../models/post');
// Add mapBoxToken from ENV variable
const mapBoxToken = process.env.MAPBOX_TOKEN;
const User = require('../models/user');
const passport = require('passport');

module.exports = {
  // GET /
  async landingPage(req, res, next) {
    // find all posts to populate into map
    const posts = await Post.find({});
    // render home page and pass in posts
    res.render('index', { posts, mapBoxToken, title: 'Whiskey Tapped - Home' });
  },
  // POST /register
  async postRegister(req, res, next) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      image: req.body.image
    });

    await User.register(newUser, req.body.password);
    res.redirect('/');
  },
  // POST /login
  postLogin(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })(req, res, next);
  },
  // GET /logout
  getLogout(req, res, next) {
    var sess = req.session.user;
    if (sess) {
      req.session.user = null;
      return callback(null, {
        success: true,
        message: 'user logout successfully'
      });
    }
    callback(null, { success: true, message: 'user logout successfully' });
    req.logout();
    res.redirect('/');
  }
};
