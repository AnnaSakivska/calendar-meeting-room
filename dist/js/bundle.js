/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request.onreadystatechange = function handleLoad() {\n      if (!request || request.readyState !== 4) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (!requestData) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\n// Expose isAxiosError\naxios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ \"./node_modules/axios/lib/helpers/isAxiosError.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n\n  // Set config.method\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  }\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: (config || {}).data\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n  return requestedURL;\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function toJSON() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code\n    };\n  };\n  return error;\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  var valueFromConfig2Keys = ['url', 'method', 'data'];\n  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];\n  var defaultToConfig2Keys = [\n    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',\n    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',\n    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',\n    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',\n    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'\n  ];\n  var directMergeKeys = ['validateStatus'];\n\n  function getMergedValue(target, source) {\n    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {\n      return utils.merge(target, source);\n    } else if (utils.isPlainObject(source)) {\n      return utils.merge({}, source);\n    } else if (utils.isArray(source)) {\n      return source.slice();\n    }\n    return source;\n  }\n\n  function mergeDeepProperties(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    }\n  });\n\n  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);\n\n  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n\n  utils.forEach(directMergeKeys, function merge(prop) {\n    if (prop in config2) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (prop in config1) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n\n  var axiosKeys = valueFromConfig2Keys\n    .concat(mergeDeepPropertiesKeys)\n    .concat(defaultToConfig2Keys)\n    .concat(directMergeKeys);\n\n  var otherKeys = Object\n    .keys(config1)\n    .concat(Object.keys(config2))\n    .filter(function filterAxiosKeys(key) {\n      return axiosKeys.indexOf(key) === -1;\n    });\n\n  utils.forEach(otherKeys, mergeDeepProperties);\n\n  return config;\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n  maxBodyLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the payload is an error thrown by Axios\n *\n * @param {*} payload The value to test\n * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false\n */\nmodule.exports = function isAxiosError(payload) {\n  return (typeof payload === 'object') && (payload.isAxiosError === true);\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/isAxiosError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a plain Object\n *\n * @param {Object} val The value to test\n * @return {boolean} True if value is a plain Object, otherwise false\n */\nfunction isPlainObject(val) {\n  if (toString.call(val) !== '[object Object]') {\n    return false;\n  }\n\n  var prototype = Object.getPrototypeOf(val);\n  return prototype === null || prototype === Object.prototype;\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (isPlainObject(result[key]) && isPlainObject(val)) {\n      result[key] = merge(result[key], val);\n    } else if (isPlainObject(val)) {\n      result[key] = merge({}, val);\n    } else if (isArray(val)) {\n      result[key] = val.slice();\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\n/**\n * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)\n *\n * @param {string} content with BOM\n * @return {string} content value without BOM\n */\nfunction stripBOM(content) {\n  if (content.charCodeAt(0) === 0xFEFF) {\n    content = content.slice(1);\n  }\n  return content;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isPlainObject: isPlainObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim,\n  stripBOM: stripBOM\n};\n\n\n//# sourceURL=webpack://calendar-meeting-room/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./src/js/Admin.js":
/*!*************************!*\
  !*** ./src/js/Admin.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User */ \"./src/js/User.js\");\n/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMInteraction */ \"./src/js/DOMInteraction.js\");\n/* harmony import */ var _Warnning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Warnning */ \"./src/js/Warnning.js\");\n/* harmony import */ var _Server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Server */ \"./src/js/Server.js\");\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventEmitter */ \"./src/js/EventEmitter.js\");\n/* harmony import */ var _EventsSingelton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventsSingelton */ \"./src/js/EventsSingelton.js\");\n\n\n\n\n\n\nlet warnningMessage;\nlet warnning;\nlet meetings = _EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents();\n_EventEmitter__WEBPACK_IMPORTED_MODULE_4__.default.on(\"delete-event\", id => _Server__WEBPACK_IMPORTED_MODULE_3__.default.deletEventData(id).then(() => _EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents()));\n_EventEmitter__WEBPACK_IMPORTED_MODULE_4__.default.on(\"put-event\", (event, id) => {\n  _Server__WEBPACK_IMPORTED_MODULE_3__.default.putEventData(event, id).then(() => _EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents());\n});\n\nclass Admin extends _User__WEBPACK_IMPORTED_MODULE_0__.default {\n  constructor(name) {\n    super(name);\n    this.name = name;\n    this.calendarMeetingWrapper = document.querySelectorAll(\".calendar__meeting-wrapper\");\n    this.currentWrapperId = \"\";\n    this.daysOfWeek = [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\"];\n    this.hours = [\"10:00\", \"11:00\", \"12:00\", \"13:00\", \"14:00\", \"15:00\", \"16:00\", \"17:00\", \"18:00\"];\n    this.meetingId = \"\";\n    this.meetingTitle = \"\";\n    this.meetingToDelete = {};\n    this.draggedMeeting = {};\n    this.draggedEvID = \"\";\n  }\n\n  openNewEventWindow() {\n    this.warnning.closeWarning();\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.calendarNameOptions.forEach(elem => elem.classList.remove(\"selected\"));\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.newEventWindowDOM.classList.remove(\"d-none\");\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.calendarWindowDOM.classList.add(\"d-none\");\n  }\n\n  addDraggableAtr(ev) {\n    if (ev.target.closest(\".calendar__meeting-wrapper\")) this.calendarMeetingWrapper.forEach(elem => elem.setAttribute(\"draggable\", true));\n  }\n\n  dragStart(ev) {\n    const target = ev.target.closest(\".calendar__meeting-space\");\n    if (!ev.target.closest(\".calendar-header__select\")) document.querySelector(\".calendar-header__select\").classList.remove(\"open\");\n    ev.dataTransfer.effectAllowed = \"move\";\n    ev.dataTransfer.setData(\"text\", ev.target.id);\n    setTimeout(() => ev.target.classList.add(\"d-none\"), 0);\n    target.children[0].classList.add(\"hold\");\n    this.currentWrapperId = target.id;\n  }\n\n  dragEnd(ev) {\n    ev.preventDefault();\n    const target = ev.target.closest(\".calendar__meeting-space\");\n    document.getElementById(this.currentWrapperId).classList.remove(\"d-none\");\n    target.children[0].classList.remove(\"hold\");\n    target.children[0].classList.remove(\"d-none\");\n  }\n\n  dragOver(ev) {\n    ev.preventDefault();\n  }\n\n  drop(ev) {\n    ev.preventDefault();\n    const target = ev.target.closest(\".calendar__meeting-space\");\n    const data = ev.dataTransfer.getData(\"text\");\n    target.classList.remove(\"d-none\");\n\n    if (meetings.some(meeting => JSON.parse(meeting.data).day.substring(0, 2).concat(\"-\", JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase() === target.id)) {\n      this.warnning.closeWarning();\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.warningMessage.children[0].children[1].innerHTML = \"Failed to move the event. Time slot is already taken!\";\n      this.warnning.addWarning();\n      return;\n    }\n\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.warningMessage.classList.add(\"d-none\");\n    ev.target.appendChild(document.getElementById(data));\n    ev.target.children[0].id = ev.target.id.concat(\"-\", \"drag\");\n    this.draggedEvID = _EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents().filter(meeting => this.currentWrapperId === JSON.parse(meeting.data).day.substring(0, 2).concat(\"-\", JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())[0].id;\n    this.draggedMeeting = JSON.parse(_EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents().filter(meeting => this.currentWrapperId === JSON.parse(meeting.data).day.substring(0, 2).concat(\"-\", JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase())[0].data);\n    this.draggedMeeting.day = this.daysOfWeek.filter(day => day.substring(0, 2).toLowerCase() === target.id.substring(0, 2))[0];\n    this.draggedMeeting.time = this.hours.filter(time => time.substring(0, 2) === target.id.substring(3, 5))[0];\n    _EventEmitter__WEBPACK_IMPORTED_MODULE_4__.default.emit(\"put-event\", this.draggedMeeting, this.draggedEvID);\n  }\n\n  showDeletePop(e) {\n    const {\n      target\n    } = e;\n\n    if (target && target.id === \"remove-meeting\") {\n      this.meetingToDelete = _EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents().filter(meeting => target.parentNode.parentNode.id === JSON.parse(meeting.data).day.substring(0, 2).concat(\"-\", JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase());\n      this.meetingId = target.parentNode.parentNode.id;\n      this.meetingTitle = JSON.parse(this.meetingToDelete[0].data).evenName;\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.deleteMeetingPopup.children[0].innerHTML = `Are you sure you want to delete <br> \"${this.meetingTitle}\" event?`;\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.deleteMeetingContainer.classList.remove(\"d-none\");\n    }\n  }\n\n  deleteMeeting() {\n    // delete event from common array 'meetings' and server\n    const deleteMeetingDOM = document.querySelector(`#${this.meetingId}`);\n    meetings = meetings.filter(meeting => this.meetingId !== JSON.parse(meeting.data).day.substring(0, 2).concat(\"-\", JSON.parse(meeting.data).time.substring(0, 2)).toLowerCase());\n    _EventEmitter__WEBPACK_IMPORTED_MODULE_4__.default.emit(\"delete-event\", this.meetingToDelete[0].id); // delete event from the DOM\n\n    deleteMeetingDOM.innerHTML = \"\";\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.deleteMeetingContainer.classList.add(\"d-none\"); // warning\n\n    warnningMessage = `The \"${this.meetingTitle}\" meeting was successfully deleted!`;\n    warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_2__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.messageSuccessful, warnningMessage);\n    warnning.showSuccessfulMessage();\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Admin);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/Admin.js?");

