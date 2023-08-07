const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

export async function GET(request) {
    // Replace the uri string with your connection string.
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);

    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        // Query for a movie that has the title 'Back to the Future'
        const query = {};
        const allProducts = await inventory.findAll(query);

        console.log(movie);
        return NextResponse.json({allProducts})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function POST(request) {
    
    let body = await request.json();
    console.log(body, "ye body hai")
    // Replace the uri string with your connection string.
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const product = await inventory.insertOne(body);
        return NextResponse.json({product, ok: true})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}