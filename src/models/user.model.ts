import { ObjectId } from "mongodb";

export interface UserDocument {
    _id: ObjectId;
    name: string;
    password: string;
    token: null | string;
}

export default class User {

    private __id: ObjectId;
    private _name: string;
    private _password: string;
    private _token: null | string;


    constructor(id: ObjectId, name: string, password: string, token?: null | string);

    constructor(userDocument: UserDocument);

    constructor(userDocumentOrId: UserDocument | ObjectId, name?: string, password?: string, token?: null | string) {
        if (userDocumentOrId instanceof ObjectId) {
            this.__id = userDocumentOrId;
            this._name = name!;
            this._password = password!;
            this._token = token === undefined ? null : token;
        } else {
            this.__id = userDocumentOrId._id;
            this._name = userDocumentOrId.name;
            this._password = userDocumentOrId.password;
            this._token = userDocumentOrId.token;
        }
    }

    get _id(): ObjectId {
        return this.__id;
    }

    get name(): string {
        return this._name;
    }

    get password(): string {
        return this._password;
    }

    get token(): null | string {
        return this._token;
    }

    set token(value: null | string) {
        this._token = value;
    }

    toJson(): UserDocument {
        return {
            _id: this._id,
            name: this.name,
            password: this.password,
            token: this.token,
        };
    }
}
