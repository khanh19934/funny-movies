/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/refreshTokens/refreshTokens.model.ts":
/*!******************************************************!*\
  !*** ./src/api/refreshTokens/refreshTokens.model.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nexports.RefreshTokenSchema = new Mongoose.Schema({\n    userId: {\n        type: String,\n        required: true\n    },\n    refreshToken: {\n        type: String,\n        required: true\n    }\n});\nexports.RefreshTokenModel = Mongoose.model(\"RefreshToken\", exports.RefreshTokenSchema);\n\n\n//# sourceURL=webpack:///./src/api/refreshTokens/refreshTokens.model.ts?");

/***/ }),

/***/ "./src/api/sockets/index.ts":
/*!**********************************!*\
  !*** ./src/api/sockets/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst socket_controller_1 = __webpack_require__(/*! ./socket.controller */ \"./src/api/sockets/socket.controller.ts\");\nexports.init = (config, io, database) => {\n    return new socket_controller_1.default(config, io, database);\n};\n\n\n//# sourceURL=webpack:///./src/api/sockets/index.ts?");

/***/ }),

/***/ "./src/api/sockets/socket.controller.ts":
/*!**********************************************!*\
  !*** ./src/api/sockets/socket.controller.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass SocketController {\n    constructor(configs, io, database) {\n        this.configs = configs;\n        this.io = io;\n        this.database = database;\n    }\n    async initSocket() {\n        this.io.on('connection', (socket) => {\n            socket.on('THUMB_UP', async (data) => {\n                let thumbUpAlready = false;\n                const video = await this.database.videoModel.findById({ _id: data.videoId }).populate('sharedBy', 'email');\n                if (video.thumb_up.includes(socket.request.user)) {\n                    video.thumb_up.splice(video.thumb_up.indexOf(socket.request.user), 1);\n                    thumbUpAlready = false;\n                }\n                else {\n                    video.thumb_up.unshift(socket.request.user);\n                    if (video.thumb_down.includes(socket.request.user)) {\n                        video.thumb_down.splice(video.thumb_down.indexOf(socket.request.user), 1);\n                    }\n                    thumbUpAlready = true;\n                }\n                const res = await video.save();\n                socket.emit('THUMB_UP_RESPONSE', {\n                    _id: res._id,\n                    title: res.title,\n                    totalThumbUp: res.thumb_up.length,\n                    totalThumbDown: res.thumb_down.length,\n                    videoURL: res.videoURL,\n                    sharedBy: res.sharedBy,\n                    description: res.description,\n                    isThumbUpAlready: thumbUpAlready,\n                    isThumbDownAlready: false\n                });\n            });\n            socket.on('THUMB_DOWN', async (data) => {\n                let thumbDownAlready = false;\n                const video = await this.database.videoModel.findById({ _id: data.videoId }).populate('sharedBy', 'email');\n                if (video.thumb_down.includes(socket.request.user)) {\n                    video.thumb_down.splice(video.thumb_down.indexOf(socket.request.user), 1);\n                    thumbDownAlready = false;\n                }\n                else {\n                    video.thumb_down.unshift(socket.request.user);\n                    if (video.thumb_up.includes(socket.request.user)) {\n                        video.thumb_up.splice(video.thumb_up.indexOf(socket.request.user), 1);\n                    }\n                    thumbDownAlready = true;\n                }\n                const res = await video.save();\n                socket.emit('THUMB_DOWN_RESPONSE', {\n                    _id: res._id,\n                    title: res.title,\n                    totalThumbUp: res.thumb_up.length,\n                    totalThumbDown: res.thumb_down.length,\n                    videoURL: res.videoURL,\n                    sharedBy: res.sharedBy,\n                    description: res.description,\n                    isThumbUpAlready: false,\n                    isThumbDownAlready: thumbDownAlready\n                });\n            });\n        });\n    }\n}\nexports.default = SocketController;\n\n\n//# sourceURL=webpack:///./src/api/sockets/socket.controller.ts?");

/***/ }),

