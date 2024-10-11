// TODO: Create a responsive sidenav here in the dashboard so the user can move between pages
// TODO: User and Admin functionalities
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Package,
  Truck,
  Contact,
  ShoppingCart,
  Store,
  HardHat,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/connect";

const Page = async () => {
  const totalProducts = await prisma.product.count();
  const totalSuppliers = await prisma.supplier.count();
  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      <h1 className="flex items-center text-2xl mb-5">
        <LayoutDashboard className="h-10 w-10 shrink-0 pr-2" /> Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/dashboard/sales"
          className="bg-white p-4 rounded-lg shadow-md block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Start selling"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-5">
              <Store className="h-10 w-10 shrink-0" />
              <div>
                <h3 className="text-gray-500">Ventas</h3>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/purchases"
          className="bg-white p-4 rounded-lg shadow-md block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View purchases"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-5">
              <ShoppingCart className="h-10 w-10 shrink-0" />
              <div>
                <h3 className="text-gray-500">Compras</h3>
              </div>
            </div>
          </div>
        </Link>

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

        <Link
          href="/dashboard/suppliers"
          className="bg-white p-4 rounded-lg shadow-md block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View all suppliers"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-5">
              <Truck className="h-10 w-10 shrink-0" />
              <div>
                <h3 className="text-gray-500">Proveedores</h3>
                <div className="text-2xl font-bold">{totalSuppliers}</div>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/customers"
          className="bg-white p-4 rounded-lg shadow-md block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View all customers"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-5">
              <Contact className="h-10 w-10 shrink-0" />
              <div>
                <h3 className="text-gray-500">Clientes</h3>
                <div className="text-2xl font-bold">12</div>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/staff"
          className="bg-white p-4 rounded-lg shadow-md block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View all staff"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-5">
              <HardHat className="h-10 w-10 shrink-0" />
              <div>
                <h3 className="text-gray-500">Personal</h3>
                <div className="text-2xl font-bold">12</div>
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
