"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import StaffMemberForm from "./form";
import { Role } from "@/types/role";
import { User } from "@/types/user";
import { deleteUser } from "@/actions/actions";

interface TableProps {
  users: User[];
  roles: Role[];
}

export default function UserTable({ users, roles }: TableProps) {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };
  const handleUserUpdate = () => {
    setSelectedUser(undefined);
  };
  const handleDelete = async (user: User) => {
    try {
      if (!user.id) {
        console.error("User ID is undefined");
        alert("Failed to delete user. Invalid user ID.");
        return;
      }
      const result = await deleteUser(user.id);
      if (result.success) {
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <>
      <Table aria-label="Staff management table">
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Nombre</TableHead>
            <TableHead scope="col">Rol</TableHead>
            <TableHead scope="col">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link
                  href={`/dashboard/staff/${user.slug}`}
                  className="font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label={`View details for ${user.name}`}
                >
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full"
                  aria-label={`Role: ${user.role?.name}`}
                >
                  {user.role?.name.toLocaleUpperCase()}
                </span>
              </TableCell>
              <TableCell>
                <button
                  className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                  onClick={() => handleEdit(user)}
                  aria-label={`Edit user ${user.name}`}
                >
                  Editar
                </button>
              </TableCell>
              <TableCell>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  onClick={() => handleDelete(user)}
                  aria-label={`Delete user ${user.name}`}
                >
                  Eliminar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Form to add new staff member starts */}
      <StaffMemberForm
        roles={roles}
        user={selectedUser}
        onUserUpdate={handleUserUpdate}
      />
      {/* Form ends */}
    </>
  );
}
