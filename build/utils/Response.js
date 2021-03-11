"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responses = void 0;
class Responses {
    constructor() {
        this.success = (res, data = {}, message = "", statusCode = 200, status = true) => {
            return res.status(statusCode).json({
                status: status,
                message: message,
                value: data
            });
        };
        this.failed = (res, data = {}, message = "", statusCode = 500, status = false) => {
            return res.status(statusCode).json({
                status: status,
                message: message,
                value: data
            });
        };
    }
}
exports.Responses = Responses;
//# sourceMappingURL=Response.js.map