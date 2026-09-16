"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const ApiError_js_1 = require("../utils/ApiError.js");
const notFoundMiddleware = (req, _res, next) => {
    next(new ApiError_js_1.ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};
exports.notFoundMiddleware = notFoundMiddleware;
//# sourceMappingURL=notFound.middleware.js.map