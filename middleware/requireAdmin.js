const jwt = require('jsonwebtoken')

const requireAdmin = (req, res, next) => {
 
    
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden. Admin privileges required.' });
    }
  };
  
  app.post('/auth/signup', (req, res) => {
    if (!req.body.role || req.body.role !== 'admin') {
      req.body.role = 'user';
    }
  });

  module.exports = requireAdmin