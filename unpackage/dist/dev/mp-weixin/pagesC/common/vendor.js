(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesC/common/vendor"],{

/***/ 208:
/*!*************************************************!*\
  !*** D:/七月/GitHub仓库/July_fair2.0/utils/util.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return "".concat([year, month, day].map(formatNumber).join('/'), " ").concat([hour, minute, second].map(formatNumber).join(':'));
};

var formatHour = function formatHour(date) {
  var hour = date.getHours();
  return "".concat([hour].map(formatNumber));
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0".concat(n);
};

module.exports = {
  formatTime: formatTime,
  formatHour: formatHour };

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesC/common/vendor.js.map