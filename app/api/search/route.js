const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query")

    // Replace the uri string with your connection string.
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);

    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');


        const products = await inventory.aggregate([
            {
              $match: {
                $or: [
                  { slug: { $regex: query, $options: "i" } }
                ]
              }
            }
          ]).toArray()


        return NextResponse.json({success: true, products})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}