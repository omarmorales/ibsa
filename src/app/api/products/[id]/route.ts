import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
// export const GET = async (req: Request) => {
//     console.log("GET product by id");
// };

// export const PUT = async (req: Request) => {
//     console.log("PUT product by id");
// }

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