/***/ "./src/api/users/index.ts":
/*!********************************!*\
  !*** ./src/api/users/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst user_routes_1 = __webpack_require__(/*! ./user.routes */ \"./src/api/users/user.routes.ts\");\nexports.init = (server, configs, database) => {\n    user_routes_1.default(server, configs, database);\n};\n\n\n//# sourceURL=webpack:///./src/api/users/index.ts?");

/***/ }),

/***/ "./src/api/users/user.controller.ts":
/*!******************************************!*\
  !*** ./src/api/users/user.controller.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Boom = __webpack_require__(/*! boom */ \"boom\");\nconst Jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst Bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst uuidv4_1 = __webpack_require__(/*! uuidv4 */ \"uuidv4\");\nclass UserController {\n    constructor(configs, database) {\n        this.database = database;\n        this.configs = configs;\n    }\n    generateToken(user) {\n        const jwtSecret = this.configs.jwtSecret;\n        const jwtExpiration = this.configs.jwtExpiration;\n        const payload = {\n            id: user._id\n        };\n        return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });\n    }\n    async generateRefreshToken() {\n        const uid = uuidv4_1.uuid();\n        const SALT_ROUNDS = 8;\n        return await Bcrypt.hash(uid, SALT_ROUNDS);\n    }\n    async verifyToken(token) {\n        return new Promise((resolve, reject) => {\n            try {\n                Jwt.verify(token, this.configs.jwtSecret, (err, decoded) => {\n                    resolve(decoded.id);\n                });\n            }\n            catch (e) {\n                reject(e);\n            }\n        });\n    }\n    async loginUser(request, h) {\n        const { email, password } = request.payload;\n        let user = await this.database.userModel.findOne({ email });\n        if (!user) {\n            try {\n                const refreshToken = await this.generateRefreshToken();\n                const userInfo = await this.database.userModel.create(Object.assign({}, request.payload));\n                await this.database.refreshTokenModel.create({\n                    userId: userInfo._id,\n                    refreshToken\n                });\n                return h.response({ token: this.generateToken(userInfo), refreshToken }).code(201);\n            }\n            catch (e) {\n                return Boom.badImplementation(e);\n            }\n        }\n        if (!user.validatePassword(password)) {\n            return Boom.unauthorized('Password is invalid');\n        }\n        const refreshToken = await this.generateRefreshToken();\n        await this.database.refreshTokenModel.findOneAndUpdate({ userId: user._id }, { $set: { 'refreshToken': refreshToken } }, { new: true });\n        await user.save();\n        return {\n            token: this.generateToken(user),\n            refreshToken\n        };\n    }\n    async createUser(request, h) {\n        try {\n            const refreshToken = await this.generateRefreshToken();\n            let user = await this.database.userModel.create(Object.assign({}, request.payload));\n            await this.database.refreshTokenModel.create({\n                userId: user._id,\n                refreshToken\n            });\n            return h.response({ token: this.generateToken(user), refreshToken }).code(201);\n        }\n        catch (e) {\n            return Boom.badImplementation(e);\n        }\n    }\n    async updateUser(request, h) {\n        const id = request.auth.credentials.id;\n        try {\n            let user = await this.database.userModel.findByIdAndUpdate(id, { $set: request.payload }, { new: true });\n            return user;\n        }\n        catch (error) {\n            return Boom.badImplementation(error);\n        }\n    }\n    async deleteUser(request, h) {\n        const id = request.auth.credentials.id;\n        let user = await this.database.userModel.findByIdAndRemove(id);\n        return user;\n    }\n    async infoUser(request, h) {\n        const id = request.auth.credentials.id;\n        let user = await this.database.userModel.findById(id);\n        return {\n            email: user.email\n        };\n    }\n    async handleGenerateNewToken(request, h) {\n        try {\n            const userRefreshToken = request.payload.refreshToken;\n            const { userId } = await this.database.refreshTokenModel.findOne({ refreshToken: userRefreshToken });\n            const newRefreshToken = await this.generateRefreshToken();\n            if (!userId) {\n                return Boom.badImplementation();\n            }\n            await this.database.refreshTokenModel.findOneAndUpdate({ userId }, { $set: { 'refreshToken': newRefreshToken } }, { new: true });\n            return h.response({\n                token: this.generateToken({ _id: userId }),\n                refreshToken: newRefreshToken\n            });\n        }\n        catch (e) {\n            return Boom.badImplementation(e);\n        }\n    }\n    async logoutUser(request, h) {\n        try {\n            const id = request.auth.credentials.id;\n            await this.database.refreshTokenModel.findOneAndDelete({ userId: id });\n            return h.response({\n                data: \"\"\n            });\n        }\n        catch (e) {\n            return Boom.badImplementation(e);\n        }\n    }\n}\nexports.default = UserController;\n\n\n//# sourceURL=webpack:///./src/api/users/user.controller.ts?");

