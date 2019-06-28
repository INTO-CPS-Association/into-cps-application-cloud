"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('file-system');
const firebase = __importStar(require("firebase"));
const SystemSettings_1 = require("../../SystemSettings");
class AuthenticationHandler {
    constructor() {
        // Initialize Firebase
        this.fireConfig = {
            apiKey: "AIzaSyAGam6LcukpZHcoa7De6He6PyOq-hAZBEM",
            authDomain: "intocps-d5e8b.firebaseapp.com",
            databaseURL: "https://intocps-d5e8b.firebaseio.com",
            projectId: "intocps-d5e8b",
            storageBucket: "intocps-d5e8b.appspot.com",
            messagingSenderId: "55124526957",
        };
        firebase.initializeApp(this.fireConfig);
    }
    login(authKeeper, res, username, password) {
        if (username && this.validateEmail(username) && password) {
            const auth = firebase.auth();
            this.authenticate(authKeeper, res, auth, username, password, AuthFunction.SIGNIN);
        }
        else {
            this.error(res);
        }
    }
    signup(authKeeper, res, username, password) {
        if (username && this.validateEmail(username) && password) {
            const auth = firebase.auth();
            this.authenticate(authKeeper, res, auth, username, password, AuthFunction.SIGNUP);
        }
        else {
            this.error(res);
        }
    }
    signOut(authKeeper, res, uid) {
        if (uid) {
            authKeeper.users.get(uid).signOut();
            authKeeper.users.delete(uid);
        }
        else {
            this.error(res);
        }
    }
    resetPassword(res, email) {
        if (email) {
            firebase.auth().sendPasswordResetEmail(email);
        }
        else {
            this.error(res);
        }
    }
    authenticate(authKeeper, res, auth, username, password, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let userObj;
            try {
                switch (func) {
                    case AuthFunction.SIGNUP:
                        userObj = yield auth.createUserWithEmailAndPassword(username, password);
                        break;
                    case AuthFunction.SIGNIN:
                        userObj = yield auth.signInWithEmailAndPassword(username, password);
                        break;
                }
                if (userObj) {
                    const uid = userObj.user.uid;
                    fs.mkdirSync(SystemSettings_1.Settings.destinationFolder + "/" + uid);
                    authKeeper.users.set(uid, auth);
                    res.send(200, { "return": uid });
                }
                else {
                    this.error(res);
                }
            }
            catch (e) {
                this.error(res);
            }
        });
    }
    error(res) {
        res.send(SystemSettings_1.ReturnCodes.Unauthorized().code, SystemSettings_1.ReturnCodes.Unauthorized().message);
    }
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
exports.AuthenticationHandler = AuthenticationHandler;
var AuthFunction;
(function (AuthFunction) {
    AuthFunction[AuthFunction["SIGNUP"] = 0] = "SIGNUP";
    AuthFunction[AuthFunction["SIGNIN"] = 1] = "SIGNIN";
})(AuthFunction = exports.AuthFunction || (exports.AuthFunction = {}));
//# sourceMappingURL=authenticationHandler.js.map