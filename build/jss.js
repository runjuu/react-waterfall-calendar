'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jss2.default.setup((0, _jssPresetDefault2.default)());

var styles = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  month: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  horizontal: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  }
};

var _jss$createStyleSheet = _jss2.default.createStyleSheet(styles).attach(),
    classes = _jss$createStyleSheet.classes;

exports.default = classes;