/***/ }),

/***/ "./src/js/Authorisation.js":
/*!*********************************!*\
  !*** ./src/js/Authorisation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Authorisation)\n/* harmony export */ });\n/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMInteraction */ \"./src/js/DOMInteraction.js\");\n/* harmony import */ var _DisplayedMeeting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DisplayedMeeting */ \"./src/js/DisplayedMeeting.js\");\n/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./User */ \"./src/js/User.js\");\n/* harmony import */ var _Admin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Admin */ \"./src/js/Admin.js\");\n/* harmony import */ var _Warnning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Warnning */ \"./src/js/Warnning.js\");\n/* harmony import */ var _EventsSingelton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventsSingelton */ \"./src/js/EventsSingelton.js\");\n\n\n\n\n\n\nlet user;\nlet adminIsLoggedIn = false;\nclass Authorisation {\n  constructor() {\n    this.meetings = [];\n    this.displayedMeeting = {};\n    this.user = {};\n    this.warnning = {};\n  } // Insert All meetings in the calendar\n\n\n  insertAllMeetings() {\n    this.displayedMeeting = new _DisplayedMeeting__WEBPACK_IMPORTED_MODULE_1__.default(_EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents(), adminIsLoggedIn);\n\n    if (!_EventsSingelton__WEBPACK_IMPORTED_MODULE_5__.default.getEvents()) {\n      this.warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_4__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.messageSuccessful, \"Your calendar is empty! No meetings have been planned!\");\n      this.warnning.showSuccessfulMessage();\n    }\n\n    this.displayedMeeting.insertMeeting();\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.calendarNameOptions.forEach(option => option.classList.remove(\"selected\"));\n    document.querySelector('[data-value=\"all members\"]').classList.add(\"selected\");\n    document.querySelector(\".calendar-header__trigger span\").textContent = \"All members\";\n  }\n\n  authorise() {\n    if (_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authoriseSelectDOM.value === \"Anna\") {\n      // authorise as Admin\n      user = new _Admin__WEBPACK_IMPORTED_MODULE_3__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authoriseSelectDOM.value);\n      adminIsLoggedIn = true;\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisePopupDom.classList.add(\"d-none\");\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.addNewEventBtnDOM.classList.remove(\"disabled-btn\");\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisedBtnDOM.innerText = _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authoriseSelectDOM.value;\n    } else if (_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authoriseSelectDOM.value) {\n      // authorise as User\n      user = new _User__WEBPACK_IMPORTED_MODULE_2__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authoriseSelectDOM.value, _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.warningMessage, _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.messageSuccessful);\n      adminIsLoggedIn = false;\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisePopupDom.classList.add(\"d-none\");\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.addNewEventBtnDOM.classList.add(\"disabled-btn\");\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisedBtnDOM.innerText = _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authoriseSelectDOM.value;\n    }\n\n    this.insertAllMeetings(adminIsLoggedIn); // delete all warnings that are still showing\n\n    this.warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_4__.default();\n    this.warnning.closeWarning();\n  }\n\n}\nconst authorisation = new Authorisation(); // Authorization\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorizationBtnDOM.addEventListener(\"click\", () => authorisation.authorise()); // Reauthorise\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisedBtnDOM.addEventListener(\"click\", () => _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisePopupDom.classList.remove(\"d-none\"));\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.clendarMeetingSpotDom.forEach(elem => elem.addEventListener(\"mousedown\", ev => user.addDraggableAtr(ev))); // Drag & Drop\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.clendarMeetingSpotDom.forEach(elem => elem.addEventListener(\"dragstart\", ev => {\n  if (adminIsLoggedIn) user.dragStart(ev);\n}));\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.clendarMeetingSpotDom.forEach(elem => elem.addEventListener(\"drop\", ev => user.drop(ev)));\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.clendarMeetingSpotDom.forEach(elem => elem.addEventListener(\"dragend\", ev => user.dragEnd(ev)));\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.clendarMeetingSpotDom.forEach(elem => elem.addEventListener(\"dragover\", ev => user.dragOver(ev))); // Delete meeting\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.clendarMeetingSpotDom.forEach(elem => elem.addEventListener(\"click\", ev => user.showDeletePop(ev)));\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.deleteOkBtn.addEventListener(\"click\", () => user.deleteMeeting());\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.deleteNotBtn.addEventListener(\"click\", () => _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.deleteMeetingContainer.classList.add(\"d-none\")); // Open new event window\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.addNewEventBtnDOM.addEventListener(\"click\", () => user.openNewEventWindow());\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/Authorisation.js?");

