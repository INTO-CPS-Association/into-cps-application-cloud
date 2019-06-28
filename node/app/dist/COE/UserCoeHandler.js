"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('file-system');
class UserCoeHandler {
    constructor() {
        this.usercoes = new Set();
    }
    getUserReservedCoe(user) {
        return this.getUserCoeArr().filter(x => x.user === user);
    }
    assigntUserToCOE(user) {
        // check if a coe is available
        const availableCoes = this.getAvailableCoes();
        console.log('availableCoes');
        console.log(availableCoes);
        if (availableCoes !== undefined) {
            console.log('availableCoes.length');
            console.log(availableCoes.length);
            if (availableCoes.length === 0) {
                return false;
            }
            // add user to list of usercoes
            const randomCoe = availableCoes[Math.floor(Math.random() * availableCoes.length)];
            console.log('randomCoe');
            console.log(randomCoe);
            const usercoe = new userCoe(user, randomCoe);
            console.log('usercoe');
            console.log(usercoe);
            this.usercoes.add(usercoe);
            console.log('this.usercoes');
            console.log(this.usercoes);
            // if there is more than me assigned to this coe backoff
            console.log('this.getUserCoeArr().filter');
            console.log(this.getUserCoeArr().filter((x) => x.coe === randomCoe));
            if (this.getUserCoeArr().filter((x) => x.coe === randomCoe).length === 1) { // only 1 user assigned to coe
                return true;
            }
            else { //backoff
                this.usercoes.delete(usercoe);
                return false;
            }
        }
    }
    unassignCoeFromUser(coe) {
        this.usercoes.delete(this.getUserCoeArr().find((x) => x.coe === coe));
    }
    getUserCoeArr() {
        return Array.from(this.usercoes);
    }
    getAvailableCoes() {
        //get list of coes
        if (fs.existsSync("/data/coes")) {
            const coes = fs.readdirSync("/data/coes");
            console.log('coes');
            console.log(coes);
            //remove coes where a user is assigned
            return coes.filter((x) => this.getUserCoeArr().map((y) => y.coe).indexOf(x) <= 0);
        }
    }
}
exports.UserCoeHandler = UserCoeHandler;
class userCoe {
    constructor(user, coe) { this.user = user; this.coe = coe; }
}
exports.userCoe = userCoe;
//# sourceMappingURL=UserCoeHandler.js.map