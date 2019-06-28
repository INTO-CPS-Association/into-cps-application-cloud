import { Settings, ReturnCodes } from "./SystemSettings";

export class UserElement{
    token:string;
    username:string;
    activeProject:string;
    valid:boolean = false;

    constructor(req:any,res:any){
        let postBody = req.body;
        this.token = postBody.token;
        if(true){ //TODO: if token exists and has available session
            this.username = postBody.username; //TODO: From firebase
            this.activeProject = postBody.project; //TODO: From firebase
            this.valid = true;
        }else{
            this.valdationFailed(res);
        }
    }
    
    getProjectPath(){
        return [Settings.destinationFolder, this.username, this.activeProject].join(Settings.systemseperator)
    }

    private valdationFailed(res:any){
        res.send(ReturnCodes.Unauthorized().code, ReturnCodes.Unauthorized().message)
    }

}
