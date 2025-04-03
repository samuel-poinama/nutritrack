import { ObjectId } from "mongodb";

export interface UserDocument {
    _id: ObjectId;
    name: string;
    password: string;
    token: null | string;
    objective: Objective;
    meals: Meal[];
}


export interface Objective {
    fat: number | null;
    protein: number | null;
    calories: number | null;
}

export interface Meal {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    date: Date;
}

export default class User {

    private __id: ObjectId;
    private _name: string;
    private _password: string;
    private _token: null | string;
    private _objective: Objective;
    private _meals: Meal[];


    constructor(name: string, password: string, id?: ObjectId, objective?: Objective, meal?: Meal[], token?: null | string);

    constructor(userDocument: UserDocument);

    constructor(userDocumentOrName: UserDocument | string, password?: string,id?: ObjectId, objective?: Objective, meals?: Meal[], token?: null | string) {
        if (typeof userDocumentOrName === 'string') {
            this.__id = id!;
            this._name = userDocumentOrName;
            this._password = password!;
            this._token = token === undefined ? null : token;
            this._objective = objective || { fat: null, protein: null, calories: null };
            this._meals = meals || [];
        } else {
            this.__id = userDocumentOrName._id;
            this._name = userDocumentOrName.name;
            this._password = userDocumentOrName.password;
            this._token = userDocumentOrName.token;
            this._objective = userDocumentOrName.objective || { fat: null, protein: null, calories: null };
            this._meals = userDocumentOrName.meals || [];
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

    get meals(): Meal[] {
        return this._meals;
    }

    set meals(value: Meal[]) {
        this._meals = value;
    }

    toJson(): UserDocument {
        return {
            _id: this._id,
            name: this.name,
            password: this.password,
            token: this.token,
            objective: this._objective,
            meals: this._meals
        };
    }
}
