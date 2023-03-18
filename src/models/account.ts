import { ICategory, Category } from "./category";

export enum AccountType {
    Asset = "asset",
    Liability = "liability"
}

export interface IAccount {
    id: string;
    type: AccountType;
    categoryId: string;
    category?: ICategory;
    balanceId: string;
    name: string;
    amount: number;
    currency: string;
    created?: Date;
    updated?: Date;
}

export class Account implements IAccount {
    id: string;
    type: AccountType;
    categoryId: string;
    category?: ICategory;
    balanceId: string;
    name: string;
    amount: number;
    currency: string;
    created?: Date;
    updated?: Date;

    constructor(account: any) {
        this.id = account.id || "";
        this.type =
            account.type === AccountType.Asset
                ? AccountType.Asset
                : AccountType.Liability;
        this.categoryId = account.categoryId;
        this.balanceId = account.balanceId;
        this.amount = +account.amount;
        this.currency = account.currency;
        this.name = account.name || "";
        this.created = new Date(account.created);
        this.updated = new Date(account.updated);
    }

    static from(object: any) {
        return new Account({
            id: object.id,
            name: object.name,
            type: object.type,
            category: object.category,
            categoryId: object.categoryId,
            balanceId: object.balanceId,
            amount: object.amount,
            currency: object.currency,
            created: new Date(object.created),
            updated: new Date(object.updated)
        });
    }
}
