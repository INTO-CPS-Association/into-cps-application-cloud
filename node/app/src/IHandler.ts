import { UserElement } from "./UserElement";

export class IHandler{
    res:any;
    body:any;
    user:UserElement;
    
    constructor(body:any, res:any, user:UserElement){}
}