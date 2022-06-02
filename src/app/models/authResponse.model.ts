export class AuthResponse {
    public idToken: string;
    public expirationDate: Date;
    public loanNumber: string;

    constructor(idToken: string, expirationDate: Date, loanNumber: string) {
        this.idToken = idToken;
        this.expirationDate = expirationDate;
        this.loanNumber = loanNumber;
    }
}