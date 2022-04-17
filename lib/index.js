"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.SoWeSign = void 0;
var axios_1 = require("axios");
var student_1 = require("./students/student");
var thirds_1 = require("./thirds/thirds");
var trainer_1 = require("./trainers/trainer");
var SoWeSign = /** @class */ (function () {
    function SoWeSign() {
        this.baseUrl = 'https://app.sowesign.com/api';
        this.toIgnoreStudents = [];
        this.students = new student_1.Student(this);
        this.trainers = new trainer_1.Trainer(this);
        this.thirds = new thirds_1.Third(this);
    }
    /**
     * @description Inits the SoWeSign class with the token and baseUrl
     * @param token Token to use to get the temporary token
     * @param baseUrl Base url of the SoWeSign api
     */
    SoWeSign.prototype.initialize = function (token, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.token = token;
                        this.baseUrl = baseUrl || this.baseUrl;
                        return [4 /*yield*/, this.getTemporaryToken()];
                    case 1:
                        _a.sent();
                        this.lastTokenDate = new Date();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    SoWeSign.prototype.tokenValidityCheck = function (date1, date2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Math.abs(date1.getTime() - date2.getTime()) / 36e5 > 22)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getTemporaryToken()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SoWeSign.prototype.getTemporaryToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tempToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/portal/authentication/token"), {}, { headers: { Authorization: "".concat(this.token) } })];
                    case 1:
                        tempToken = (_a.sent()).data;
                        if (tempToken && tempToken.token && tempToken.type) {
                            this.temporaryToken = "".concat(tempToken.type, " ").concat(tempToken.token);
                            // console.log('Got token', this.temporaryToken);
                        }
                        else {
                            // console.log('Could not get token');
                            // console.log(tempToken);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SoWeSign.prototype.getAccessToken = function () {
        this.tokenValidityCheck(new Date(), this.lastTokenDate || new Date());
        return { token: this.temporaryToken, baseUrl: this.baseUrl };
    };
    return SoWeSign;
}());
exports.SoWeSign = SoWeSign;
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.wait = wait;
// interface SoWeSignStudent {
//   reference: string;
//   gender: 'm' | 'f';
//   lastName: string;
//   firstName: string;
//   birthDate: string;
//   email: string;
//   mobilePhone: string;
//   phone: string;
//   start: string;
//   end: string;
//   data: {
//     data1: string;
//     data2: string;
//     data3: string;
//     data4: string;
//     data5: string;
//     data6: string;
//     data7: string;
//     data8: string;
//     dataJson: any;
//     region: string;
//     erp: any;
//     bi: any;
//     cfa: any;
//   };
//   address: {
//     addressLine1: any;
//     addressLine2: any;
//     addressLine3: any;
//     addressLine4: any;
//     zipcode: any;
//     city: any;
//     state: any;
//     country: any;
//   };
//   employer: any;
//   thirds: [];
//   financers: [];
//   opcaNumber: any;
//   regionNumber: any;
//   unemployedNumber: any;
//   fileNumber: string;
//   biNumber: any;
//   cfaNumber: any;
//   training: string;
//   degree: string;
//   corporate: any;
//   ssoUid: any;
//   requiredSignature: boolean;
//   typeRegion: any;
//   weeklyEnterprise: any;
//   nationalIdentity: any;
// }