/***/ }),

/***/ "./src/js/DOMInteraction.js":
/*!**********************************!*\
  !*** ./src/js/DOMInteraction.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authorisePopupDom\": () => (/* binding */ authorisePopupDom),\n/* harmony export */   \"authorizationBtnDOM\": () => (/* binding */ authorizationBtnDOM),\n/* harmony export */   \"authoriseSelectDOM\": () => (/* binding */ authoriseSelectDOM),\n/* harmony export */   \"authorisedBtnDOM\": () => (/* binding */ authorisedBtnDOM),\n/* harmony export */   \"calendarWindowDOM\": () => (/* binding */ calendarWindowDOM),\n/* harmony export */   \"newEventWindowDOM\": () => (/* binding */ newEventWindowDOM),\n/* harmony export */   \"addNewEventBtnDOM\": () => (/* binding */ addNewEventBtnDOM),\n/* harmony export */   \"formDOM\": () => (/* binding */ formDOM),\n/* harmony export */   \"participantsContainerDOM\": () => (/* binding */ participantsContainerDOM),\n/* harmony export */   \"participantsDOM\": () => (/* binding */ participantsDOM),\n/* harmony export */   \"peopleMenuOptionsDOM\": () => (/* binding */ peopleMenuOptionsDOM),\n/* harmony export */   \"participantsMenu\": () => (/* binding */ participantsMenu),\n/* harmony export */   \"selectNewEvenDOM\": () => (/* binding */ selectNewEvenDOM),\n/* harmony export */   \"meetingThemeInputDOM\": () => (/* binding */ meetingThemeInputDOM),\n/* harmony export */   \"submitBtnDOM\": () => (/* binding */ submitBtnDOM),\n/* harmony export */   \"cancelBtnDOM\": () => (/* binding */ cancelBtnDOM),\n/* harmony export */   \"closeWarningDOM\": () => (/* binding */ closeWarningDOM),\n/* harmony export */   \"warningMessage\": () => (/* binding */ warningMessage),\n/* harmony export */   \"messageSuccessful\": () => (/* binding */ messageSuccessful),\n/* harmony export */   \"dayDOM\": () => (/* binding */ dayDOM),\n/* harmony export */   \"timeDOM\": () => (/* binding */ timeDOM),\n/* harmony export */   \"memberShownNameDOM\": () => (/* binding */ memberShownNameDOM),\n/* harmony export */   \"calendarNameOptions\": () => (/* binding */ calendarNameOptions),\n/* harmony export */   \"clendarMeetingSpotDom\": () => (/* binding */ clendarMeetingSpotDom),\n/* harmony export */   \"deleteMeetingContainer\": () => (/* binding */ deleteMeetingContainer),\n/* harmony export */   \"deleteMeetingPopup\": () => (/* binding */ deleteMeetingPopup),\n/* harmony export */   \"deleteOkBtn\": () => (/* binding */ deleteOkBtn),\n/* harmony export */   \"deleteNotBtn\": () => (/* binding */ deleteNotBtn)\n/* harmony export */ });\nconst authorisePopupDom = document.querySelector(\".popup-container\");\nconst authorizationBtnDOM = document.querySelector(\".authorise-popup__btn\");\nconst authoriseSelectDOM = document.getElementById(\"authorise-select\");\nconst authorisedBtnDOM = document.querySelector(\".calendar-header__authorized\");\nconst calendarWindowDOM = document.querySelector(\".calendar__main-page\");\nconst newEventWindowDOM = document.querySelector(\".new-event\");\nconst addNewEventBtnDOM = document.querySelector(\".calendar-header__new-ivent\");\nconst formDOM = document.querySelector(\"form\");\nconst participantsContainerDOM = document.querySelector(\".participants\");\nconst participantsDOM = document.querySelector(\".new-event__participants\");\nconst peopleMenuOptionsDOM = document.querySelectorAll(\".menu-option\");\nconst participantsMenu = document.querySelector(\".new-event__participants-menu\");\nconst selectNewEvenDOM = document.querySelectorAll(\".styled-select\");\nconst meetingThemeInputDOM = document.getElementById(\"event-name\");\nconst submitBtnDOM = document.querySelector(\".new-event__submit\");\nconst cancelBtnDOM = document.querySelector(\".new-event__cancel\");\nconst closeWarningDOM = document.getElementById(\"warning-close\");\nconst warningMessage = document.querySelector(\".new-event__warning\");\nconst messageSuccessful = document.querySelector(\".successful-message\");\nconst dayDOM = document.getElementById(\"day\");\nconst timeDOM = document.getElementById(\"time\");\nconst memberShownNameDOM = document.querySelector(\".calendar-header__trigger span\");\nconst calendarNameOptions = document.querySelectorAll(\".calendar-header__option\");\nconst clendarMeetingSpotDom = document.querySelectorAll(\".calendar__meeting-space\");\nconst deleteMeetingContainer = document.querySelector(\".delete-popup-container\");\nconst deleteMeetingPopup = document.querySelector(\".delete-popup\");\nconst deleteOkBtn = document.querySelector(\"#delete\");\nconst deleteNotBtn = document.querySelector(\"#delete-not\");\n\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/DOMInteraction.js?");

