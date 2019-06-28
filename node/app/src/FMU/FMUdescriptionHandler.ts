import * as fs from "fs";
import {join} from "path";
import { IHandler } from "../IHandler";
import {Settings} from "../SystemSettings";
import { UserElement } from "../UserElement";
var convert = require('xml-js');

export class FMUDesciptionHandler implements IHandler{
    res:any;
    body:any;
    user:UserElement;
    readRes:any = null;
    constructor(body:any, res:any, user:UserElement){
        this.user = user;
        this.res = res;
        this.body = body;
    }

    handle(body:any):void{
        throw new Error("CoeHandler is a multifunctional class handle(body:any) not implemented");
    }

    public getFMUDescription(){
        let result = "{";
        let sep = "";
        const arr = fs.readdirSync([this.user.getProjectPath(),  "FMUs"].join(Settings.systemseperator))
        for(let i = 0; i < arr.length; i++){
            if(arr[i].endsWith('.modelDescription.xml')) {
                result = [result,
                    "\""+arr[i].replace(".modelDescription.xml", "")+"\":" +
                    convert.xml2json(
                        fs.readFileSync(
                            [
                                this.user.getProjectPath(),
                                "FMUs",arr[i]
                            ].join(Settings.systemseperator),
                            "utf8"),
                        {compact: true, spaces: 4})
                ].join(sep);
                sep = ",";
            }
        }
        result = result + "}";
        this.res.status(200).send({"return": result});

    }
}
