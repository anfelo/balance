import { IAccount, Account } from "./account";

export interface IBalance {
    id: string;
    name: string;
    accounts: IAccount[];
    date: Date | null;
    created?: Date;
    updated?: Date;
}

export class Balance implements IBalance {
    id: string;
    name: string;
    accounts: IAccount[];
    date: Date | null;
    created?: Date;
    updated?: Date;

    constructor(balance: any) {
        this.id = balance.id || "";
        this.name = balance.name || "";
        this.accounts = balance.accounts?.length
            ? balance.accounts.map((acc: IAccount) => Account.from(acc))
            : [];
        this.date = balance.date ? new Date(balance.date) : null;
        this.created = new Date(balance.created);
        this.updated = new Date(balance.updated);
    }

    static from(object: any) {
        return new Balance({
            id: object.id,
            name: object.name,
            accounts: object?.expand?.accounts || [],
            date: object.date,
            created: new Date(object.created),
            updated: new Date(object.updated)
        });
    }
}
