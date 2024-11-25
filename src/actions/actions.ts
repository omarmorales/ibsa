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

export async function deleteUser(id: string) {
  if (!id || typeof id !== "string") {
    return { success: false, message: "Invalid user ID" };
  }

  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    console.log(`User with ID ${id} successfully deleted`);
    revalidatePath("/dashboard/staff");
    return { success: true, message: `User ${user.name} successfully deleted` };
  } catch (error) {
    console.error(`Failed to delete user with ID ${id}:`, error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // Record not found
        return { success: false, message: "User not found" };
      }
    }

    revalidatePath("/dashboard/staff");
    return { success: false, message: "An unexpected error occurred" };
  }
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

export async function registerUserAttendance(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        Attendances: {
          create: {
            date: new Date(),
          },
        }
      }
    });
    revalidatePath("/dashboard/staff/attendance");
  } catch (error) {
    console.error("Failed to create attendance record:", error);
  }
}

export async function deleteAttendanceRecord(attendanceId: string) {
  try {
    await prisma.attendance.delete({
      where: { id: attendanceId },
    });
    revalidatePath("/dashboard/staff/attendance");
  } catch (error) {
    console.error("Failed to delete attendance record:", error);
  }
}
