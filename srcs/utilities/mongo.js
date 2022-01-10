const { MongoClient, Db, Collection } = require("mongodb")
const FileSystem = require("fs")

console.log(process.env.MONGO_URL)
console.log(process.env.MONGO_CERT_FILE)

const EriDbConst = {
  ERI_DB_NAME: "eri",
  ERI_COLL_SCHEDULE_NAME: "eri_schedule",
  ERI_COLL_SERVERS: "eri_server",
}

class EriMongo {
  /**
   *
   * @param {(db: Db) => any} execution
   */
  static async query(execution) {
    let client
    try {
      client = await MongoClient.connect(process.env.MONGO_URL, {
        sslKey: process.env.MONGO_CERT_FILE,
        sslCert: process.env.MONGO_CERT_FILE,
      })
      const Database = client.db(EriDbConst.ERI_DB_NAME)
      await execution(Database)
    } finally {
      await client?.close()
    }
  }
}

module.exports = {
  EriMongo,
  EriDbConst,
}
