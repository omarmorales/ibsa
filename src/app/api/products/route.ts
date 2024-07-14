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

// TODO: Add Atlas search functionality
// TODO: Add pagination functionality
export async function GET(req: Request) {
    try {
        const products = await prisma.product.findMany();
        console.log("GET products", products);
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error getting products", error);
        return NextResponse.json({ error: "error getting products", status: 500 });
    }
}

// export async function PUT(req: Request) {
//     try {
//         const { id } = req.params;
//         const body = await req.json();
//         const product = await prisma.product.update({
//             where: { id: Number(id) },
//             data: body,
//         });
//         console.log("PUT product", product);
//         return NextResponse.json(product);
//     } catch (error) {
//         console.error("Error updating product", error);
//         return NextResponse.json({ error: "error updating product", status: 500 });
//     }
// }

// export async function DELETE(req: Request) {
//     try {
//         const { id } = req.params;
//         const product = await prisma.product.delete({
//             where: { id: Number(id) },
//         });
//         console.log("DELETE product", product);
//         return NextResponse.json(product);
//     } catch (error) {
//         console.error("Error deleting product", error);
//         return NextResponse.json({ error: "error deleting product", status: 500 });
//     }
// }