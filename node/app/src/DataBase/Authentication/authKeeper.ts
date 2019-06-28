
export class AuthKeeper {
    public users: Map<string, firebase.auth.Auth>;
    constructor() {
        this.users = new Map();
    }
}
