"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./configs/db.config");
const keys_1 = require("./configs/keys");
app_1.default.listen(keys_1.PORT, () => {
    console.log(`🚀 Server is up and running on port -> ${keys_1.PORT}`);
    db_config_1.initDatabase();
}).on('error', (err) => {
    console.log(err);
});
//# sourceMappingURL=server.js.map