/***/ }),

/***/ "./src/api/users/user.model.ts":
/*!*************************************!*\
  !*** ./src/api/users/user.model.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nexports.UserSchema = new Mongoose.Schema({\n    email: {\n        type: String,\n        unique: true,\n        required: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n}, { timestamps: true });\nconst hashPassword = (password) => !password ? null : Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));\nexports.UserSchema.methods.validatePassword = function (requestPassword) {\n    return Bcrypt.compareSync(requestPassword, this.password);\n};\nexports.UserSchema.pre(\"save\", function (next) {\n    const user = this;\n    if (!user.isModified(\"password\")) {\n        return next();\n    }\n    user[\"password\"] = hashPassword(user[\"password\"]);\n    return next();\n});\nexports.UserSchema.pre(\"findOneAndUpdate\", function () {\n    const password = hashPassword(this.getUpdate().$set.password);\n    if (!password) {\n        return;\n    }\n    this.findOneAndUpdate({}, { password: password });\n});\nexports.UserModel = Mongoose.model(\"User\", exports.UserSchema);\n\n\n//# sourceURL=webpack:///./src/api/users/user.model.ts?");

/***/ }),

/***/ "./src/api/users/user.routes.ts":
/*!**************************************!*\
  !*** ./src/api/users/user.routes.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst user_controller_1 = __webpack_require__(/*! ./user.controller */ \"./src/api/users/user.controller.ts\");\nconst UserValidator = __webpack_require__(/*! ./user.validator */ \"./src/api/users/user.validator.ts\");\nfunction default_1(server, serverConfigs, database) {\n    const userController = new user_controller_1.default(serverConfigs, database);\n    server.bind(userController);\n    server.route({\n        method: \"GET\",\n        path: \"/api/users-info\",\n        options: {\n            handler: userController.infoUser,\n            auth: \"jwt\",\n            tags: [\"api\", \"users\"],\n            description: \"Get user info.\",\n            validate: {\n                headers: UserValidator.jwtValidator\n            }\n        }\n    });\n    server.route({\n        method: \"DELETE\",\n        path: \"/api/users\",\n        options: {\n            handler: userController.deleteUser,\n            auth: \"jwt\",\n            tags: [\"api\", \"users\"],\n            description: \"Delete current user.\",\n            validate: {\n                headers: UserValidator.jwtValidator\n            }\n        }\n    });\n    server.route({\n        method: \"POST\",\n        path: '/auth/token',\n        options: {\n            handler: userController.handleGenerateNewToken,\n            auth: false,\n            tags: [\"api\", \"users\"],\n            description: \"Generate new token\",\n        }\n    });\n    server.route({\n        method: \"PUT\",\n        path: \"/api/users\",\n        options: {\n            handler: userController.updateUser,\n            auth: \"jwt\",\n            tags: [\"api\", \"users\"],\n            description: \"Update current user info.\",\n            validate: {\n                payload: UserValidator.updateUserModel,\n                headers: UserValidator.jwtValidator\n            }\n        }\n    });\n    server.route({\n        method: \"POST\",\n        path: \"/auth/register\",\n        options: {\n            handler: userController.createUser,\n            auth: false,\n            tags: [\"api\", \"users\"],\n            description: \"Create a user.\",\n            validate: {\n                payload: UserValidator.createUserModel\n            }\n        }\n    });\n    server.route({\n        method: \"POST\",\n        path: \"/auth/login\",\n        options: {\n            handler: userController.loginUser,\n            auth: false,\n            tags: [\"api\", \"users\"],\n            description: \"Login a user.\",\n            validate: {\n                payload: UserValidator.loginUserModel\n            }\n        }\n    });\n    server.route({\n        method: \"GET\",\n        path: \"/auth/logout\",\n        options: {\n            handler: userController.logoutUser,\n            auth: \"jwt\",\n            tags: [\"api\", \"users\"],\n            description: \"Logout a user.\",\n            validate: {}\n        }\n    });\n}\nexports.default = default_1;\n\n\n//# sourceURL=webpack:///./src/api/users/user.routes.ts?");

