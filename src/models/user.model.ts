import { ObjectId } from "mongodb";

export interface UserDocument {
    _id: ObjectId;
    name: string;
    password: string;
    token: null | string;
    objective: Objective;
}


export interface Objective {
    fat: number | null;
    protein: number | null;
    calories: number | null;
}

export default class User {

    private __id: ObjectId;
    private _name: string;
    private _password: string;
    private _token: null | string;
    private _objective: Objective;


    constructor(name: string, password: string, id?: ObjectId, objective?: Objective, token?: null | string);

    constructor(userDocument: UserDocument);

    constructor(userDocumentOrName: UserDocument | string, password?: string,id?: ObjectId, objective?: Objective, token?: null | string) {
        if (typeof userDocumentOrName === 'string') {
            this.__id = id!;
            this._name = userDocumentOrName;
            this._password = password!;
            this._token = token === undefined ? null : token;
            this._objective = objective || { fat: null, protein: null, calories: null };
        } else {
            this.__id = userDocumentOrName._id;
            this._name = userDocumentOrName.name;
            this._password = userDocumentOrName.password;
            this._token = userDocumentOrName.token;
            this._objective = userDocumentOrName.objective || { fat: null, protein: null, calories: null };
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

    get objective(): Objective {
        return this._objective;
    }

    set objective(value: Objective) {
        this._objective = value;
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
            objective: this._objective,
        };
    }
}
