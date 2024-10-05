// TODO: Add authorization functionality
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { productSchema } from "@/lib/schemas/productSchema";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    console.log("POST body", body);

    // Validate the request body
    await productSchema.validate(body);

    const product = await prisma.product.create({
      data: body,
    });
    console.log("POST product", product);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product", error);
    return NextResponse.json({ error, status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { url } = req;
    const urlParams = new URLSearchParams(url?.split("?")[1] || "");

    // Default limit to 10, page to 1 and ensure they are positive integers
    const limit = Math.max(parseInt(urlParams.get("limit") || "10", 10), 1);
    const page = Math.max(parseInt(urlParams.get("page") || "1", 10), 1);
    const skip = (page - 1) * limit;
    const include = urlParams.get("include");

    // Fetch products and total_count in parallel
    const [products, total_count] = await Promise.all([
      prisma.product.findMany({
        take: limit,
        skip,
      }),
      prisma.product.count(),
    ]);

    const page_count = Math.ceil(total_count / limit);
    const baseUrl = url?.split("?")[0] || "";

    // Generate pagination links
    const metadata = {
      page,
      per_page: limit,
      page_count,
      total_count,
      links: {
        self: `${baseUrl}?limit=${limit}&page=${page}`,
        first: `${baseUrl}?limit=${limit}&page=1`,
        previous:
          page > 1 ? `${baseUrl}?limit=${limit}&page=${page - 1}` : null,
        next:
          page < page_count
            ? `${baseUrl}?limit=${limit}&page=${page + 1}`
            : null,
        last: `${baseUrl}?limit=${limit}&page=${page_count}`,
      },
    };

    // Return response with metadata if requested
    return NextResponse.json(
      include === "metadata" ? { products, metadata } : { products }
    );
  } catch (error) {
    console.error("Error getting products", error);
    return NextResponse.json({ error: "error getting products", status: 500 });
  }
}
