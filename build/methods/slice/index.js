"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var slice = function slice() {
  var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  slice.month = [];

  for (var times = month.length / count; times > 0; times -= 1) {
    slice.month.push(month.slice((times - 1) * count, times * count));
  }

  return slice.month.reverse();
};

exports.default = slice;