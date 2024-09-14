export class AccountOperationDetails {
    receiver: string;
    receiverAccount: string;
    debtor?: string;
    debtorAccount?: string;

    constructor(debtor: string, debtorAccount: string, receiver: string, receiverAccount: string) {
        this.debtor = debtor;
        this.debtorAccount = debtorAccount;
        this.receiver = receiver;
        this.receiverAccount = receiverAccount;
    }
}
