import { Settings } from "../SystemSettings";

const multer = require('multer');
var fs = require('file-system');

export class ProjectUploadHandler{

    constructor(destination:string, username:string, projectname:string, sep:string){
    }

    public static getUploadFileHandler(destinationFolder:string,systemseperator:string,filesplitter:string){
        return multer.diskStorage({
                destination: function(req:any, file:any, cb:any) {
                    const postBody = req.body;
                    let pathArr = file.originalname.split(filesplitter);
                    let userfolder = [destinationFolder, postBody.username].join(systemseperator);
                    let filepath = [userfolder,pathArr.join(systemseperator)].join(systemseperator);
                    let arr = filepath.split(systemseperator);
                    arr.pop();
                    let folderpath = arr.join(systemseperator);
                    fs.mkdirSync(folderpath);
                    console.log(folderpath)
                    cb(null, '');
                },
                filename: function(req:any, file:any, cb:any) {
                    const postBody = req.body;
                    let pathArr = file.originalname.split(filesplitter);
                    let userfolder = [destinationFolder, postBody.username].join(systemseperator);
                    let filepath = [userfolder,pathArr.join(systemseperator)].join(systemseperator);
                    let arr = filepath.split(systemseperator);
                    arr.pop();
                    let folderpath = arr.join(systemseperator);
                    console.log(filepath)
                    if (fs.existsSync(folderpath)) {
                        cb(null, filepath);
                    }else{
                        fs.mkdirSync(folderpath, function(){
                            cb(null, filepath);
                        });
                    }
                }
        });
    }

    public static AsyncFmuCrawler(username: string, proejct: string, fmuPaths:string[]){
        let JSZip = require("jszip");
        var fs = require('fs');
        for(var i = 0; i< fmuPaths.length; i++){
            let fmuPath = [Settings.destinationFolder,username,proejct,fmuPaths[i]].join(Settings.systemseperator);
            fs.readFile(fmuPath, function (err: any, data: any) {
                if (err)
                    throw err;
                JSZip.loadAsync(data).then(function (zip: any) {
                    return zip.file("modelDescription.xml").async("text");
                }).then(function (xml: string) {
                    fs.writeFile(fmuPath+".modelDescription.xml", xml, (err:any) => {
                        if (err) throw err;
                    }); 
                });
            });
        }
    }

}
