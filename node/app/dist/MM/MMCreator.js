"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemSettings_1 = require("../SystemSettings");
const CoSimulationConfig_1 = require("./CoSimulationConfig/CoSimulationConfig");
var fs = require('file-system');
class MMCreator {
    constructor(body, res, user) {
        this.multimodelFodler = 'Multi-models';
        this.user = user;
        this.res = res;
        this.body = body;
    }
    handle(body) {
        throw new Error("CoeHandler is a multifunctional class handle(body:any) not implemented");
    }
    createMMFromSysML() {
        let folderpath = [this.user.getProjectPath(), this.multimodelFodler, this.body.MMname].join(SystemSettings_1.Settings.systemseperator);
        let filepath = [folderpath, this.body.MMname].join(SystemSettings_1.Settings.systemseperator) + '.mm.json';
        fs.mkdir(folderpath);
        fs.copyFile(this.body.sysMLpath, filepath, (err) => {
            if (err)
                throw err;
            console.log('source.txt was copied to destination.txt');
        });
    }
    getMM() {
        const path = [this.user.getProjectPath(), this.body.path].join(SystemSettings_1.Settings.systemseperator).replace(/\\/g, "/");
        this.res.status(200).send({ "return": fs.readFileSync(path, 'utf8') });
    }
    createCoSim() {
        let folderpath = [this.user.getProjectPath(), this.multimodelFodler, this.body.MMname, this.body.CoeSimName].join(SystemSettings_1.Settings.systemseperator);
        fs.mkdir(folderpath);
        let filepath = [folderpath, this.body.CoeSimName].join(SystemSettings_1.Settings.systemseperator) + '.coe.json';
        let data = JSON.stringify(new CoSimulationConfig_1.CoSimulationConfig());
        [this.user.getProjectPath(), this.multimodelFodler, this.body.MMname, this.body.CoeSimName, this.body.CoeSimName + 'coe.json'].join(SystemSettings_1.Settings.systemseperator);
        fs.writeFile(filepath, data, function (err) {
            if (err)
                throw err;
            console.log('complete');
        });
    }
    getCoSim() {
        this.res.status(200).send({ "return": fs.readFileSync([this.user.getProjectPath(), this.body.path].join(SystemSettings_1.Settings.systemseperator), 'utf8') });
    }
    createCoSimConfig() {
        let folderpath = [this.user.getProjectPath(), this.multimodelFodler, this.body.MMname].join(SystemSettings_1.Settings.systemseperator);
        let MMfilepath = [folderpath, this.body.MMname].join(SystemSettings_1.Settings.systemseperator) + '.mm.json';
        let COEfilepath = [folderpath, this.body.CoeSimName, this.body.CoeSimName].join(SystemSettings_1.Settings.systemseperator) + '.coe.json';
        let contentA = fs.readFileSync(MMfilepath, 'utf8', function (err, MMdata) { if (err)
            throw err; });
        let contentB = fs.readFileSync(COEfilepath, 'utf8', function (err, COEdata) { if (err)
            throw err; });
        return (contentA + contentB).replace(/\s/g, "").replace('}{', ',');
    }
    createCoMessage() {
        let config = new CoSimulationConfig_1.CoSimulationConfig();
        var message = {
            startTime: config.startTime,
            endTime: config.endTime,
            reportProgress: true,
            liveLogInterval: config.livestreamInterval
        };
        return JSON.stringify(message);
    }
}
exports.MMCreator = MMCreator;
//# sourceMappingURL=MMCreator.js.map