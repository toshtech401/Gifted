function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.requestedUrl = req.originalUrl;
    const requestedUrl = req.originalUrl || "/dashboard";
    // res.json({"info": "your session has expired pls log in"});
    res.redirect(`/sign-in?redirect=${requestedUrl}`);
  }

  module.exports= isLoggedIn