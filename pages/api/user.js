// user.js
import clientPromise from "../../lib/mongodb";
import NextCors from 'nextjs-cors';


export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, 
 });
  const client = await clientPromise;
  const db = client.db("room-money");
  let bodyObject = req.body
  switch (req.method) {
    case "POST":
      if (bodyObject) {
        let mySpent = await db.collection("user").insertOne(bodyObject);
        res.json(mySpent.ops[0]);
      }
      break;
    case "GET":
      const allUsers = await db.collection("user").find({}).toArray();
      res.json({ status: 200, data: allUsers });
      break;
    case "DELETE":
      const myDelete = await db.collection("user").deleteOne(bodyObject)
      res.json({status: 200});
  }
}