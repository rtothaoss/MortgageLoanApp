export class User {
    public loanNumber: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public _token?: string
    public _tokenExpirationDate?: Date

    constructor(loanNumber: string, firstName: string, lastName: string, email: string, password: string, _token? : string, _tokenExpirationDate?: Date) {
        this.loanNumber = loanNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this._token = _token;
        this._tokenExpirationDate = _tokenExpirationDate;
    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this.token;
    }
}