/***/ }),

/***/ "./src/js/DisplayedMeeting.js":
/*!************************************!*\
  !*** ./src/js/DisplayedMeeting.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DisplayedMeeting)\n/* harmony export */ });\nclass DisplayedMeeting {\n  constructor(meetingsArr, draggable) {\n    this.meetingsArr = meetingsArr;\n    this.draggable = draggable;\n  }\n\n  async insertMeeting() {\n    if (await this.meetingsArr) this.meetingsArr.forEach(meeting => {\n      const parsedMeeting = JSON.parse(meeting.data);\n      const meetingStop = document.getElementById(parsedMeeting.day.substring(0, 2).concat(\"-\", parsedMeeting.time.substring(0, 2)).toLowerCase());\n      meetingStop.innerHTML = `\n                        <div class=\"calendar__meeting-wrapper occupied\" id=\"${parsedMeeting.day.substring(0, 2).concat(\"-\", parsedMeeting.time.substring(0, 2)).toLowerCase()}-drag\" draggable=\"${this.draggable}\">\n                        <p class=\"calendar__meeting\">${parsedMeeting.evenName}</p>\n                        <span class=\"cup caledar__meeting-remove\" id=\"remove-meeting\">&#10006;</span>\n                        </div>\n                        `;\n    });\n  }\n\n}\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/DisplayedMeeting.js?");

/***/ }),

/***/ "./src/js/DropDown.js":
/*!****************************!*\
  !*** ./src/js/DropDown.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass DropDown {\n  constructor(membersMenu, membersDOM) {\n    this.membersMenu = membersMenu;\n    this.membersDOM = membersDOM;\n  }\n\n  openDropDown() {\n    this.membersMenu.classList.toggle(\"d-none\");\n    this.membersDOM.classList.toggle(\"up\");\n  }\n\n  closeDropDown() {\n    this.membersMenu.classList.add(\"d-none\");\n    this.membersDOM.classList.remove(\"up\");\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropDown);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/DropDown.js?");

/***/ }),

/***/ "./src/js/ErrorsDecorator.js":
/*!***********************************!*\
  !*** ./src/js/ErrorsDecorator.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Warnning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Warnning */ \"./src/js/Warnning.js\");\n\nconst errorWarning = new _Warnning__WEBPACK_IMPORTED_MODULE_0__.default(document.querySelector('.new-event__warning'));\n\nfunction Catch(target, key, descriptor) {\n  const originalMethod = descriptor.value;\n  const calendarMeetingWrapper = document.querySelectorAll(\".calendar__meeting-wrapper\");\n\n  descriptor.value = async function (...args) {\n    try {\n      // console.log('decorator working')\n      return await originalMethod.apply(this, args);\n    } catch (error) {\n      if (error.response) document.querySelector('.new-event__warning-message').innerText = `Sorry, something went wrong (${error.message} with status code - ${error.response.status}).\n                                                                            Please, try again later.`;else document.querySelector('.new-event__warning-message').innerText = `Sorry, something went wrong (${error.message}). Please, try again later.`;\n      errorWarning.addWarning();\n    }\n\n    return descriptor;\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Catch);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/ErrorsDecorator.js?");

