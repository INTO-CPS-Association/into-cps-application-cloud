"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemSettings_1 = require("../SystemSettings");
const multer = require('multer');
var fs = require('file-system');
class ProjectUploadHandler {
    constructor(destination, username, projectname, sep) {
    }
    static getUploadFileHandler(destinationFolder, systemseperator, filesplitter) {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                const postBody = req.body;
                let pathArr = file.originalname.split(filesplitter);
                let userfolder = [destinationFolder, postBody.username].join(systemseperator);
                let filepath = [userfolder, pathArr.join(systemseperator)].join(systemseperator);
                let arr = filepath.split(systemseperator);
                arr.pop();
                let folderpath = arr.join(systemseperator);
                fs.mkdirSync(folderpath);
                console.log(folderpath);
                cb(null, '');
            },
            filename: function (req, file, cb) {
                const postBody = req.body;
                let pathArr = file.originalname.split(filesplitter);
                let userfolder = [destinationFolder, postBody.username].join(systemseperator);
                let filepath = [userfolder, pathArr.join(systemseperator)].join(systemseperator);
                let arr = filepath.split(systemseperator);
                arr.pop();
                let folderpath = arr.join(systemseperator);
                console.log(filepath);
                if (fs.existsSync(folderpath)) {
                    cb(null, filepath);
                }
                else {
                    fs.mkdirSync(folderpath, function () {
                        cb(null, filepath);
                    });
                }
            }
        });
    }
    static AsyncFmuCrawler(username, proejct, fmuPaths) {
        let JSZip = require("jszip");
        var fs = require('fs');
        for (var i = 0; i < fmuPaths.length; i++) {
            let fmuPath = [SystemSettings_1.Settings.destinationFolder, username, proejct, fmuPaths[i]].join(SystemSettings_1.Settings.systemseperator);
            fs.readFile(fmuPath, function (err, data) {
                if (err)
                    throw err;
                JSZip.loadAsync(data).then(function (zip) {
                    return zip.file("modelDescription.xml").async("text");
                }).then(function (xml) {
                    fs.writeFile(fmuPath + ".modelDescription.xml", xml, (err) => {
                        if (err)
                            throw err;
                    });
                });
            });
        }
    }
}
exports.ProjectUploadHandler = ProjectUploadHandler;
//# sourceMappingURL=ProjectUploadHandler.js.map