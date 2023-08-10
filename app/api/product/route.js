const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

export async function GET(request) {
    // Replace the uri string with your connection string.
    const uri = "mongodb://0.0.0.0:27017/";

    const client = new MongoClient(uri);

    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        // Query for a movie that has the title 'Back to the Future'
        const query = { };
        const products = await inventory.find(query).toArray();
        return NextResponse.json({success: true, products})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function POST(request) {
    
    let body = await request.json();
    // Replace the uri string with your connection string.
    const uri = "mongodb://0.0.0.0:27017/";

    const client = new MongoClient(uri);

    try {

        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const product = await inventory.insertOne(body);
        return NextResponse.json({product, ok: true})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function PUT(request) {
    const uri = "mongodb://0.0.0.0:27017/";
    const client = new MongoClient(uri);
  
    try {
      const body = await request.json();
      console.log(body, "put request ki body")
      const { slug, quantity } = body;
  
      if (!slug || !quantity) {
        return new NextResponse(
          JSON.stringify({ success: false, error: "Invalid request data" }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const client = new MongoClient(uri);
  
      const database = client.db('stock');
      const inventory = database.collection('inventory');
  
      const updateResult = await inventory.updateOne({ slug }, { $set: { quantity } });
  
      if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 1) {
        return new NextResponse(
          JSON.stringify({ success: true, message: "Quantity updated successfully" }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ success: false, error: "Failed to update quantity" }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } finally {
      await client.close();
    }
  }
