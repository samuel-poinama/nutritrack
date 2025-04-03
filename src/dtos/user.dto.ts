import User from "../models/user.model";

export default class UserDto {

    name: string;
    password: string;
    token: null | string;
    _id: string;

    constructor(user: User) {
        this.name = user.name;
        this.password = user.password;
        this.token = user.token;
        this._id = user._id.toString();
    }
}