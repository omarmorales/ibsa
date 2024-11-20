"use server"
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  try {
    await prisma.user.create({
      data: {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string).replace(/\s/g, "-").toLowerCase(),
        role: {
          connect: {
            id: formData.get("roleId") as string
          }
        }
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("Ya existe un usuario con ese nombre");
      }
    }
  }
  
  revalidatePath("/dashboard/staff");
}

export async function editUser(formData: FormData, id: string) {
  await prisma.user.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/\s/g, "-"),
      role: formData.get("role") as string,
    }
  });
}

export async function deleteStaffMember(id: string) {
  await prisma.user.delete({
    where: { id }
  });
}