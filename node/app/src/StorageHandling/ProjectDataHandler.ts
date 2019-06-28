import {UserElement} from "../UserElement";
import {Settings} from '../SystemSettings';
import {IHandler} from '../IHandler';

var fs = require('file-system');
var recursiveReadSync = require("recursive-readdir-sync"), files: any;
var Path = require('path');

export class ProjectDataHandler implements IHandler {
    filelist: string[];
    res: any;
    body: any;
    user: UserElement;

    constructor(body: any, res: any, user: UserElement) {
        this.user = user;
        this.res = res;
        this.body = body;
    }

    handle(): void {
        this.filelist = [];
        this.getFiles(Folders.DSE, Filters.DSE);
        this.getFiles(Folders.FMU, Filters.FMU);
        this.getFiles(Folders.MODEL, Filters.MODEL_MEX, Filters.MODEL_MO, Filters.MODEL_PROJECT);
        this.getFiles(Folders.MM, Filters.MM);
        this.getFiles(Folders.COSIM, Filters.COSIM);
        this.getFiles(Folders.SYSML, Filters.SYSML);
        this.res.status(200).send({"return": this.filelist});
    }

    public getFMUs(): string[] {
        console.log("1");
        this.filelist = [];
        this.getFiles(Folders.FMU, Filters.FMU);
        console.log(this.filelist);
        return this.filelist;
    }

    private getFiles(folder: Folders, ...filters: Filters[]) {
        let folderPath = [this.user.getProjectPath(), folder].join(Settings.systemseperator);
        if (fs.existsSync(folderPath)) {
            this.crawl(folderPath, this.user.getProjectPath(), filters);
        }
    }

    private crawl(dir: string, projectPath: string, filters: Filters[]) {
        try {
            files = recursiveReadSync(dir);
        } catch (err) {
            if (err.errno === 34) {
                console.log('Path does not exist');
            } else {
                throw err;
            }
        }
        for (var i = 0; i < files.length; i++) {
            for (var k = 0; k < filters.length; k++) {
                if (files[i].toLowerCase().endsWith(filters[k])) {
                    let str: string = files[i];
                    str = str.split('\\').join(Settings.systemseperator); //IN CASE OF WINDOWS
                    str = str.replace(projectPath + Settings.systemseperator, '');
                    //let extendsion = str.split('.').slice(1).join('.');
                    this.filelist.push(str);
                }
            }
        }
    }
}

export enum Filters {
    DSE = '.dse.json',
    MM = '.mm.json',
    COSIM = '.coe.json',
    FMU = '.fmu',
    SYSML = '.sysml.json',
    UMS = '.csv',
    MODEL_MO = '.mo',
    MODEL_PROJECT = '.project',
    MODEL_MEX = '.mex',
}

export enum Folders {
    DSE = 'DSEs',
    MM = 'Multi-models',
    COSIM = 'Multi-models',
    FMU = 'FMUs',
    SYSML = 'SysML',
    UMS = 'userMetricScripts',
    MODEL = 'Models'
}
