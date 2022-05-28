export class Mortgage {
    public loanNumber: string;
    public loanTotalAmount: string;
    public totalMonthlyPayment: string;
    public remainingLoanBalance: string;

    constructor( loanNumber: string, loanTotalAmount: string, totalMonthlyPayment: string, remainingLoanBalance: string) {
        this.loanNumber = loanNumber;
        this.loanTotalAmount = loanTotalAmount;
        this.totalMonthlyPayment = totalMonthlyPayment;
        this.remainingLoanBalance = remainingLoanBalance;
    }



}