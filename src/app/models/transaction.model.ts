export class Transaction {
  public loanNumber: string;
  public dateReceived: string;
  public totalAmountReceived: string;
  public principal: string;
  public interest: string;
  public pmi: string;
  public escrow: string;
  public fees: string;

  constructor(
    loanNumber: string,
    dateReceived: string,
    totalAmountReceived: string,
    principal: string,
    interest: string,
    pmi: string,
    escrow: string,
    fees: string
  ) {
    this.loanNumber = loanNumber;
    this.dateReceived = dateReceived;
    this.totalAmountReceived = totalAmountReceived;
    this.principal = principal;
    this.interest = interest;
    this.pmi = pmi;
    this.escrow = escrow;
    this.fees = fees;
  }
}
