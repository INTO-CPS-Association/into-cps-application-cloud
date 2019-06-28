export class MM{
    fmus:Map<string,string>;
    connections:Map<string,Map<string,Map<string,string>[]>>;
    parameters:Map<string,Map<string,Number>> = new Map();
    arr : { [key:string]:string; } = {};
    ar : { [key:string]:{ [key:string]:{ a:string,b:string }[]; }; } = {};
    constructor(){}

    public addFMU(){
        
    }
    public addConnection(outputInstance:string,outputVariable:string, inputInstance:string, inputVariable:string){
        let A = new Map().set(inputVariable,inputInstance);
        let B = new Map().set(outputVariable,[A]);
        this.parameters.set(outputInstance,B);
    }
}

