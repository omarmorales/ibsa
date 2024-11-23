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

import UserTable from "./table";

export default async function Staff() {
  
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      slug: true,
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
      <UserTable users={users} roles={roles} />
      {/* Staff members list ends */}
    </MaxWidthWrapper>
  );
}
