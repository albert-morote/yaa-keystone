"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = obj => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};
//# sourceMappingURL=emptyObject.js.map