import { IHandler } from "./../IHandler";
import { UserElement } from "./../UserElement";
var fs = require('file-system');

export class ProjectsDataHandler implements IHandler{
    filelist:string[];
    body:any;
    res:any;
    user:UserElement;

    constructor(body:any, res:any,user:UserElement){
        this.user = user;
        this.res = res;
        this.body = body;
    }

    handle(): void {
        this.res.status(200).send({"return": fs.readdirSync(this.user.getProjectPath())});
    }
}
