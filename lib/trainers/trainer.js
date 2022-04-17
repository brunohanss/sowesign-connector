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
exports.Trainer = void 0;
var axios_1 = require("axios");
var Trainer = /** @class */ (function () {
    function Trainer(main) {
        this.main = main;
    }
    Trainer.prototype.getAll = function (include) {
        var credentials = this.main.getAccessToken();
        if (!credentials.baseUrl || !credentials.token) {
            return { isError: true, message: 'Trainer was not deleted', details: 'Invalid token' };
        }
        return all(credentials.baseUrl, credentials.token, include);
    };
    // updateOrCreate(student: SoWeSignTrainer) {
    //   const credentials = this.main.getAccessToken();
    //   if (!credentials.baseUrl || !credentials.token) {
    //     return { isError: true, message: 'Trainer was not created or edited', details: 'Invalid token' };
    //   }
    //   return updateOrCreate(credentials.baseUrl, credentials.token, student);
    // }
    Trainer.prototype.delete = function (reference) {
        var credentials = this.main.getAccessToken();
        if (!credentials.baseUrl || !credentials.token) {
            return { isError: true, message: 'Trainer was not deleted', details: 'Invalid token' };
        }
        return deleteTrainer(credentials.baseUrl, credentials.token, reference);
    };
    return Trainer;
}());
exports.Trainer = Trainer;
var all = function (baseUrl, temporaryToken, include) { return __awaiter(void 0, void 0, void 0, function () {
    var studentsResponse, students, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get(!include ? "".concat(baseUrl, "/connectors/trainers") : "".concat(baseUrl, "/connectors/trainers?include=").concat(include), {
                        headers: { Authorization: temporaryToken },
                    })];
            case 1:
                studentsResponse = _c.sent();
                students = [];
                students = studentsResponse.data;
                return [2 /*return*/, students];
            case 2:
                error_1 = _c.sent();
                return [2 /*return*/, {
                        isError: true,
                        message: 'Could not get trainers',
                        details: ((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data.messages.errors.body)
                            ? (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data.messages.errors.body.toString()
                            : error_1,
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
// const updateOrCreate = async (baseUrl: string, temporaryToken: string, rainer: SoWeSignTrainer) => {
//   try {
//     const response: AxiosResponse = await axios.post(`${baseUrl}/connectors/trainers`, {
//       headers: { Authorization: temporaryToken },
//     });
//     let student: SoWeSignTrainer;
//     student = response.data as SoWeSignTrainer;
//     return student;
//   } catch (error) {
//     return {
//       isError: true,
//       message: 'Could not edit or create trainer',
//       details:
//         (error as AxiosError).response?.data.messages.errors &&
//         (error as AxiosError).response?.data.messages.errors.body
//           ? (error as AxiosError).response?.data.messages.errors.body.toString()
//           : error,
//     };
//   }
// };
var deleteTrainer = function (baseUrl, temporaryToken, reference) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.delete("".concat(baseUrl, "/connectors/trainers?reference=").concat(reference), {
                        headers: { Authorization: temporaryToken },
                    })];
            case 1:
                response = _c.sent();
                return [2 /*return*/, { isError: false, message: 'Trainer was delete', details: response.status }];
            case 2:
                error_2 = _c.sent();
                return [2 /*return*/, {
                        isError: true,
                        message: 'Could not delete trainer',
                        details: ((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data.messages.errors.body)
                            ? (_b = error_2.response) === null || _b === void 0 ? void 0 : _b.data.messages.errors.body.toString()
                            : error_2,
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
