import { Db, MongoClient } from "mongodb";

type MongoQueryFunction = (db: Db) => any

export interface DiscordServerSettingsT {
    server_id?: string,
    missingu?: string,
    schedule_gt?: string
}

export const defaultServerSettings: DiscordServerSettingsT = {
    server_id: undefined,
    missingu: undefined,
    schedule_gt: undefined,
}

export default class EriMongoDB {
    static EriDbConst = {
        ERI_DB_NAME: "eri",
        ERI_COLL_SCHEDULE_NAME: "eri_schedule",
        ERI_COLL_SERVERS: "eri_server"
    }

    static async query(execution: MongoQueryFunction) {
        let client
        try {
            if (process.env.MONGO_URL)
                client = await MongoClient.connect(process.env.MONGO_URL, {
                    sslKey: process.env.MONGO_CERT_FILE,
                    sslCert: process.env.MONGO_CERT_FILE
                });
            if (!client) throw new Error()
            const Database = client.db(EriMongoDB.EriDbConst.ERI_DB_NAME);
            await execution(Database)
        } finally {
            await client?.close();
        }
    }

}