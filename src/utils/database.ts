import { Db, MongoClient } from 'mongodb';

export default class Database {
    private _client: MongoClient | null = null;
    private _db: Db | null = null;

    get db() {
        return this._db;
    }

    public connection() {
        if (!this._client) {
            return () => {
                this._client = new MongoClient(process.env.MONGO_URI as string);
                this._client.connect()
                    .then(() => {
                        console.log('Connected to MongoDB');
                    })
                    .catch((err) => {
                        console.error('Error connecting to MongoDB', err);
                    });

                this._db = this._client.db();
            }
        }

        return async () => {}
    }
}