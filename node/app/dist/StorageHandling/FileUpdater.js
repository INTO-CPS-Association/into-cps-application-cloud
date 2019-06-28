"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemSettings_1 = require("../SystemSettings");
var fs = require("file-system");
class FileUpdater {
    constructor(body, res, user) {
        this.user = user;
        this.res = res;
        this.body = body;
    }
    handle() {
        const path = this.body.path;
        const json = this.body.json;
        console.log([this.user.getProjectPath(), json].join(SystemSettings_1.Settings.systemseperator));
        console.log(this.body);
        fs.writeFile([this.user.getProjectPath(), path].join(SystemSettings_1.Settings.systemseperator), json.replace(/\\\\/g, '/'), (err) => {
            if (err) {
                throw err;
            }
            this.res.status(200).send({ "return": "SUCCESS" });
        });
    }
}
exports.FileUpdater = FileUpdater;
//# sourceMappingURL=FileUpdater.js.map