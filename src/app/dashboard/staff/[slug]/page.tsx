import prisma from "@/lib/db";
import { User } from "lucide-react";
import { unstable_cache as cache } from "next/cache";

const getCachedUSer = cache((slug) => {
  return prisma.user.findUnique({
    where: {
      slug,
    },
    include: {
      role: true,
    },
  })
})

export default async function StaffMember({ params }) {
  const user = await getCachedUSer(params.slug);

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
          <p className="text-gray-600">{user?.email}</p>

          {/* Badge for the user role */}
          <div className="inline-block mt-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {user?.role?.name.toLocaleUpperCase()}
            </span>
          </div>
        </div>

        {/* <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Bio</h3>
          <p className="text-gray-600">{user.bio}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          <p className="text-gray-600">{user.location}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Joined</h3>
          <p className="text-gray-600">{user.joinedAt}</p>
        </div> */}

        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
