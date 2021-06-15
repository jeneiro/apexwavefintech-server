const jwt = require("jsonwebtoken")

function auth (req, res, next){
    try {
       const token = req.cookies.token;
       if (!token) return  res.status(401).json({errorMessage:"Unauthorized"});
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log(verified);
      req.user = verified.user;
      next();
        
    } catch (err){
        console.error(err);
        console.log(err);
        res.status(401).json({errorMessage:"Unauthorized"});
    }

}
module.exports = auth;