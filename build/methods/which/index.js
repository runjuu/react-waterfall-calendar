'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var which = function which(diff) {
  if (diff > 0) {
    return 'FUTURE';
  } else if (diff < 0) {
    return 'PAST';
  }

  return 'CURRENT';
};

exports.default = which;