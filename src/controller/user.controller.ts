import { Collection, Db, ObjectId } from "mongodb";
import User, { UserDocument } from "../models/user.model";


export default class UserController {

    private readonly collection: Collection;

    constructor(
        db: Db,
    ) {
        this.collection = db.collection('users');
    }

    async getById(id: string) {
        const user = await this.collection.findOne({ _id: new ObjectId(id) });
        return user;
    }

    async getByName(name: string) {
        const user = await this.collection.findOne({ name }) as UserDocument | null;
        return user ? new User(user) : null;
    }

    async create(name: string, password: string) {
        const user = await this.collection.insertOne({ name, password, token: null });
        return new User(user.insertedId, name, password);
    }

    async update(user: User) {
        await this.collection.updateOne({ _id: user._id }, { $set: user.toJson() });
    }

}