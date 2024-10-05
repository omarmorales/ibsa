import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/connect";

interface ProductCursor {
  firstBatch: any[]; // Define the expected structure of firstBatch if known
}

interface ProductsResponse {
  cursor?: ProductCursor | null; // It can also be null
}

export async function GET(req: NextRequest) {
  try {
    // Extract search query from the URL
    const q = req.nextUrl.searchParams.get("q");

    if (!q || q.trim() === "") {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    // Run search query on products collection
    const products: ProductsResponse = await prisma.$runCommandRaw({
      aggregate: "Product",
      pipeline: [
        {
          $search: {
            index: "searchProducts",
            text: {
              query: q,
              path: {
                wildcard: "*", // Search across all fields
              },
            },
          },
        },
      ],
      cursor: {},
    });

    console.log("GET searched products", products);

    // Check if products.cursor is an object and has the firstBatch property
    const firstBatch: any[] = 
      products.cursor && typeof products.cursor === 'object' && 
      'firstBatch' in products.cursor
        ? (products.cursor as ProductCursor).firstBatch
        : [];

    // Return the search result
    return NextResponse.json(firstBatch);
  } catch (error: any) {
    console.error("Error getting products", error);

    return NextResponse.json(
      { error: "Error retrieving products", details: error.message },
      { status: 500 }
    );
  }
}