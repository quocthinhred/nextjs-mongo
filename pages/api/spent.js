// spent.js
import NextCors from 'nextjs-cors';
import clientPromise from "../../lib/mongodb";

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
        let mySpent = await db.collection("spent").insertOne(bodyObject);
        res.json(mySpent.ops[0]);
      }
      break;
    case "GET":
      const allSpent = await db.collection("spent").find({}).toArray();
      res.json({ status: 200, data: allSpent });
      break;
    case "DELETE":
      const myDelete = await db.collection("spent").deleteOne(bodyObject)
      res.json({status: 200});
  }
}