/***/ }),

/***/ "./src/js/EventEmitter.js":
/*!********************************!*\
  !*** ./src/js/EventEmitter.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Server */ \"./src/js/Server.js\");\n\n\nclass EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  on(eventName, callback) {\n    const event = this.events[eventName];\n    if (event) this.events[eventName].push(callback);else this.events[eventName] = [callback];\n  }\n\n  emit(eventName, ...rest) {\n    if (this.events[eventName]) {\n      this.events[eventName].forEach(func => {\n        func.apply(_Server__WEBPACK_IMPORTED_MODULE_0__.default, rest);\n      });\n    }\n  }\n\n}\n\nconst ee = new EventEmitter();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ee);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/EventEmitter.js?");

/***/ }),

/***/ "./src/js/EventsSingelton.js":
/*!***********************************!*\
  !*** ./src/js/EventsSingelton.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./src/js/EventEmitter.js\");\n/* harmony import */ var _Server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Server */ \"./src/js/Server.js\");\n\n\n\nclass EventsSingelton {\n  constructor() {\n    if (typeof EventsSingelton.instance === \"object\") {\n      return EventsSingelton.instance;\n    }\n\n    this.meetings = [];\n    Request.instance = this;\n    return this;\n  }\n\n  getEvents() {\n    _Server__WEBPACK_IMPORTED_MODULE_1__.default.makeGetRequest().then(data => {\n      this.meetings = data;\n    });\n    return this.meetings;\n  }\n\n}\n\nconst events = new EventsSingelton(_EventEmitter__WEBPACK_IMPORTED_MODULE_0__.default);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (events);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/EventsSingelton.js?");

/***/ }),

