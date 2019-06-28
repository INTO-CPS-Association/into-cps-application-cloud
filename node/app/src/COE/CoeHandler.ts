import {MMCreator} from '../MM/MMCreator';
import {Settings} from "../SystemSettings";
import {UserElement} from '../UserElement';
import {IHandler} from '../IHandler';
import {UserCoeHandler} from "./UserCoeHandler";
//const WebSocket = require('ws');
var path = require('path');
var fs = require('file-system');
const RxHR = require('@akanass/rx-http-request').RxHR;

export class CoeHandler implements IHandler {
    child = require('child_process');
    mmCreator: MMCreator;
    res: any;
    body: any;
    user: UserElement;
    coeaddress: string;
    userCoeHandler: UserCoeHandler;

    constructor(body: any, res: any, user: UserElement, userCoeHandler: UserCoeHandler) {
        this.user = user;
        this.res = res;
        this.body = body;
        this.mmCreator = new MMCreator(this.body, this.res, this.user);
        //Get or reserve your coe
        var usercoe = userCoeHandler.getUserReservedCoe(this.user.username);
        if (usercoe.length === 0) {
            userCoeHandler.assigntUserToCOE(this.user.username);
            usercoe = userCoeHandler.getUserReservedCoe(this.user.username);
        }
        if (usercoe.length === 0) {
            this.res.send(200, {"return": "No Available COE"});
            return;
        }
        this.coeaddress = usercoe[0].coe;
        this.userCoeHandler = userCoeHandler;
    }

    public getCoeResultPath(sessionId: string) {
        return "/data/coes/" + this.coeaddress + "/" + sessionId;
    }

    handle(body: any): void {
        throw new Error("CoeHandler is a multifunctional class handle(body:any) not implemented");
    }

    //Becomes usefull for offline
    /*public StartCoe(port: number) {
        return this.child.spawn(
            "java", ["-jar", "utils/coe.jar", "-p", port],
        );
    }*/
    public getCoeAddress(subUrl: string = "") {
        return Settings.CoeProtocol + this.coeaddress + Settings.CoePort + subUrl;
    }

    public createSession(port: number) {
        RxHR.get(this.getCoeAddress("/createSession)")).subscribe(
            (data: any) => {
                const sessionId = JSON.parse(data.body).sessionId;
                this.res.send(200, {"return": sessionId});
            }, (err: any) => {
                console.error(err);
            },
        );
    }


      async getStatus() {
        const sessionId = this.body.sessionId;
        const csv=require('csvtojson');
        const isFinished = fs.existsSync(this.getCoeResultPath(this.body.sessionId) + "/Finished.txt");
          RxHR.get(this.getCoeAddress("/result/" + sessionId + "/plain")).subscribe(
            (data: any) => {
                const csvData = data.body;
                csv()
                .fromString(csvData)
                .then((jsonObj:any) => {
                    const obj = Object.assign(jsonObj, isFinished);
                    this.res.send(200, {"return": JSON.stringify({finished: isFinished, results: obj})});
                });
            }, (err: any) => {
                console.error(err);
            },
        );
    }

    public initCoeOnSession(port: number) {
        let data = this.getSimulationConfig();
        console.log(this.body.sessionId);
        RxHR.post(this.getCoeAddress("/initialize/" + this.body.sessionId), {
            body: JSON.parse(data),
            json: true,
        }).subscribe(
            (d: any) => {
                this.res.send(200, {"return": d});
                //this.status();
                this.startSimulation(port);
            }, (err: any) => {
                console.error(err);
            },
        )
        ;
    }

    private startSimulation(port: number) {
        let data = this.getSimulationConfig();
        RxHR.post(this.getCoeAddress("/simulate/" + this.body.sessionId), {
            body: JSON.parse(data),
            json: true,
        }).subscribe(
            (d: any) => {
                if (d.body.status === "Finished") {
                    const coe = d.response.request.uri.hostname;
                    this.userCoeHandler.unassignCoeFromUser(coe);
                    fs.writeFileSync(this.getCoeResultPath(this.body.sessionId) + "/Finished.txt", "Finished", (err: any) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                //console.log(d);
            }, (err: any) => {
                console.error(err);
            },
        )
        ;
    }

    private getSimulationConfig() {
        console.log(this.body.coSimPath)
        const cosim = this.readCoSim(this.body.coSimPath);
        console.log(JSON.parse(cosim).multimodel_path)
        const mm = this.readMM(JSON.parse(cosim).multimodel_path);
        return (mm + cosim).replace(/\s/g, "").replace('}{', ',');

    }

    private readMM(mmPath: string) {
        let content = fs.readFileSync([this.user.getProjectPath(), mmPath].join(Settings.systemseperator).replace(/\\/g, '/'), "utf8");
        const fmus = fs.readdirSync(this.user.getProjectPath() + "/FMUs");
        fmus.forEach((fmu: any) => {
            let route = path.resolve(process.cwd(), this.user.getProjectPath() + "/FMUs/" + fmu);
            content = content.replace(fmu, "file:///" + route.replace(/\\/g, '/'));
        });
        return content;
    }

    private readCoSim(CoSimPath: string) {
        return fs.readFileSync([this.user.getProjectPath(), CoSimPath].join(Settings.systemseperator), "utf8");
    }

    public stopSimulation() {
        this.userCoeHandler.unassignCoeFromUser( this.coeaddress);
        RxHR.get(this.getCoeAddress("/stopsimulation/" + this.body.sessionId));
    }
}
