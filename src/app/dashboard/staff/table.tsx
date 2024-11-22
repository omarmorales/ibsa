"use client"
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StaffMemberForm from "./form";
import { Role } from "@/types/role";
import { User } from "@/types/user";

interface TableProps {
  users: User[];
  roles: Role[];
}

export default function UserTable({ users, roles }: TableProps) {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };
  const handleUserReset = () => {
    setSelectedUser(undefined);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {user.role?.name.toLocaleUpperCase()}
                </span>
              </TableCell>
              <TableCell>
                <button
                  className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Form to add new staff member starts */}
      <StaffMemberForm roles={roles} user={selectedUser} onUserReset={handleUserReset} />
      {/* Form ends */}
    </>
  );
}