/***/ "./src/js/NewEventWindow.js":
/*!**********************************!*\
  !*** ./src/js/NewEventWindow.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMInteraction */ \"./src/js/DOMInteraction.js\");\n/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DropDown */ \"./src/js/DropDown.js\");\n/* harmony import */ var _Warnning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Warnning */ \"./src/js/Warnning.js\");\n/* harmony import */ var _DisplayedMeeting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DisplayedMeeting */ \"./src/js/DisplayedMeeting.js\");\n/* harmony import */ var _Server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Server */ \"./src/js/Server.js\");\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventEmitter */ \"./src/js/EventEmitter.js\");\n/* harmony import */ var _EventsSingelton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EventsSingelton */ \"./src/js/EventsSingelton.js\");\n\n\n\n\n\n\n\nconst dropDown = new _DropDown__WEBPACK_IMPORTED_MODULE_1__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsMenu, _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM);\nconst meetingparticipants = new Set();\n_EventEmitter__WEBPACK_IMPORTED_MODULE_5__.default.on(\"post-event\", (event, method) => {\n  _Server__WEBPACK_IMPORTED_MODULE_4__.default.postEventData(event).then(() => method());\n});\n_EventEmitter__WEBPACK_IMPORTED_MODULE_5__.default.on(\"get-and-insert-event\", () => {\n  _Server__WEBPACK_IMPORTED_MODULE_4__.default.makeGetRequest().then(data => {\n    const displayedMeeting = new _DisplayedMeeting__WEBPACK_IMPORTED_MODULE_3__.default(data, true);\n    displayedMeeting.insertMeeting();\n  }).then(() => {\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.newEventWindowDOM.classList.add(\"d-none\");\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.calendarWindowDOM.classList.remove(\"d-none\");\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.formDOM.reset();\n    meetingparticipants.clear();\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM.innerText = \"Select People\";\n    document.querySelector('[data-value=\"all members\"]').classList.add(\"selected\");\n    document.querySelector(\".calendar-header__trigger span\").textContent = \"All members\";\n  });\n});\n\nclass NewEventWindow {\n  constructor() {\n    this.warnningMessage = \"\";\n    this.warnning = \"\";\n    this.warningMessageText = _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.warningMessage.children[0].children[1];\n    this.participantsArray = [];\n  }\n\n  chooseParticipant(ev) {\n    const {\n      target\n    } = ev;\n    this.warnningMessage = \"You added all possible participants to your meeting!\";\n\n    if (target.dataset.person === \"all members\") {\n      [..._DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.peopleMenuOptionsDOM].forEach(elem => {\n        if (elem.dataset.person !== \"all members\") meetingparticipants.add(elem.dataset.person);\n      });\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM.innerText = target.dataset.person;\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM.style.textTransform = \"capitalize\";\n      dropDown.closeDropDown();\n      return;\n    }\n\n    if (meetingparticipants.size === 7) {\n      meetingparticipants.clear();\n      meetingparticipants.add(target.dataset.person);\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM.innerText = target.dataset.person;\n      return;\n    }\n\n    if (meetingparticipants.size === 6 && !meetingparticipants.has(target.dataset.person)) {\n      meetingparticipants.add(target.dataset.person);\n      _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM.innerText = \"All Members\";\n      this.warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_2__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.messageSuccessful, this.warnningMessage);\n      this.warnning.showSuccessfulMessage();\n      dropDown.closeDropDown();\n      return;\n    }\n\n    if (meetingparticipants.size < 7) {\n      meetingparticipants.add(target.dataset.person);\n    }\n\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM.innerText = [...meetingparticipants].join(\", \");\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.participantsDOM.style.textTransform = \"capitalize\";\n  }\n\n  closeNewEventWindow() {\n    _EventEmitter__WEBPACK_IMPORTED_MODULE_5__.default.emit(\"get-and-insert-event\");\n  }\n\n  creatNewEvent(members) {\n    const planningMeeting = {\n      evenName: _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.meetingThemeInputDOM.value,\n      participants: members,\n      day: _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.dayDOM.value,\n      time: _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.timeDOM.value\n    };\n\n    if (_EventsSingelton__WEBPACK_IMPORTED_MODULE_6__.default.getEvents() && _EventsSingelton__WEBPACK_IMPORTED_MODULE_6__.default.getEvents().some(meeting => JSON.parse(meeting.data).time === planningMeeting.time && JSON.parse(meeting.data).day === planningMeeting.day)) {\n      this.warningMessageText.innerText = \"Failed to create the event. Time slot is already booked!\";\n      this.warnning.addWarning();\n    } else {\n      _EventEmitter__WEBPACK_IMPORTED_MODULE_5__.default.emit(\"post-event\", planningMeeting, this.closeNewEventWindow);\n      this.warnningMessage = \"The new meeting was successfully created!\";\n      this.warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_2__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.messageSuccessful, this.warnningMessage);\n      this.warnning.showSuccessfulMessage();\n    }\n  }\n\n  submitNewEvent() {\n    meetingparticipants.forEach(v => this.participantsArray.push(v));\n    this.warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_2__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.warningMessage);\n    this.warnning.closeWarning();\n\n    if (!_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.meetingThemeInputDOM.value) {\n      this.warningMessageText.innerText = \"Please, enter the name of your meeting!\";\n      this.warnning.addWarning();\n      return;\n    }\n\n    if (meetingparticipants.size === 0) {\n      this.warningMessageText.innerText = \"Please, choose participants for your meeting!\";\n      this.warnning.addWarning();\n      return;\n    }\n\n    if (!_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.dayDOM.value) {\n      this.warningMessageText.innerText = \"Please, choose the day of your meeting!\";\n      this.warnning.addWarning();\n      return;\n    }\n\n    if (!_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.timeDOM.value) {\n      this.warningMessageText.innerText = \"Please, choose the time of your meeting!\";\n      this.warnning.addWarning();\n      return;\n    }\n\n    this.creatNewEvent(this.participantsArray);\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewEventWindow);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/NewEventWindow.js?");

/***/ }),

