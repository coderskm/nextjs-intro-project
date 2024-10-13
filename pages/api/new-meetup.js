import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const { title, image, address, description } = data;
        const client = MongoClient.connect("mongodb+srv://sumitmishraskm21:RA8e9cr1jmDTdl63@nextjs-intro-project.kix10.mongodb.net/meetups?retryWrites=true&w=majority");
        const db = (await client).db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);
        (await client).close();
        res.status(201).json({ message: "message inserted !!!" });
    }
}

export default handler;