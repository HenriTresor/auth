
const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message || 'Unexpected error occurred. Please try again'
    })
}

export default errorHandlerMiddleware