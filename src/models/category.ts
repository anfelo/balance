import { AccountType } from "./account";

export interface ICategory {
    id: string;
    name: string;
    accountType: AccountType;
    sortingOrder: number;
    created?: Date;
    updated?: Date;
}

export class Category implements ICategory {
    id: string;
    name: string;
    accountType: AccountType;
    sortingOrder: number;
    created?: Date;
    updated?: Date;

    constructor(category: any) {
        this.id = category.id || "";
        this.name = category.name || "";
        this.accountType =
            category.accountType === "asset"
                ? AccountType.Asset
                : AccountType.Liability;
        this.sortingOrder = category.sortingOrder || 0;
        this.created = new Date(category.created);
        this.updated = new Date(category.updated);
    }

    static from(object: any) {
        return new Category({
            id: object.id,
            name: object.name,
            accountType: object.accountType,
            sortingOrder: object.sortingOrder,
            created: new Date(object.created),
            updated: new Date(object.updated)
        });
    }
}
