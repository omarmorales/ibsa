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

import StatCard from "@/components/StatCard";

const Page = async () => {
  const totalProducts = await prisma.product.count();
  const totalSuppliers = await prisma.supplier.count();
  const totalUsers = await prisma.user.count();

  const cards = [
    {
      href: "/dashboard/sales",
      title: "Ventas",
      icon: <Store className="h-10 w-10 shrink-0" />,
    },
    {
      href: "/dashboard/purchases",
      title: "Compras",
      icon: <ShoppingCart className="h-10 w-10 shrink-0" />,
    },
    {
      href: "/dashboard/products",
      title: "Productos",
      count: totalProducts,
      icon: <Package className="h-10 w-10 shrink-0" />,
    },
    {
      href: "/dashboard/suppliers",
      title: "Proveedores",
      count: totalSuppliers,
      icon: <Truck className="h-10 w-10 shrink-0" />,
    },
    {
      href: "/dashboard/customers",
      title: "Clientes",
      count: 12, // Placeholder count, replace as needed
      icon: <Contact className="h-10 w-10 shrink-0" />,
    },
    {
      href: "/dashboard/staff",
      title: "Personal",
      count: totalUsers,
      icon: <HardHat className="h-10 w-10 shrink-0" />,
    },
  ];

  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      <h1 className="flex items-center text-2xl mb-5">
        <LayoutDashboard className="h-10 w-10 shrink-0 pr-2" /> Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <StatCard
            key={index}
            href={card.href}
            title={card.title}
            count={card.count}
            icon={card.icon}
          />
        ))}

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
