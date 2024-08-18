// TODO: Add authorization functionality
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { productSchema } from "@/lib/schemas/productSchema";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    console.log("PUT product", body);

    // Validate the request body
    await productSchema.validate(body);

    const product = await prisma.product.update({
      where: { id },
      data: body
    });
    console.log("PUT product", product);
    return NextResponse.json(product);
  }
  catch (error) {
    console.error("Error updating product", error);
    return NextResponse.json({ error: "error updating product", status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const product = await prisma.product.delete({
      where: { id },
    });
    console.log("DELETE product", product);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error deleting product", error);
    return NextResponse.json({ error: "error deleting product", status: 500 });
  }
}
