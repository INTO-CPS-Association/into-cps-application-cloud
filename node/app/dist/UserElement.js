"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemSettings_1 = require("./SystemSettings");
class UserElement {
    constructor(req, res) {
        this.valid = false;
        let postBody = req.body;
        this.token = postBody.token;
        if (true) { //TODO: if token exists and has available session
            this.username = postBody.username; //TODO: From firebase
            this.activeProject = postBody.project; //TODO: From firebase
            this.valid = true;
        }
        else {
            this.valdationFailed(res);
        }
    }
    getProjectPath() {
        return [SystemSettings_1.Settings.destinationFolder, this.username, this.activeProject].join(SystemSettings_1.Settings.systemseperator);
    }
    valdationFailed(res) {
        res.send(SystemSettings_1.ReturnCodes.Unauthorized().code, SystemSettings_1.ReturnCodes.Unauthorized().message);
    }
}
exports.UserElement = UserElement;
//# sourceMappingURL=UserElement.js.map