/***/ "./src/js/Participant.js":
/*!*******************************!*\
  !*** ./src/js/Participant.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Participant)\n/* harmony export */ });\n/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMInteraction */ \"./src/js/DOMInteraction.js\");\n/* harmony import */ var _DisplayedMeeting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DisplayedMeeting */ \"./src/js/DisplayedMeeting.js\");\n/* harmony import */ var _EventsSingelton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventsSingelton */ \"./src/js/EventsSingelton.js\");\n\n\n\nclass Participant {\n  constructor() {\n    this.draggble = false;\n    this.chosenName = \"\";\n    this.meetings = [];\n    this.displayedMeeting = {};\n    this.filteredMeetings = [];\n  }\n\n  selectName() {\n    document.querySelector(\".calendar-header__select\").classList.toggle(\"open\");\n    document.querySelectorAll(\".calendar-header__option\").forEach(option => {\n      option.addEventListener(\"click\", function () {\n        if (!option.classList.contains(\"selected\")) {\n          if (option.parentNode.querySelector(\".calendar-header__option.selected\")) option.parentNode.querySelector(\".calendar-header__option.selected\").classList.remove(\"selected\");\n          option.classList.add(\"selected\");\n          option.closest(\".calendar-header__select\").querySelector(\".calendar-header__trigger span\").textContent = option.textContent;\n          _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.clendarMeetingSpotDom.forEach(spot => {\n            spot.innerHTML = \"\";\n          });\n          this.chosenName = option.textContent;\n          this.draggable = _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisedBtnDOM.innerText === \"Anna\" ? _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.authorisedBtnDOM.innerText === \"Anna\" : false;\n          this.displayedMeeting = new _DisplayedMeeting__WEBPACK_IMPORTED_MODULE_1__.default(_EventsSingelton__WEBPACK_IMPORTED_MODULE_2__.default.getEvents(), this.draggable);\n          if (option.textContent === \"All members\" && _EventsSingelton__WEBPACK_IMPORTED_MODULE_2__.default.getEvents()) this.displayedMeeting.insertMeeting();else if (this.chosenName && _EventsSingelton__WEBPACK_IMPORTED_MODULE_2__.default.getEvents()) {\n            this.filteredMeetings = _EventsSingelton__WEBPACK_IMPORTED_MODULE_2__.default.getEvents().filter(meeting => JSON.parse(meeting.data).participants.includes(this.chosenName.toLowerCase()));\n            this.displayedMeeting = new _DisplayedMeeting__WEBPACK_IMPORTED_MODULE_1__.default(this.filteredMeetings, this.draggable);\n            this.displayedMeeting.insertMeeting();\n          }\n        }\n      });\n    });\n  }\n\n}\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/Participant.js?");

/***/ }),

/***/ "./src/js/Server.js":
/*!**************************!*\
  !*** ./src/js/Server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ErrorsDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorsDecorator */ \"./src/js/ErrorsDecorator.js\");\nvar _class;\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }\n\n\n\nlet Server = (_class = class Server {\n  constructor() {\n    if (typeof Request.instance === \"object\") {\n      return Request.instance;\n    }\n\n    this.baseUrl = \"http://158.101.166.74:8080/api/data/anna_sakiv/events\";\n    this.meetings = [];\n    Request.instance = this;\n    return this;\n  }\n\n  async makeGetRequest() {\n    const res = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.baseUrl);\n    return res.data;\n  }\n\n  async postEventData(event) {\n    const res = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\n      method: \"post\",\n      url: this.baseUrl,\n      data: JSON.stringify({\n        data: JSON.stringify(event)\n      })\n    });\n    return res;\n  }\n\n  async putEventData(event, id) {\n    const res = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\n      method: \"put\",\n      url: `${this.baseUrl}/${id}`,\n      data: JSON.stringify({\n        data: JSON.stringify(event)\n      })\n    });\n    return res;\n  }\n\n  async deletEventData(id) {\n    await axios__WEBPACK_IMPORTED_MODULE_0___default().delete(`${this.baseUrl}/${id}`);\n  }\n\n}, (_applyDecoratedDescriptor(_class.prototype, \"makeGetRequest\", [_ErrorsDecorator__WEBPACK_IMPORTED_MODULE_1__.default], Object.getOwnPropertyDescriptor(_class.prototype, \"makeGetRequest\"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, \"postEventData\", [_ErrorsDecorator__WEBPACK_IMPORTED_MODULE_1__.default], Object.getOwnPropertyDescriptor(_class.prototype, \"postEventData\"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, \"putEventData\", [_ErrorsDecorator__WEBPACK_IMPORTED_MODULE_1__.default], Object.getOwnPropertyDescriptor(_class.prototype, \"putEventData\"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, \"deletEventData\", [_ErrorsDecorator__WEBPACK_IMPORTED_MODULE_1__.default], Object.getOwnPropertyDescriptor(_class.prototype, \"deletEventData\"), _class.prototype)), _class);\nconst request = new Server();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/Server.js?");

/***/ }),

/***/ "./src/js/User.js":
/*!************************!*\
  !*** ./src/js/User.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Warnning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Warnning */ \"./src/js/Warnning.js\");\n\n\nclass User {\n  constructor(name, warningMessage, succMessage) {\n    this.name = name;\n    this.warningMessage = warningMessage;\n    this.calendarMeetingWrapper = document.querySelectorAll(\".calendar__meeting-wrapper\");\n    this.warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_0__.default(warningMessage);\n    this.succWarning = new _Warnning__WEBPACK_IMPORTED_MODULE_0__.default(succMessage);\n  }\n\n  addDraggableAtr(ev) {\n    if (ev.target.closest(\".calendar__meeting-wrapper\")) this.calendarMeetingWrapper.forEach(el => el.setAttribute(\"draggable\", false));\n  }\n\n  openNewEventWindow() {\n    this.warnning.closeWarning();\n    this.warningMessage.children[0].children[1].innerHTML = \"Only the admin can add new meeting!\";\n    this.warnning.addWarning();\n  }\n\n  showDeletePop(e) {\n    this.warnning.closeWarning();\n\n    if (e.target.closest(\".caledar__meeting-remove\")) {\n      this.warningMessage.children[0].children[1].innerHTML = \"Only the admin can remove the meeting!\";\n      this.warnning.addWarning();\n    }\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/User.js?");

/***/ }),

