"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemSettings_1 = require("../SystemSettings");
var fs = require('file-system');
var recursiveReadSync = require("recursive-readdir-sync"), files;
var Path = require('path');
class ProjectDataHandler {
    constructor(body, res, user) {
        this.user = user;
        this.res = res;
        this.body = body;
    }
    handle() {
        this.filelist = [];
        this.getFiles(Folders.DSE, Filters.DSE);
        this.getFiles(Folders.FMU, Filters.FMU);
        this.getFiles(Folders.MODEL, Filters.MODEL_MEX, Filters.MODEL_MO, Filters.MODEL_PROJECT);
        this.getFiles(Folders.MM, Filters.MM);
        this.getFiles(Folders.COSIM, Filters.COSIM);
        this.getFiles(Folders.SYSML, Filters.SYSML);
        this.res.status(200).send({ "return": this.filelist });
    }
    getFMUs() {
        console.log("1");
        this.filelist = [];
        this.getFiles(Folders.FMU, Filters.FMU);
        console.log(this.filelist);
        return this.filelist;
    }
    getFiles(folder, ...filters) {
        let folderPath = [this.user.getProjectPath(), folder].join(SystemSettings_1.Settings.systemseperator);
        if (fs.existsSync(folderPath)) {
            this.crawl(folderPath, this.user.getProjectPath(), filters);
        }
    }
    crawl(dir, projectPath, filters) {
        try {
            files = recursiveReadSync(dir);
        }
        catch (err) {
            if (err.errno === 34) {
                console.log('Path does not exist');
            }
            else {
                throw err;
            }
        }
        for (var i = 0; i < files.length; i++) {
            for (var k = 0; k < filters.length; k++) {
                if (files[i].toLowerCase().endsWith(filters[k])) {
                    let str = files[i];
                    str = str.split('\\').join(SystemSettings_1.Settings.systemseperator); //IN CASE OF WINDOWS
                    str = str.replace(projectPath + SystemSettings_1.Settings.systemseperator, '');
                    //let extendsion = str.split('.').slice(1).join('.');
                    this.filelist.push(str);
                }
            }
        }
    }
}
exports.ProjectDataHandler = ProjectDataHandler;
var Filters;
(function (Filters) {
    Filters["DSE"] = ".dse.json";
    Filters["MM"] = ".mm.json";
    Filters["COSIM"] = ".coe.json";
    Filters["FMU"] = ".fmu";
    Filters["SYSML"] = ".sysml.json";
    Filters["UMS"] = ".csv";
    Filters["MODEL_MO"] = ".mo";
    Filters["MODEL_PROJECT"] = ".project";
    Filters["MODEL_MEX"] = ".mex";
})(Filters = exports.Filters || (exports.Filters = {}));
var Folders;
(function (Folders) {
    Folders["DSE"] = "DSEs";
    Folders["MM"] = "Multi-models";
    Folders["COSIM"] = "Multi-models";
    Folders["FMU"] = "FMUs";
    Folders["SYSML"] = "SysML";
    Folders["UMS"] = "userMetricScripts";
    Folders["MODEL"] = "Models";
})(Folders = exports.Folders || (exports.Folders = {}));
//# sourceMappingURL=ProjectDataHandler.js.map