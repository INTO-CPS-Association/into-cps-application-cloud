"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MMCreator_1 = require("../MM/MMCreator");
const SystemSettings_1 = require("../SystemSettings");
//const WebSocket = require('ws');
var path = require('path');
var fs = require('file-system');
const RxHR = require('@akanass/rx-http-request').RxHR;
class CoeHandler {
    constructor(body, res, user, userCoeHandler) {
        this.child = require('child_process');
        this.user = user;
        this.res = res;
        this.body = body;
        this.mmCreator = new MMCreator_1.MMCreator(this.body, this.res, this.user);
        //Get or reserve your coe
        var usercoe = userCoeHandler.getUserReservedCoe(this.user.username);
        if (usercoe.length === 0) {
            userCoeHandler.assigntUserToCOE(this.user.username);
            usercoe = userCoeHandler.getUserReservedCoe(this.user.username);
        }
        if (usercoe.length === 0) {
            this.res.send(200, { "return": "No Available COE" });
            return;
        }
        this.coeaddress = usercoe[0].coe;
        this.userCoeHandler = userCoeHandler;
    }
    getCoeResultPath(sessionId) {
        return "/data/coes/" + this.coeaddress + "/" + sessionId;
    }
    handle(body) {
        throw new Error("CoeHandler is a multifunctional class handle(body:any) not implemented");
    }
    //Becomes usefull for offline
    /*public StartCoe(port: number) {
        return this.child.spawn(
            "java", ["-jar", "utils/coe.jar", "-p", port],
        );
    }*/
    getCoeAddress(subUrl = "") {
        return SystemSettings_1.Settings.CoeProtocol + this.coeaddress + SystemSettings_1.Settings.CoePort + subUrl;
    }
    createSession(port) {
        RxHR.get(this.getCoeAddress("/createSession)")).subscribe((data) => {
            const sessionId = JSON.parse(data.body).sessionId;
            this.res.send(200, { "return": sessionId });
        }, (err) => {
            console.error(err);
        });
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = this.body.sessionId;
            const csv = require('csvtojson');
            const isFinished = fs.existsSync(this.getCoeResultPath(this.body.sessionId) + "/Finished.txt");
            RxHR.get(this.getCoeAddress("/result/" + sessionId + "/plain")).subscribe((data) => {
                const csvData = data.body;
                csv()
                    .fromString(csvData)
                    .then((jsonObj) => {
                    const obj = Object.assign(jsonObj, isFinished);
                    this.res.send(200, { "return": JSON.stringify({ finished: isFinished, results: obj }) });
                });
            }, (err) => {
                console.error(err);
            });
        });
    }
    initCoeOnSession(port) {
        let data = this.getSimulationConfig();
        console.log(this.body.sessionId);
        RxHR.post(this.getCoeAddress("/initialize/" + this.body.sessionId), {
            body: JSON.parse(data),
            json: true,
        }).subscribe((d) => {
            this.res.send(200, { "return": d });
            //this.status();
            this.startSimulation(port);
        }, (err) => {
            console.error(err);
        });
    }
    startSimulation(port) {
        let data = this.getSimulationConfig();
        RxHR.post(this.getCoeAddress("/simulate/" + this.body.sessionId), {
            body: JSON.parse(data),
            json: true,
        }).subscribe((d) => {
            if (d.body.status === "Finished") {
                const coe = d.response.request.uri.hostname;
                this.userCoeHandler.unassignCoeFromUser(coe);
                fs.writeFileSync(this.getCoeResultPath(this.body.sessionId) + "/Finished.txt", "Finished", (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
            //console.log(d);
        }, (err) => {
            console.error(err);
        });
    }
    getSimulationConfig() {
        console.log(this.body.coSimPath);
        const cosim = this.readCoSim(this.body.coSimPath);
        console.log(JSON.parse(cosim).multimodel_path);
        const mm = this.readMM(JSON.parse(cosim).multimodel_path);
        return (mm + cosim).replace(/\s/g, "").replace('}{', ',');
    }
    readMM(mmPath) {
        let content = fs.readFileSync([this.user.getProjectPath(), mmPath].join(SystemSettings_1.Settings.systemseperator).replace(/\\/g, '/'), "utf8");
        const fmus = fs.readdirSync(this.user.getProjectPath() + "/FMUs");
        fmus.forEach((fmu) => {
            let route = path.resolve(process.cwd(), this.user.getProjectPath() + "/FMUs/" + fmu);
            content = content.replace(fmu, "file:///" + route.replace(/\\/g, '/'));
        });
        return content;
    }
    readCoSim(CoSimPath) {
        return fs.readFileSync([this.user.getProjectPath(), CoSimPath].join(SystemSettings_1.Settings.systemseperator), "utf8");
    }
    stopSimulation() {
        this.userCoeHandler.unassignCoeFromUser(this.coeaddress);
        RxHR.get(this.getCoeAddress("/stopsimulation/" + this.body.sessionId));
    }
}
exports.CoeHandler = CoeHandler;
//# sourceMappingURL=CoeHandler.js.map