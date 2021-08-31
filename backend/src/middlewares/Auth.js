const jwt = require('jsonwebtoken');

class Auth {
  async checkIfIsLoggedIn (req, res, next) {
    const authHeader = req.headers.authorization;
  
    if(!authHeader)
      return res.status(401).send({ 
        auth: false,
        error: 'no token provided' 
    });
  
    const parts = authHeader.split(' ');
  
    if (!parts.length === 2)
      return res.status(401).send({ 
        auth: false,
        error: 'Token error' 
    });
    
    if(parts[0] != "Bearer")
      return res.status(401).send({ 
        auth: false,
        error: 'Token malformatted '
    });
  
    jwt.verify(parts[1], process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          auth: false,
          error: 'Token invalid'
        })
      }
  
      req.userId = decoded.id;
      return next();
    })
  }
}

module.exports = new Auth();