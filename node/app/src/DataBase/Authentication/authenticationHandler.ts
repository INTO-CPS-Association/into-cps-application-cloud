var fs = require('file-system');
import * as firebase from "firebase";
import {ReturnCodes, Settings} from "../../SystemSettings";
import {AuthKeeper} from "./authKeeper";
export class AuthenticationHandler {

    // Initialize Firebase
    private fireConfig = {
        apiKey: "AIzaSyAGam6LcukpZHcoa7De6He6PyOq-hAZBEM",
        authDomain: "intocps-d5e8b.firebaseapp.com",
        databaseURL: "https://intocps-d5e8b.firebaseio.com",
        projectId: "intocps-d5e8b",
        storageBucket: "intocps-d5e8b.appspot.com",
        messagingSenderId: "55124526957",
    };

    constructor() {
        firebase.initializeApp(this.fireConfig);
    }

    public login(authKeeper: AuthKeeper, res: any, username: string, password: string) {
        if (username && this.validateEmail(username) && password) {
            const auth = firebase.auth();
            this.authenticate(authKeeper, res, auth, username, password, AuthFunction.SIGNIN);
        } else {
            this.error(res);
        }
    }

    public signup(authKeeper: AuthKeeper, res: any, username: string, password: string) {
        if (username && this.validateEmail(username) && password) {
            const auth = firebase.auth();
            this.authenticate(authKeeper, res, auth, username, password, AuthFunction.SIGNUP);
        } else {this.error(res); }
    }

    public signOut(authKeeper: AuthKeeper, res: any, uid: string) {
        if (uid) {
            authKeeper.users.get(uid).signOut();
            authKeeper.users.delete(uid);
        } else {this.error(res); }
    }

    public resetPassword(res: any, email: string) {
        if (email) {
        firebase.auth().sendPasswordResetEmail(email);
        } else {this.error(res); }
    }

    private async authenticate(authKeeper: AuthKeeper, res: any, auth: firebase.auth.Auth, username: string, password: string, func: AuthFunction) {
        let userObj: any;
        try {
            switch (func) {
                case AuthFunction.SIGNUP:
                    userObj = await auth.createUserWithEmailAndPassword(username, password);
                    break;
                case AuthFunction.SIGNIN:
                    userObj = await auth.signInWithEmailAndPassword(username, password);
                    break;
            }
            if (userObj) {
                const uid = userObj.user.uid;
                fs.mkdirSync(Settings.destinationFolder + "/" + uid);
                authKeeper.users.set(uid, auth);
                res.send(200, {"return": uid});
            } else {
                this.error(res);
            }
        } catch (e) {
            this.error(res);
        }
    }

    private error(res: any) {
        res.send(ReturnCodes.Unauthorized().code, ReturnCodes.Unauthorized().message);
    }

    private validateEmail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}
export enum AuthFunction {
    SIGNUP,
    SIGNIN,
}
