import User from "../models/user.model";

export default class UserDto {

    name: string;
    _id: string;

    constructor(user: User) {
        this.name = user.name;
        this._id = user._id.toString();
    }
}