var fs = require('file-system');

export class UserCoeHandler {

    usercoes: Set<userCoe>;

    constructor() {
        this.usercoes = new Set<userCoe>();
    }

    public getUserReservedCoe(user: string) {
        return this.getUserCoeArr().filter(x => x.user === user);
    }

    public assigntUserToCOE(user: string) {
        // check if a coe is available
        const availableCoes = this.getAvailableCoes();
        console.log('availableCoes');
        console.log(availableCoes);
        if(availableCoes !== undefined) {

            console.log('availableCoes.length');
            console.log(availableCoes.length);
            if (availableCoes.length === 0) {
                return false;
            }
            // add user to list of usercoes
            const randomCoe = availableCoes[Math.floor(Math.random() * availableCoes.length)];
            console.log('randomCoe');
            console.log(randomCoe);
            const usercoe = new userCoe(user, randomCoe)
            console.log('usercoe');
            console.log(usercoe);
            this.usercoes.add(usercoe);
            console.log('this.usercoes');
            console.log(this.usercoes);
            // if there is more than me assigned to this coe backoff
            console.log('this.getUserCoeArr().filter');
            console.log(this.getUserCoeArr().filter((x) => x.coe === randomCoe));
            if (this.getUserCoeArr().filter((x) => x.coe === randomCoe).length === 1) { // only 1 user assigned to coe
                return true;
            } else { //backoff
                this.usercoes.delete(usercoe);
                return false;
            }
        }
    }
    
    unassignCoeFromUser(coe: string) {
        this.usercoes.delete(this.getUserCoeArr().find((x) => x.coe === coe));
    }

    private getUserCoeArr() {
        return Array.from(this.usercoes);
    }

    private getAvailableCoes() {
        //get list of coes

        if (fs.existsSync("/data/coes")) {
            const coes = fs.readdirSync("/data/coes");
            console.log('coes')
            console.log(coes)
            //remove coes where a user is assigned
            return coes.filter((x: any) => this.getUserCoeArr().map((y) => y.coe).indexOf(x) <= 0);
        }
    }

}
export class userCoe{
    user: string;
    coe: string;
    constructor(user: string, coe: string){this.user = user; this.coe = coe }
}
