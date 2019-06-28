"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const SystemSettings_1 = require("../SystemSettings");
var convert = require('xml-js');
class FMUDesciptionHandler {
    constructor(body, res, user) {
        this.readRes = null;
        this.user = user;
        this.res = res;
        this.body = body;
    }
    handle(body) {
        throw new Error("CoeHandler is a multifunctional class handle(body:any) not implemented");
    }
    getFMUDescription() {
        let result = "{";
        let sep = "";
        const arr = fs.readdirSync([this.user.getProjectPath(), "FMUs"].join(SystemSettings_1.Settings.systemseperator));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].endsWith('.modelDescription.xml')) {
                result = [result,
                    "\"" + arr[i].replace(".modelDescription.xml", "") + "\":" +
                        convert.xml2json(fs.readFileSync([
                            this.user.getProjectPath(),
                            "FMUs", arr[i]
                        ].join(SystemSettings_1.Settings.systemseperator), "utf8"), { compact: true, spaces: 4 })
                ].join(sep);
                sep = ",";
            }
        }
        result = result + "}";
        this.res.status(200).send({ "return": result });
    }
}
exports.FMUDesciptionHandler = FMUDesciptionHandler;
//# sourceMappingURL=FMUdescriptionHandler.js.map