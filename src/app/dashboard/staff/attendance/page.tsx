import prisma from "@/lib/db";

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
          arrival: {
            gte: startOfDay,
            lte: endOfDay,
          },
        }
      },
    },
    take: 10,
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Registro de Asistencia
        </h1>
        {/* Subtitle */}
        <p className="text-gray-600 mb-6">{formattedDate}</p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 border-b">
                  Nombre
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 border-b">
                  Hora de Entrada
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 border-b">
                  Hora de Comida
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 border-b">
                  Hora de Salida
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-gray-800 border-b">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-800 border-b">
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="block w-full px-2 py-1 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800 border-b">
                    <input
                      type="time"
                      defaultValue="12:00"
                      className="block w-full px-2 py-1 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800 border-b">
                    <input
                      type="time"
                      defaultValue="16:00"
                      className="block w-full px-2 py-1 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
