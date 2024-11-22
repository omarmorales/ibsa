"use client";

import { createOrUpdateUser } from "@/actions/actions";
import { Role } from "@/types/role";
import { User } from "@/types/user";
import { useRef } from "react";

interface StaffMemberFormProps {
  roles: Role[];
  user?: User;
}

export default function StaffMemberForm({ roles, user }: StaffMemberFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    await createOrUpdateUser(formData, user?.id);

    // Clear the form fields after successful action if no user (create mode)
    if (!user && formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <form
      action={(formData) => handleAction(formData)}
      className="flex flex-col gap-y-2 w-[500px]"
    >
      <input
        type="text"
        name="name"
        defaultValue={user?.name || ""}
        placeholder="Nombre"
        className="px-2 py-1 rounded-sm"
        required
      />
      <select
        name="roleId"
        defaultValue={user?.role?.id || ""}
        className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
        required
      >
        <option value="">Select a role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name.toLocaleUpperCase()}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-sm"
      >
        {user ? "Update User" : "Create User"}
      </button>
    </form>
  );
}
