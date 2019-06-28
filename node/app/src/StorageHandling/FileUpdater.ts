import {IHandler} from "../IHandler";
import {Settings} from "../SystemSettings";
import {UserElement} from "../UserElement";

var fs = require("file-system");

export class FileUpdater implements IHandler {
    res: any;
    body: any;
    user: UserElement;

    constructor(body: any, res: any, user: UserElement) {
        this.user = user;
        this.res = res;
        this.body = body;
    }

    public handle() {
        const path = this.body.path;
        const json = this.body.json;
        console.log([this.user.getProjectPath(), json].join(Settings.systemseperator))
        console.log(this.body)
        fs.writeFile([this.user.getProjectPath(), path].join(Settings.systemseperator), json.replace(/\\\\/g, '/'), (err: any) => {
            if (err) {
                throw err;
            }
            this.res.status(200).send({"return": "SUCCESS"});
        });
    }
}
