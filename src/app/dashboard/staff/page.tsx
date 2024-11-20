import prisma from "@/lib/db";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createUser } from "@/actions/actions";

export default async function Staff() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
    },
    take: 10,
  });
  const roles = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const usersCount = await prisma.user.count();

  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      {/* Breadcrumb starts */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Personal</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Breadcrumb ends */}

      <p>Total de trabajadores: ({usersCount})</p>

      {/* Staff members list starts */}
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
                  {user.role.name.toLocaleUpperCase()}
                </span>
              </TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Staff members list ends */}

      {/* Form to add new staff member starts */}
      <form action={createUser} className="flex flex-col gap-y-2 w-[500px]">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="px-2 py-1 rounded-sm"
        />
        <select name="roleId" className="px-2 py-1 rounded-sm">
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name.toLocaleUpperCase()}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          Agregar empleado
        </button>
      </form>
      {/* Form ends */}
    </MaxWidthWrapper>
  );
}