/***/ "./src/js/Warnning.js":
/*!****************************!*\
  !*** ./src/js/Warnning.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMInteraction */ \"./src/js/DOMInteraction.js\");\n\n\nclass Warnning {\n  constructor(messageContainer, message) {\n    this.message = message;\n    this.messageContainer = messageContainer;\n  }\n\n  showSuccessfulMessage() {\n    this.messageContainer.innerText = this.message;\n    this.messageContainer.classList.remove(\"d-none\");\n    setTimeout(() => {\n      this.messageContainer.classList.add(\"d-none\");\n    }, 6000);\n  }\n\n  addWarning() {\n    this.messageContainer.classList.remove(\"d-none\");\n    setTimeout(() => this.messageContainer.classList.add(\"d-none\"), 6000);\n  }\n\n  closeWarning() {\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.messageSuccessful.classList.add(\"d-none\");\n    _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.warningMessage.classList.add(\"d-none\");\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Warnning);\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/Warnning.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_reset_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/reset.scss */ \"./src/css/reset.scss\");\n/* harmony import */ var _css_fonts_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/fonts.scss */ \"./src/css/fonts.scss\");\n/* harmony import */ var _css_text_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/text.scss */ \"./src/css/text.scss\");\n/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/main.scss */ \"./src/css/main.scss\");\n/* harmony import */ var _Authorisation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Authorisation */ \"./src/js/Authorisation.js\");\n/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DOMInteraction */ \"./src/js/DOMInteraction.js\");\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EventEmitter */ \"./src/js/EventEmitter.js\");\n/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DropDown */ \"./src/js/DropDown.js\");\n/* harmony import */ var _NewEventWindow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NewEventWindow */ \"./src/js/NewEventWindow.js\");\n/* harmony import */ var _Participant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Participant */ \"./src/js/Participant.js\");\n/* harmony import */ var _Warnning__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Warnning */ \"./src/js/Warnning.js\");\n\n\n\n\n\n\n\n\n\n\n\nconst dropDown = new _DropDown__WEBPACK_IMPORTED_MODULE_7__.default(_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.participantsMenu, _DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.participantsDOM);\nconst newEvent = new _NewEventWindow__WEBPACK_IMPORTED_MODULE_8__.default();\nconst allParticipants = [];\nconst warnning = new _Warnning__WEBPACK_IMPORTED_MODULE_10__.default(); // Sort meetings by participant\n\ndocument.querySelector(\".calendar-header__select-wrapper\").addEventListener(\"click\", () => {\n  const participant = new _Participant__WEBPACK_IMPORTED_MODULE_9__.default();\n  participant.selectName();\n}); // preventing input from reloading on Enter\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.meetingThemeInputDOM.addEventListener(\"keydown\", event => {\n  if (event.key === \"Enter\") event.preventDefault();\n}); // Choose participant for new meeting\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.peopleMenuOptionsDOM.forEach(person => person.addEventListener(\"click\", event => newEvent.chooseParticipant(event))); // Choosing All members to be participants of the meeting\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.calendarNameOptions.forEach(option => {\n  if (option.getAttribute(\"data-value\") !== \"all members\") allParticipants.push(option.getAttribute(\"data-value\"));\n}); // Submit new event\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.submitBtnDOM.addEventListener(\"click\", () => newEvent.submitNewEvent()); // Cancel new event window\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.cancelBtnDOM.addEventListener(\"click\", () => {\n  warnning.closeWarning();\n  newEvent.closeNewEventWindow();\n}); // Init dropdown\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.participantsDOM.addEventListener(\"click\", () => dropDown.openDropDown()); // close dropdowns when click outside\n\nwindow.addEventListener(\"click\", ev => {\n  if (!(ev.target.closest(\".participants\") === _DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.participantsContainerDOM)) dropDown.closeDropDown();\n  if (!(ev.target.closest(\".styled-select\") === _DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.selectNewEvenDOM[0])) _DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.selectNewEvenDOM[0].classList.remove(\"up\");\n  if (!(ev.target.closest(\".styled-select\") === _DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.selectNewEvenDOM[1])) _DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.selectNewEvenDOM[1].classList.remove(\"up\");\n  if (!ev.target.closest(\".calendar-header__select\")) document.querySelector(\".calendar-header__select\").classList.remove(\"open\");\n}); // Arrow up\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.selectNewEvenDOM.forEach(select => select.addEventListener(\"click\", ev => ev.target.closest(\".styled-select\").classList.toggle(\"up\"))); // init close warning\n\n_DOMInteraction__WEBPACK_IMPORTED_MODULE_5__.closeWarningDOM.addEventListener(\"click\", () => {\n  warnning.closeWarning();\n});\n\n//# sourceURL=webpack://calendar-meeting-room/./src/js/index.js?");

/***/ }),

/***/ "./src/css/fonts.scss":
/*!****************************!*\
  !*** ./src/css/fonts.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://calendar-meeting-room/./src/css/fonts.scss?");

/***/ }),

/***/ "./src/css/main.scss":
/*!***************************!*\
  !*** ./src/css/main.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://calendar-meeting-room/./src/css/main.scss?");

/***/ }),

/***/ "./src/css/reset.scss":
/*!****************************!*\
  !*** ./src/css/reset.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://calendar-meeting-room/./src/css/reset.scss?");

/***/ }),

/***/ "./src/css/text.scss":
/*!***************************!*\
  !*** ./src/css/text.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://calendar-meeting-room/./src/css/text.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;