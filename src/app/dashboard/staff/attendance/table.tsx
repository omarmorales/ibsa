"use client";
import { User } from "@/types/user";
import { CircleCheck, XCircle, User as UserIcon } from "lucide-react";
import {
  registerUserAttendance,
  deleteAttendanceRecord,
} from "@/actions/actions";

interface AttendanceTableProps {
  users: User[];
}

export default function AttendanceTable({ users }: AttendanceTableProps) {
  // Handles toggling attendance (add or remove)
  const toggleAttendance =
    (userId: string, attendanceId?: string) => async () => {
      if (attendanceId) {
        await deleteAttendanceRecord(attendanceId);
      } else {
        await registerUserAttendance(userId);
      }
    };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-sm text-sm">
        {/* Table Header */}
        <thead>
          <tr className="bg-blue-50 text-gray-700">
            <th className="w-12 px-4 py-4 border-b"></th>
            <th className="px-6 py-4 font-semibold text-center border-b">
              Nombre
            </th>
            <th className="px-6 py-4 font-semibold text-center border-b">
              Asistencia
            </th>
            <th className="px-6 py-4 font-semibold text-center border-b">
              Hora de Comida
            </th>
            <th className="px-6 py-4 font-semibold text-center border-b">
              Hora de Salida
            </th>
            <th className="px-6 py-4 font-semibold text-center border-b">
              Comentarios
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user, index) => {
            const attendances = user.Attendances ?? [];
            const hasAttendance = attendances.length > 0;
            const attendanceId = hasAttendance ? attendances[0].id : null;

            return (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-100 transition`}
              >
                {/* User Icon */}
                <td className="w-12 px-4 py-4 border-b text-center">
                  <UserIcon className="w-6 h-6 text-gray-600" />
                </td>

                {/* User Name */}
                <td className="px-6 py-4 text-gray-800 border-b text-center">
                  {user.name}
                </td>

                {/* Attendance Toggle */}
                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={
                      user.id
                        ? toggleAttendance(user.id, attendanceId ?? undefined)
                        : undefined
                    }
                    className={`p-2 rounded-full ${
                      hasAttendance
                        ? "text-green-600 hover:text-green-800 bg-green-50"
                        : "text-gray-400 hover:text-gray-600 bg-gray-50"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      hasAttendance
                        ? "focus:ring-green-500"
                        : "focus:ring-gray-500"
                    }`}
                    aria-label={
                      hasAttendance
                        ? `Remove ${user.name}'s attendance record`
                        : `Mark ${user.name}'s attendance`
                    }
                  >
                    {hasAttendance ? (
                      <CircleCheck className="w-6 h-6" aria-hidden="true" />
                    ) : (
                      <XCircle className="w-6 h-6" aria-hidden="true" />
                    )}
                  </button>
                </td>

                {/* Meal Time */}
                <td className="px-6 py-4 border-b text-center">
                  <input
                    type="time"
                    defaultValue="12:00"
                    className="block w-24 px-2 py-1 mx-auto text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>

                {/* Exit Time */}
                <td className="px-6 py-4 border-b text-center">
                  <input
                    type="time"
                    defaultValue="16:00"
                    className="block w-24 px-2 py-1 mx-auto text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>

                {/* Comments */}
                <td className="px-6 py-4 border-b text-center text-gray-600">
                  Comentarios...
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}