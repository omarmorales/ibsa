import prisma from "@/lib/db";
import { User } from "lucide-react";
import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

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

export default async function StaffMember({ params }: { params: { slug: string } }) {
  const user = await getCachedUSer(params.slug);

  if (!user) {
    return notFound();
  }

  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      {/* Breadcrumb at the top left */}
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
            <BreadcrumbPage>{user?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Main Content */}
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-center">
            {/* Placeholder for Profile Picture */}
            <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-full mb-4">
              <User className="text-gray-500 w-16 h-16" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.name}
            </h2>
            <p className="text-gray-600">{user?.email}</p>

            {/* Badge for the user role */}
            <div className="inline-block mt-2">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {user?.role?.name.toLocaleUpperCase()}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/dashboard/staff/${user.slug}/edit`}
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300 text-center block"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