/***/ }),

/***/ "./src/api/users/user.validator.ts":
/*!*****************************************!*\
  !*** ./src/api/users/user.validator.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Joi = __webpack_require__(/*! joi */ \"joi\");\nexports.createUserModel = Joi.object().keys({\n    email: Joi.string().email().trim().required(),\n    password: Joi.string().trim().required()\n});\nexports.updateUserModel = Joi.object().keys({\n    email: Joi.string().email().trim(),\n    password: Joi.string().trim()\n});\nexports.loginUserModel = Joi.object().keys({\n    email: Joi.string().email().required(),\n    password: Joi.string().trim().required()\n});\nexports.jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();\n\n\n//# sourceURL=webpack:///./src/api/users/user.validator.ts?");

/***/ }),

/***/ "./src/api/videos/index.ts":
/*!*********************************!*\
  !*** ./src/api/videos/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst videos_route_1 = __webpack_require__(/*! ./videos.route */ \"./src/api/videos/videos.route.ts\");\nexports.init = (server, configs, database) => {\n    videos_route_1.default(server, configs, database);\n};\n\n\n//# sourceURL=webpack:///./src/api/videos/index.ts?");

/***/ }),

/***/ "./src/api/videos/videos.controller.ts":
/*!*********************************************!*\
  !*** ./src/api/videos/videos.controller.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Boom = __webpack_require__(/*! boom */ \"boom\");\nconst ramda_1 = __webpack_require__(/*! ramda */ \"ramda\");\nclass VideoController {\n    constructor(configs, database) {\n        this.database = database;\n        this.configs = configs;\n    }\n    async shareVideo(request, h) {\n        try {\n            const userId = request.auth.credentials.id;\n            const videoShared = await this.database.videoModel.create(Object.assign(request.payload, { sharedBy: userId }));\n            return h.response(videoShared);\n        }\n        catch (e) {\n            Boom.badImplementation(e);\n        }\n    }\n    async getVideoList(request, h) {\n        try {\n            const limit = Number.isNaN(parseInt(request.query.limit)) ? 0 : parseInt(request.query.limit);\n            const page = Number.isNaN(parseInt(request.query.page)) ? 1 : parseInt(request.query.page) === 0 ? 1 : parseInt(request.query.page);\n            const videoList = await this.database.videoModel.find()\n                .sort({ createdAt: '-1' })\n                .populate(\"sharedBy\", \"email\")\n                .skip((page - 1) * limit)\n                .limit(limit);\n            const total = await this.database.videoModel.countDocuments({});\n            return h.response({\n                total,\n                page: page,\n                videoList: videoList.map(item => ({\n                    _id: item._id,\n                    title: item.title,\n                    totalThumbUp: item.thumb_up.length,\n                    totalThumbDown: item.thumb_down.length,\n                    videoURL: item.videoURL,\n                    sharedBy: item.sharedBy,\n                    description: item.description,\n                    isThumbUpAlready: ramda_1.isNil(request.auth.credentials) ? false : item.thumb_up.includes(request.auth.credentials.id),\n                    isThumbDownAlready: ramda_1.isNil(request.auth.credentials) ? false : item.thumb_down.includes(request.auth.credentials.id)\n                })),\n                hasMore: page * limit < total\n            });\n        }\n        catch (e) {\n            return Boom.badImplementation(e);\n        }\n    }\n}\nexports.default = VideoController;\n\n\n//# sourceURL=webpack:///./src/api/videos/videos.controller.ts?");

