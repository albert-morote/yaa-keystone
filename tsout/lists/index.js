"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const require_directory_1 = __importDefault(require("require-directory"));
const lists = require_directory_1.default(module);
console.log('lists');
console.log(lists);
exports.default = (keystone, options) => Object.entries(lists).forEach(([key, list]) => list.default(keystone, options));
//# sourceMappingURL=index.js.map