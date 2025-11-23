"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-property-descriptors";
exports.ids = ["vendor-chunks/has-property-descriptors"];
exports.modules = {

/***/ "(rsc)/../../node_modules/has-property-descriptors/index.js":
/*!************************************************************!*\
  !*** ../../node_modules/has-property-descriptors/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar $defineProperty = __webpack_require__(/*! es-define-property */ \"(rsc)/../../node_modules/es-define-property/index.js\");\nvar hasPropertyDescriptors = function hasPropertyDescriptors() {\n    return !!$defineProperty;\n};\nhasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {\n    // node v0.6 has a bug where array lengths can be Set but not Defined\n    if (!$defineProperty) {\n        return null;\n    }\n    try {\n        return $defineProperty([], \"length\", {\n            value: 1\n        }).length !== 1;\n    } catch (e) {\n        // In Firefox 4-22, defining length on an array throws an exception.\n        return true;\n    }\n};\nmodule.exports = hasPropertyDescriptors;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLElBQUlBLGtCQUFrQkMsbUJBQU9BLENBQUM7QUFFOUIsSUFBSUMseUJBQXlCLFNBQVNBO0lBQ3JDLE9BQU8sQ0FBQyxDQUFDRjtBQUNWO0FBRUFFLHVCQUF1QkMsdUJBQXVCLEdBQUcsU0FBU0E7SUFDekQscUVBQXFFO0lBQ3JFLElBQUksQ0FBQ0gsaUJBQWlCO1FBQ3JCLE9BQU87SUFDUjtJQUNBLElBQUk7UUFDSCxPQUFPQSxnQkFBZ0IsRUFBRSxFQUFFLFVBQVU7WUFBRUksT0FBTztRQUFFLEdBQUdDLE1BQU0sS0FBSztJQUMvRCxFQUFFLE9BQU9DLEdBQUc7UUFDWCxvRUFBb0U7UUFDcEUsT0FBTztJQUNSO0FBQ0Q7QUFFQUMsT0FBT0MsT0FBTyxHQUFHTiIsInNvdXJjZXMiOlsid2VicGFjazovL3BidHMtYWRtaW4vLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycy9pbmRleC5qcz8yMDVjIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJ2VzLWRlZmluZS1wcm9wZXJ0eScpO1xuXG52YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9ycyA9IGZ1bmN0aW9uIGhhc1Byb3BlcnR5RGVzY3JpcHRvcnMoKSB7XG5cdHJldHVybiAhISRkZWZpbmVQcm9wZXJ0eTtcbn07XG5cbmhhc1Byb3BlcnR5RGVzY3JpcHRvcnMuaGFzQXJyYXlMZW5ndGhEZWZpbmVCdWcgPSBmdW5jdGlvbiBoYXNBcnJheUxlbmd0aERlZmluZUJ1ZygpIHtcblx0Ly8gbm9kZSB2MC42IGhhcyBhIGJ1ZyB3aGVyZSBhcnJheSBsZW5ndGhzIGNhbiBiZSBTZXQgYnV0IG5vdCBEZWZpbmVkXG5cdGlmICghJGRlZmluZVByb3BlcnR5KSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dHJ5IHtcblx0XHRyZXR1cm4gJGRlZmluZVByb3BlcnR5KFtdLCAnbGVuZ3RoJywgeyB2YWx1ZTogMSB9KS5sZW5ndGggIT09IDE7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJbiBGaXJlZm94IDQtMjIsIGRlZmluaW5nIGxlbmd0aCBvbiBhbiBhcnJheSB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvcnM7XG4iXSwibmFtZXMiOlsiJGRlZmluZVByb3BlcnR5IiwicmVxdWlyZSIsImhhc1Byb3BlcnR5RGVzY3JpcHRvcnMiLCJoYXNBcnJheUxlbmd0aERlZmluZUJ1ZyIsInZhbHVlIiwibGVuZ3RoIiwiZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/has-property-descriptors/index.js\n");

/***/ })

};
;