/***/ }),

/***/ "./src/api/videos/videos.model.ts":
/*!****************************************!*\
  !*** ./src/api/videos/videos.model.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nexports.VideoSchema = new Mongoose.Schema({\n    title: {\n        type: String,\n        required: true\n    },\n    videoURL: {\n        type: String,\n        required: true\n    },\n    description: {\n        type: String,\n        required: true\n    },\n    sharedBy: {\n        type: Mongoose.Schema.Types.ObjectId,\n        ref: \"User\"\n    },\n    thumb_up: [String],\n    thumb_down: [String]\n}, { timestamps: true });\nexports.VideoModel = Mongoose.model(\"Video\", exports.VideoSchema);\n\n\n//# sourceURL=webpack:///./src/api/videos/videos.model.ts?");

/***/ }),

/***/ "./src/api/videos/videos.route.ts":
/*!****************************************!*\
  !*** ./src/api/videos/videos.route.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst VideoValidator = __webpack_require__(/*! ./videos.validator */ \"./src/api/videos/videos.validator.ts\");\nconst UserValidator = __webpack_require__(/*! ../users/user.validator */ \"./src/api/users/user.validator.ts\");\nconst videos_controller_1 = __webpack_require__(/*! ./videos.controller */ \"./src/api/videos/videos.controller.ts\");\nfunction default_1(server, serverConfigs, database) {\n    const videoController = new videos_controller_1.default(serverConfigs, database);\n    server.bind(videoController);\n    server.route({\n        method: \"GET\",\n        path: \"/api/video-list\",\n        options: {\n            handler: videoController.getVideoList,\n            auth: false,\n            tags: [\"api\", \"videos\"],\n            description: \"Get video list\"\n        }\n    });\n    server.route({\n        method: \"POST\",\n        path: \"/api/share-video\",\n        options: {\n            handler: videoController.shareVideo,\n            auth: \"jwt\",\n            tags: [\"api\", \"videos\"],\n            description: \"Share Video\",\n            validate: {\n                payload: VideoValidator.shareVideo,\n                headers: UserValidator.jwtValidator\n            }\n        }\n    });\n}\nexports.default = default_1;\n\n\n//# sourceURL=webpack:///./src/api/videos/videos.route.ts?");

/***/ }),

/***/ "./src/api/videos/videos.validator.ts":
/*!********************************************!*\
  !*** ./src/api/videos/videos.validator.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Joi = __webpack_require__(/*! joi */ \"joi\");\nexports.shareVideo = Joi.object().keys({\n    title: Joi.string().required(),\n    description: Joi.string().required(),\n    videoURL: Joi.string().required()\n});\n\n\n//# sourceURL=webpack:///./src/api/videos/videos.validator.ts?");

/***/ }),

/***/ "./src/configs/config.dev.ts":
/*!***********************************!*\
  !*** ./src/configs/config.dev.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config = {\n    \"database\": {\n        \"connectionString\": \"mongodb://localhost:27017/funny-movie-dev\"\n    },\n    \"server\": {\n        \"port\": 5000,\n        \"jwtSecret\": \"random-secret-password\",\n        \"jwtExpiration\": \"0.1h\",\n        \"routePrefix\": \"\",\n        \"plugins\": [\"jwt-auth\"]\n    }\n};\nexports.default = config;\n\n\n//# sourceURL=webpack:///./src/configs/config.dev.ts?");

/***/ }),

