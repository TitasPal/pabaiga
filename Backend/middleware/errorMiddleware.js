const errorMiddleware = (err, req, res, next) => {
   console.log('Error middleware called:', err);
   const satusCode = res.statusCode ? res.statusCode : 500;
   res.status(satusCode);
   res.json({ message: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : null });
};

module.exports = errorMiddleware; 