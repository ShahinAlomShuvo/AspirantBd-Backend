"use strict";
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role || (exports.Role = Role = {}));
var Provider;
(function (Provider) {
    Provider["LOCAL"] = "local";
    Provider["GOOGLE"] = "google";
    Provider["FACEBOOK"] = "facebook";
    Provider["TWITTER"] = "twitter";
    Provider["GITHUB"] = "github";
})(Provider || (exports.Provider = Provider = {}));