/***/ "./src/configs/index.ts":
/*!******************************!*\
  !*** ./src/configs/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_dev_1 = __webpack_require__(/*! ./config.dev */ \"./src/configs/config.dev.ts\");\nexports.configs =  true ? config_dev_1.default : undefined;\nfunction getDatabaseConfig() {\n    return exports.configs.database;\n}\nexports.getDatabaseConfig = getDatabaseConfig;\nfunction getServerConfigs() {\n    return exports.configs.server;\n}\nexports.getServerConfigs = getServerConfigs;\n\n\n//# sourceURL=webpack:///./src/configs/index.ts?");

/***/ }),

/***/ "./src/database.ts":
/*!*************************!*\
  !*** ./src/database.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst user_model_1 = __webpack_require__(/*! ./api/users/user.model */ \"./src/api/users/user.model.ts\");\nconst videos_model_1 = __webpack_require__(/*! ./api/videos/videos.model */ \"./src/api/videos/videos.model.ts\");\nconst refreshTokens_model_1 = __webpack_require__(/*! ./api/refreshTokens/refreshTokens.model */ \"./src/api/refreshTokens/refreshTokens.model.ts\");\nexports.init = (config) => {\n    Mongoose.Promise = Promise;\n    Mongoose.connect(process.env.MONGO_URL || config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });\n    let mongoDb = Mongoose.connection;\n    mongoDb.on(\"error\", () => {\n        console.log(`Unable to connect to database: ${config.connectionString}`);\n    });\n    mongoDb.once(\"open\", () => {\n        console.log(`Connected to database: ${config.connectionString}`);\n    });\n    return {\n        userModel: user_model_1.UserModel,\n        videoModel: videos_model_1.VideoModel,\n        refreshTokenModel: refreshTokens_model_1.RefreshTokenModel\n    };\n};\n\n\n//# sourceURL=webpack:///./src/database.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Server = __webpack_require__(/*! ./server */ \"./src/server.ts\");\nconst Configs = __webpack_require__(/*! ./configs */ \"./src/configs/index.ts\");\nconst Database = __webpack_require__(/*! ./database */ \"./src/database.ts\");\nconst start = async ({ config, db }) => {\n    try {\n        const server = await Server.init(config, db);\n        await server.start();\n        console.log(\"Server running at:\", server.info.uri);\n    }\n    catch (err) {\n        console.error(\"Error starting server: \", err.message);\n        throw err;\n    }\n};\nconst dbConfigs = Configs.getDatabaseConfig();\nconst database = Database.init(dbConfigs);\nconst serverConfigs = Configs.getServerConfigs();\nstart({ config: serverConfigs, db: database }).then();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/plugins sync recursive ^\\.\\/.*$":
/*!***********************************!*\
  !*** ./src/plugins sync ^\.\/.*$ ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./interface\": \"./src/plugins/interface.ts\",\n\t\"./interface.ts\": \"./src/plugins/interface.ts\",\n\t\"./jwt-auth\": \"./src/plugins/jwt-auth/index.ts\",\n\t\"./jwt-auth/\": \"./src/plugins/jwt-auth/index.ts\",\n\t\"./jwt-auth/index\": \"./src/plugins/jwt-auth/index.ts\",\n\t\"./jwt-auth/index.ts\": \"./src/plugins/jwt-auth/index.ts\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/plugins sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./src/plugins_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/plugins/interface.ts":
/*!**********************************!*\
  !*** ./src/plugins/interface.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n\n\n//# sourceURL=webpack:///./src/plugins/interface.ts?");

/***/ }),

