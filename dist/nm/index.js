"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var Bluebird = require("bluebird");
var _ = require("lodash");
var types_1 = require("./types");
var dbus = require('dbus-native');
var systemBus = dbus.systemBus();
var service = ['org', 'freedesktop', 'NetworkManager'];
var NetworkManager = /** @class */ (function (_super) {
    __extends(NetworkManager, _super);
    function NetworkManager() {
        var _this = _super.call(this) || this;
        _this.toggleWifi = function (value) { return __awaiter(_this, void 0, void 0, function () {
            var success, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        success = false;
                        if (!value) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connectDevice(this.devices.wifi.path)];
                    case 1:
                        success = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.disconnectDevice(this.devices.wifi.path)];
                    case 3:
                        success = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, success];
                    case 5:
                        err_1 = _a.sent();
                        throw formatError(500, "Could not toggleWifi", err_1);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        _this.callMethod = function (path) {
            if (path === void 0) { path = []; }
            return function (iface) {
                if (iface === void 0) { iface = []; }
                return function (_a) {
                    var method = _a[0], signature = _a[1];
                    return function (params) {
                        if (params === void 0) { params = []; }
                        return Bluebird.fromCallback(function (callback) {
                            var command = {
                                path: _.isString(path) ? path : "/" + service.concat(path).join('/'),
                                destination: service.join('.'),
                                interface: _.isString(iface) ? iface : service.concat(iface).join('.'),
                                member: method,
                                signature: signature,
                                body: params
                            };
                            systemBus.invoke(command, callback);
                        });
                    };
                };
            };
        };
        _this.getObjectProperty = function (_a, path) {
            var iface = _a[0], prop = _a[1];
            return __awaiter(_this, void 0, void 0, function () {
                var _b, _c, err, _d, key, value;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, to(this.callMethod(path)('org.freedesktop.DBus.Properties')(['Get', 'ss'])([iface, prop]))];
                        case 1:
                            _c = _e.sent(), err = _c[0], _d = _c[1], key = _d[0], value = _d[1][0];
                            if (err) {
                                throw formatError(500, "Could not getObjectProperty on " + path, err);
                            }
                            return [2 /*return*/, (_b = { path: path }, _b[prop] = value, _b)];
                    }
                });
            });
        };
        _this.getWifiDevice = function () { return __awaiter(_this, void 0, void 0, function () {
            var devices_1, getDevicesProperty, devicesTypes, wifiDevices, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.callMethod()()(['GetDevices', ''])()];
                    case 1:
                        devices_1 = _a.sent();
                        getDevicesProperty = function () { return _.map(devices_1, _.partial(_this.getObjectProperty, ['org.freedesktop.NetworkManager.Device', 'DeviceType'])); };
                        return [4 /*yield*/, Bluebird.all(getDevicesProperty())];
                    case 2:
                        devicesTypes = _a.sent();
                        wifiDevices = _.filter(devicesTypes, function (_a) {
                            var DeviceType = _a.DeviceType;
                            return (DeviceType === NetworkManager.DEVICE_TYPE.WIFI);
                        });
                        this.devices.wifi = wifiDevices[0];
                        return [2 /*return*/, this.devices.wifi];
                    case 3:
                        err_2 = _a.sent();
                        throw formatError(500, "Could not getWifiDevice", err_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.getDeviceStatus = function (device) { return __awaiter(_this, void 0, void 0, function () {
            var State, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _.partial(this.getObjectProperty, ['org.freedesktop.NetworkManager.Device', 'State'])(device.path)];
                    case 1:
                        State = (_a.sent()).State;
                        return [2 /*return*/, State];
                    case 2:
                        err_3 = _a.sent();
                        throw formatError(500, "Could not getDeviceStatus", err_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.connectDevice = function (path) { return _this.callMethod()()(['ActivateConnection', 'ooo'])(['/', path, '/']); };
        _this.disconnectDevice = function (path) { return _this.callMethod(path)('org.freedesktop.NetworkManager.Device')(['Disconnect', ''])(); };
        _this.activateConnection = function (params) { return _this.callMethod()()(['ActivateConnection', 'ooo'])(params); };
        _this.addConnection = function (params) { return _this.callMethod(['Settings'])(['Settings'])(['AddConnection', 'a{sa{sv}}'])([params]); };
        _this.deleteConnection = function (path) { return _this.callMethod(path)(['Settings', 'Connection'])(['Delete', ''])(); };
        _this.requestScan = function (params) { return _this.callMethod(_this.devices.wifi.path)('org.freedesktop.NetworkManager.Device.Wireless')(['RequestScan', 'a{sv}'])([params]); };
        _this.getActiveConnections = function () { return _this.callMethod()('org.freedesktop.DBus.Properties')(['Get', 'ss'])(['org.freedesktop.NetworkManager', 'ActiveConnections']); };
        _this.getConnectionSettings = function (path) { return __awaiter(_this, void 0, void 0, function () {
            var value, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.callMethod(path)(['Settings', 'Connection'])(['GetSettings', ''])()];
                    case 1:
                        value = _a.sent();
                        return [2 /*return*/, { path: path, settings: value }];
                    case 2:
                        err_4 = _a.sent();
                        throw formatError(500, "Could not getConnectionSettings on " + path, err_4);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.connectNetwork = function (network) { return __awaiter(_this, void 0, void 0, function () {
            var connectionParam, ap, results, wifiConnection, networkSettings, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectionParam = [
                            ['connection', [
                                    ['id', ['s', network.ssid]],
                                    ['type', ['s', '802-11-wireless']],
                                ]],
                            ['802-11-wireless', [
                                    ['ssid', ['ay', [stringToArrayOfBytes(network.ssid)]]],
                                    ['mode', ['s', 'infrastructure']],
                                ]],
                            ['802-11-wireless-security', [
                                    ['auth-alg', ['s', 'open']],
                                    ['key-mgmt', ['s', 'wpa-psk']],
                                    ['psk', ['s', network.passphrase]],
                                ]],
                            ['ipv4', [
                                    ['method', ['s', 'auto']],
                                ]],
                            ['ipv6', [
                                    ['method', ['s', 'auto']],
                                ]],
                        ];
                        ap = _.find(this.accessPoints, function (props) {
                            return props.Ssid.toString() === network.ssid;
                        });
                        if (_.isUndefined(ap)) {
                            return [2 /*return*/, Bluebird.reject(formatError(404, "Could not find neaby AccessPoints with SSID: " + network.ssid))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.listConnections()];
                    case 2:
                        results = _a.sent();
                        wifiConnection = findConnection(results, network);
                        if (!!_.isUndefined(wifiConnection)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.activateConnection([wifiConnection.path, this.devices.wifi.path, '/'])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4: return [4 /*yield*/, this.addConnection(connectionParam)];
                    case 5:
                        networkSettings = _a.sent();
                        return [4 /*yield*/, this.activateConnection([networkSettings, this.devices.wifi.path, '/'])];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                    case 7:
                        err_5 = _a.sent();
                        throw formatError(500, 'Could not connectNetwork', err_5);
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        _this.listConnections = function () { return __awaiter(_this, void 0, void 0, function () {
            var connections_1, getConnectionsSettings, results, err_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.callMethod(['Settings'])(['Settings'])(['ListConnections', ''])()];
                    case 1:
                        connections_1 = _a.sent();
                        getConnectionsSettings = function () { return _.map(connections_1, _this.getConnectionSettings); };
                        return [4 /*yield*/, Bluebird.all(getConnectionsSettings())];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 3:
                        err_6 = _a.sent();
                        throw formatError(500, "Could not listConnections", err_6);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.forgetNetwork = function (network) { return __awaiter(_this, void 0, void 0, function () {
            var results, wifiConnection, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.listConnections()];
                    case 1:
                        results = _a.sent();
                        wifiConnection = findConnection(results, network);
                        return [4 /*yield*/, this.deleteConnection(wifiConnection.path)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Bluebird.resolve()];
                    case 3:
                        err_7 = _a.sent();
                        throw formatError(500, "Could not forgetNetwork", err_7);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.listNearbyNetworks = function () { return __awaiter(_this, void 0, void 0, function () {
            var requestScanParams, AccessPoints_1, getApsProperties, rawAccessPoints, accessPoints, err_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        requestScanParams = [
                            ['ssids', ['aay', [stringToArrayOfBytes('1')]]],
                        ];
                        return [4 /*yield*/, this.requestScan(requestScanParams)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getObjectProperty(['org.freedesktop.NetworkManager.Device.Wireless', 'AccessPoints'], this.devices.wifi.path)];
                    case 2:
                        AccessPoints_1 = (_a.sent()).AccessPoints;
                        getApsProperties = function () { return _.map(AccessPoints_1, _this.getApProperties); };
                        return [4 /*yield*/, Bluebird.all(getApsProperties())];
                    case 3:
                        rawAccessPoints = _a.sent();
                        accessPoints = _.map(rawAccessPoints, function (rawProps) {
                            var props = _.reduce(rawProps, function (acc, prop) {
                                return __assign({}, acc, prop);
                            }, {});
                            return props;
                        });
                        this.accessPoints = accessPoints;
                        return [2 /*return*/, makeNetworksReadable(this.accessPoints)];
                    case 4:
                        err_8 = _a.sent();
                        throw formatError(500, "Could not listNearbyNetworks", err_8);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.getApProperties = function (path) { return __awaiter(_this, void 0, void 0, function () {
            var props, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Bluebird.all([
                                this.getObjectProperty(['org.freedesktop.NetworkManager.AccessPoint', 'Ssid'], path),
                                this.getObjectProperty(['org.freedesktop.NetworkManager.AccessPoint', 'Flags'], path),
                                this.getObjectProperty(['org.freedesktop.NetworkManager.AccessPoint', 'WpaFlags'], path),
                                this.getObjectProperty(['org.freedesktop.NetworkManager.AccessPoint', 'RsnFlags'], path),
                                this.getObjectProperty(['org.freedesktop.NetworkManager.AccessPoint', 'Frequency'], path),
                            ])];
                    case 1:
                        props = _a.sent();
                        return [2 /*return*/, props];
                    case 2:
                        err_9 = _a.sent();
                        throw formatError(500, "Could not get ap " + path + " property", err_9);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getCurrentNetwork = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, key, connections_2, getConnectionsType, results, wifiConnection, Id, err_10;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getActiveConnections()];
                    case 1:
                        _a = _b.sent(), key = _a[0], connections_2 = _a[1][0];
                        getConnectionsType = function () { return _.map(connections_2, _.partial(_this.getObjectProperty, ['org.freedesktop.NetworkManager.Connection.Active', 'Type'])); };
                        return [4 /*yield*/, Bluebird.all(getConnectionsType())];
                    case 2:
                        results = _b.sent();
                        wifiConnection = _.filter(results, function (_a) {
                            var Type = _a.Type;
                            return Type === '802-11-wireless';
                        })[0];
                        return [4 /*yield*/, this.getObjectProperty(['org.freedesktop.NetworkManager.Connection.Active', 'Id'], wifiConnection.path)];
                    case 3:
                        Id = (_b.sent()).Id;
                        return [2 /*return*/, Id];
                    case 4:
                        err_10 = _b.sent();
                        throw formatError(500, "Could not getCurrentNetwork", err_10);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.devices = {
            wifi: {
                path: '',
                DeviceType: 0
            }
        };
        return _this;
    }
    NetworkManager.prototype.init = function () {
        return this.getWifiDevice();
    };
    NetworkManager.prototype.getBus = function () {
        return systemBus;
    };
    return NetworkManager;
}(types_1.NetworkManagerTypes));
exports.NetworkManager = NetworkManager;
function formatError(type, message, err) {
    if (type === void 0) { type = 400; }
    if (err === void 0) { err = {}; }
    return { type: type, message: message, err: err };
}
function findConnection(connections, network) {
    return _.head(_.filter(connections, function (result) {
        var connectionProps = getProp(result.settings, 'connection');
        var _a = getProp(connectionProps, 'id'), type = _a[0], id = _a[1][0];
        return id === network.ssid;
    }));
}
function makeNetworksReadable(rawNetworks) {
    return _.map(rawNetworks, function (rawNetwork) {
        var network = _.reduce(rawNetwork, function (acc, val, key) {
            switch (key) {
                case 'Ssid':
                    acc[key] = val.toString();
                    break;
                case 'Flags':
                    var apSec = checkSecurityProps(NetworkManager.AP_802_11S)(val);
                    acc[key] = apSec;
                    break;
                case 'WpaFlags':
                case 'RsnFlags':
                    var props = checkSecurityProps(NetworkManager.AP_802_11_SEC)(val);
                    acc[key] = props;
                    break;
                case 'Frequency':
                    acc[key] = (Math.floor(val / 100)) / 10;
                    break;
                default:
                    acc[key] = val;
            }
            return acc;
        }, {});
        var newNetwork = _.omit(network, ['path', 'Flags', 'WpaFlags', 'RsnFlags']);
        newNetwork.security = {
            open: true
        };
        if (network.Flags.PRIVACY) {
            newNetwork.security.open = false;
            if (_.isEmpty(network.WpaFlags) && _.isEmpty(network.RsnFlags)) {
                newNetwork.security.encryption = 'wep';
            }
            if (!_.isEmpty(network.WpaFlags)) {
                newNetwork.security.encryption = 'wpa';
            }
            if (!_.isEmpty(network.RsnFlags)) {
                newNetwork.security.encryption = 'wpa2';
            }
            if (network.WpaFlags.KEY_MGMT_802_1X || network.RsnFlags.KEY_MGMT_802_1X) {
                newNetwork.security.encryption = 'enterprise';
            }
        }
        return newNetwork;
    });
}
function checkSecurityProps(nmSecurityTypes) {
    return function (prop) {
        var bitFlagVal = _.reverse((prop).toString(2).split(''));
        var flags = _.pickBy(nmSecurityTypes, function (sec, k) {
            var bitSecVal = _.reverse((sec).toString(2).split(''));
            var check = _.filter(_.map(bitFlagVal, function (bit, i) {
                var active = bit === '1' && bit === bitSecVal[i];
                return { active: active, k: k };
            }), 'active')[0];
            return !_.isUndefined(check);
        });
        return flags;
    };
}
function stringToArrayOfBytes(str) {
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
function getProp(s, prop) {
    var _a = s.find(function (s) { return s[0] === prop; }), key = _a[0], value = _a[1];
    return value;
}
function to(promise) {
    return promise.then(function (result) { return [null, result]; })["catch"](function (err) { return [err]; });
}