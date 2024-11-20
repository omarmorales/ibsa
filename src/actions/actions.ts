"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
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