"use strict";
exports.__esModule = true;
var flex = /** @class */ (function () {
    function flex(initialOptions) {
        this.defaults = initialOptions;
    }
    flex.prototype.create = function (el, options) {
        el.addEventListener('click', function (e) {
            console.log(1);
        });
    };
    return flex;
}());
exports["default"] = flex;
