// mongodb.js

import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://quocthinhred:*Thinh123@cluster0.ls1wegf.mongodb.net/test"
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client = new MongoClient(uri, options)
let clientPromise = client.connect()

export default clientPromise