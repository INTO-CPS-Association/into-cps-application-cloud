"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('file-system');
class ProjectsDataHandler {
    constructor(body, res, user) {
        this.user = user;
        this.res = res;
        this.body = body;
    }
    handle() {
        this.res.status(200).send({ "return": fs.readdirSync(this.user.getProjectPath()) });
    }
}
exports.ProjectsDataHandler = ProjectsDataHandler;
//# sourceMappingURL=ProjectsDataHandler.js.map