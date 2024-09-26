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