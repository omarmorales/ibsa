import prisma from "@/lib/db";
import { User } from "lucide-react";
import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import StaffMemberForm from "@/app/dashboard/staff/form";

const getCachedUSer = cache((slug) => {
  return prisma.user.findUnique({
    where: {
      slug,
    },
    include: {
      role: true,
    },
  });
});

interface Params {
  slug: string;
}

export default async function UpdateStaffMember({ params }: { params: { slug: string } }) {
  const user = await getCachedUSer(params.slug);

  const roles = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-center">
          {/* <img
              src={staffMember?.profilePicture}
              alt={`${staffMember?.name}'s profile`}
              className="rounded-full w-32 h-32 object-cover mb-4"
            /> */}

          <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-full mb-4">
            <User className="text-gray-500 w-16 h-16" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>

          {/* Badge for the user role */}
          <div className="inline-block mt-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {user?.role?.name.toLocaleUpperCase()}
            </span>
          </div>

          <StaffMemberForm user={user} roles={roles} redirectToProfile={true} />
        </div>
      </div>
    </div>
  );
}
