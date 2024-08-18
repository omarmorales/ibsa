// TODO: Create a responsive sidenav here in the dashboard so the user can move between pages
// TODO: User and Admin functionalities
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Package } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/connect";

const Page = async () => {
  const totalProducts = await prisma.product.count();
  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      <h1 className="text-2xl mb-2">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/dashboard/products"
          className="bg-white p-4 rounded-lg shadow-md block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View all products"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-5">
              <Package className="h-10 w-10 shrink-0" />
              <div>
                <h3 className="text-gray-500">Productos</h3>
                <div className="text-2xl font-bold">{totalProducts}</div>
              </div>
            </div>
          </div>
        </Link>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500">Avg. Click Rate</div>
              <div className="text-2xl font-bold">24.57%</div>
            </div>
            <div className="text-red-500 text-lg">-3.2%</div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
