const jwt = require('jsonwebtoken')
// Middleware to restrict access to admin routes
const requireAdmin = (req, res, next) => {
    // Check if the user is authenticated and has admin role
    if (req.user && req.user.role === 'admin') {
      // User is authorized, proceed to the next middleware
      next();
    } else {
      // User is not authorized, return 403 Forbidden error
      res.status(403).json({ message: 'Access forbidden. Admin privileges required.' });
    }
  };
  
  // Route for creating a new user (sign-up)
  app.post('/auth/signup', (req, res) => {
    // Check if the request body includes a role field
    if (!req.body.role || req.body.role !== 'admin') {
      // If the role is not specified or not 'admin', default to 'user'
      req.body.role = 'user';
    }
  
    // Perform validation and create user account (implementation not shown)
  });
  
  // Route for creating a new admin user (requires admin privileges)
  app.post('/admin/signup', requireAdmin, (req, res) => {
    // Perform validation and create admin user account (implementation not shown)
  });