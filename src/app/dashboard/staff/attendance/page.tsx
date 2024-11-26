import prisma from "@/lib/db";
import AttendanceTable from "./table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Attendance() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Set to the start of the day
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Set to the end of the day
  const formattedDate = today.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      slug: true,
      Attendances: {
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      },
    },
  });

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8">
      {/* Breadcrumb starts */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/staff">Personal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Registro de asistencia</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Breadcrumb ends */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Registro de Asistencia
        </h1>
        <p className="text-gray-600 mb-8">{formattedDate}</p>

        {/* Table */}
        <AttendanceTable users={users} />
       
      </div>
    </div>
  );
}