/***/ "./src/plugins/jwt-auth/index.ts":
/*!***************************************!*\
  !*** ./src/plugins/jwt-auth/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst register = async (server, options) => {\n    try {\n        const database = options.database;\n        const serverConfig = options.serverConfigs;\n        const validateUser = async (decoded, request, h) => {\n            const user = await database.userModel.findById(decoded.id).lean(true);\n            if (!user) {\n                return { isValid: false };\n            }\n            return { isValid: true };\n        };\n        await server.register(__webpack_require__(/*! hapi-auth-jwt2 */ \"hapi-auth-jwt2\"));\n        return setAuthStrategy(server, {\n            config: serverConfig,\n            validate: validateUser\n        });\n    }\n    catch (err) {\n        console.log(`Error registering jwt plugin: ${err}`);\n        throw err;\n    }\n};\nconst setAuthStrategy = async (server, { config, validate }) => {\n    server.auth.strategy(\"jwt\", \"jwt\", {\n        key: config.jwtSecret,\n        validate,\n        verifyOptions: {\n            algorithms: [\"HS256\"]\n        }\n    });\n    server.auth.default(\"jwt\");\n    return;\n};\nexports.default = () => {\n    return {\n        register,\n        info: () => {\n            return { name: \"JWT Authentication\", version: \"1.0.0\" };\n        }\n    };\n};\n\n\n//# sourceURL=webpack:///./src/plugins/jwt-auth/index.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Hapi = __webpack_require__(/*! hapi */ \"hapi\");\nconst User = __webpack_require__(/*! ./api/users */ \"./src/api/users/index.ts\");\nconst Videos = __webpack_require__(/*! ./api/videos */ \"./src/api/videos/index.ts\");\nconst SocketIO = __webpack_require__(/*! ./api/sockets */ \"./src/api/sockets/index.ts\");\nconst jwtAuth = __webpack_require__(/*! socketio-jwt-auth */ \"socketio-jwt-auth\");\nconst registerRouter = [User, Videos];\nconst init = async (configs, database) => {\n    try {\n        const port = process.env.PORT || configs.port;\n        const server = new Hapi.Server({\n            debug: { request: ['error'] },\n            port: port,\n            routes: {\n                cors: {\n                    origin: [\"*\"]\n                }\n            }\n        });\n        const io = __webpack_require__(/*! socket.io */ \"socket.io\")(server.listener);\n        io.use(jwtAuth.authenticate({\n            secret: configs.jwtSecret,\n            algorithm: 'HS256',\n            succeedWithoutToken: true\n        }, function (payload, done) {\n            done(null, payload.id);\n        }));\n        SocketIO.init(configs, io, database).initSocket();\n        if (configs.routePrefix) {\n            server.realm.modifiers.route.prefix = configs.routePrefix;\n        }\n        const plugins = configs.plugins;\n        const pluginOptions = {\n            database: database,\n            serverConfigs: configs\n        };\n        let pluginPromises = [];\n        plugins.forEach((pluginName) => {\n            let plugin = __webpack_require__(\"./src/plugins sync recursive ^\\\\.\\\\/.*$\")(\"./\" + pluginName).default();\n            console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);\n            pluginPromises.push(plugin.register(server, pluginOptions));\n        });\n        await Promise.all(pluginPromises);\n        console.log(\"All plugins registered successfully.\");\n        registerRouter.forEach(route => {\n            route.init(server, configs, database);\n        });\n        return new Promise(resolve => {\n            resolve(server);\n        });\n    }\n    catch (err) {\n        console.log(\"Error starting server: \", err);\n        throw err;\n    }\n};\nexports.init = init;\n\n\n//# sourceURL=webpack:///./src/server.ts?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "boom":
/*!***********************!*\
  !*** external "boom" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"boom\");\n\n//# sourceURL=webpack:///external_%22boom%22?");

/***/ }),

/***/ "hapi":
/*!***********************!*\
  !*** external "hapi" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"hapi\");\n\n//# sourceURL=webpack:///external_%22hapi%22?");

/***/ }),

/***/ "hapi-auth-jwt2":
/*!*********************************!*\
  !*** external "hapi-auth-jwt2" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"hapi-auth-jwt2\");\n\n//# sourceURL=webpack:///external_%22hapi-auth-jwt2%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }),

/***/ "socketio-jwt-auth":
/*!************************************!*\
  !*** external "socketio-jwt-auth" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socketio-jwt-auth\");\n\n//# sourceURL=webpack:///external_%22socketio-jwt-auth%22?");

/***/ }),

/***/ "uuidv4":
/*!*************************!*\
  !*** external "uuidv4" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuidv4\");\n\n//# sourceURL=webpack:///external_%22uuidv4%22?");

/***/ })

/******/ });