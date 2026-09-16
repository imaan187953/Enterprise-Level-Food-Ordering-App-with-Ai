import ApiError from "../utils/ApiError.js";
export const errorMiddleware = (error, _req, res, _next) => {
    console.error(error);
    if (error instanceof ApiError) {
        const response = {
            success: false,
            message: error.message,
        };
        if (error.errors !== undefined) {
            response.errors = error.errors;
        }
        res.status(error.statusCode).json(response);
        return;
    }
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};
//# sourceMappingURL=error.middleware.js.map