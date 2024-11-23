"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  try {
    await prisma.user.create({
      data: {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string)
          .replace(/\s/g, "-")
          .toLowerCase(),
        role: {
          connect: {
            id: formData.get("roleId") as string,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("Ya existe un usuario con ese nombre");
      }
    }
  }

  revalidatePath("/dashboard/staff");
}

export async function updateUser(formData: FormData, id: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string)
          .replace(/\s/g, "-")
          .toLowerCase(),
        role: {
          connect: {
            id: formData.get("roleId") as string,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("Ya existe un usuario con ese nombre");
      }
    }
  }
}

export async function deleteStaffMember(id: string) {
  await prisma.user.delete({
    where: { id },
  });
}

export async function createOrUpdateUser(formData: FormData, userId?: string) {
  const name = formData.get("name") as string;
  const roleId = formData.get("roleId") as string;
  let user;

  if (!name || !roleId) {
    throw new Error("Both name and role are required.");
  }

  const slug = name.replace(/\s/g, "-").toLowerCase();

  try {
    if (userId) {
      // Update user if userId is provided
      user = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          slug,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
      });
    } else {
      // Create a new user if no userId is provided
      user = await prisma.user.create({
        data: {
          name,
          slug,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
      });
    }
    // Revalidate the path to reflect the changes
    revalidatePath("/dashboard/staff");
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("A user with this name already exists.");
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}
