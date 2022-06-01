export class User {
    public loanNumber: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public token?: string

    constructor(loanNumber: string, firstName: string, lastName: string, email: string, password: string, token? : string) {
        this.loanNumber = loanNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.token = token;
    }
}