import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { supplierSchema } from "@/lib/schemas/supplierSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST body", body);

    // Validate the request body
    await supplierSchema.validate(body);

    const supplier = await prisma.supplier.create({
      data: body,
    });
    console.log("POST supplier", supplier);
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error creating supplier", error);
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

    // Fetch suppliers and total_count in parallel
    const [suppliers, total_count] = await Promise.all([
      prisma.supplier.findMany({
        take: limit,
        skip,
      }),
      prisma.supplier.count(),
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

    return NextResponse.json(
      include === "metadata" ? { suppliers, metadata } : { suppliers }
    );
  } catch (error) {
    console.error("Error fetching suppliers", error);
    return NextResponse.json({ error: "error getting suppliers", status: 500 });
  }
}
