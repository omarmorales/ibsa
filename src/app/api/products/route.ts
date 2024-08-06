// TODO: Add authorization functionality
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { productSchema } from "@/lib/schemas/productSchema";


export async function POST(req: Request) {
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
        const urlParams = new URLSearchParams(req.url?.split('?')[1] || '');
        const limit = parseInt(urlParams.get('limit') || '10', 10);
        const page = Math.max(parseInt(urlParams.get('page') || '1', 10), 1);
        const skip = (page - 1) * limit;
        const include = urlParams.get('include');

        const products = await prisma.product.findMany({
            take: limit,
            skip,
        });
        const total_count = await prisma.product.count();
        const page_count = Math.ceil(total_count / limit);

        const baseUrl = req.url?.split('?')[0] || '';
        const self = `${baseUrl}?limit=${limit}&page=${page}`;
        const first = `${baseUrl}?limit=${limit}&page=1`;
        const previous = page > 1 ? `${baseUrl}?limit=${limit}&page=${page - 1}` : null;
        const next = page < page_count ? `${baseUrl}?limit=${limit}&page=${page + 1}` : null;
        const last = `${baseUrl}?limit=${limit}&page=${page_count}`;

        const metadata = {
            page,
            per_page: limit,
            page_count,
            total_count,
            links: { self, first, previous, next, last },
        };
        return NextResponse.json(include === 'metadata' ? {products, metadata} : {products});
    } catch (error) {
        console.error("Error getting products", error);
        return NextResponse.json({ error: "error getting products", status: 500 });
    }
}