"use client";
import { useRef } from "react";
import { createUser } from "@/actions/actions";
import { Role } from "@/types/role";

interface StaffMemberFormProps {
  roles: Role[];
}

export default async function StaffMemberForm({ roles }: StaffMemberFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <>
      {/* Form to add new staff member starts */}
      <form
        ref={ref}
        action={async (formData) => {
          await createUser(formData);
          ref.current?.reset();
        }}
        //action={createUser}
        className="flex flex-col gap-y-2 w-[500px]"
      >
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
    </>
  );
}
