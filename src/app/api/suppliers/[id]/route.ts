import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supplier = await prisma.supplier.delete({
      where: { id },
    });
    console.log("DELETE supplier", supplier);
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error deleting supplier", error);
    return NextResponse.json({ error: "error deleting supplier", status: 500 });
  }
}