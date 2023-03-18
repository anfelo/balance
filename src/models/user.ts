export interface IUser {
    id: string;
    username?: string;
    verified: boolean;
    email?: string;
    password?: string;
    created?: Date;
    updated?: Date;
}

export class User implements IUser {
    id: string;
    username?: string;
    verified: boolean;
    email?: string;
    password?: string;
    created?: Date;
    updated?: Date;

    constructor(user: any) {
        this.id = user.id || "";
        this.username = user.username || "";
        this.email = user.email || "";
        this.verified = !!user.verified;
        this.created = new Date(user.created);
        this.updated = new Date(user.updated);
    }

    static from(object: any) {
        return new User({
            id: object.id,
            username: object.username,
            email: object.email,
            verified: object.verified,
            created: new Date(object.created),
            updated: new Date(object.updated)
        });
    }
}
