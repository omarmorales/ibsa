import { ReactNode } from "react";
import Link from "next/link";
import { BarChart } from "lucide-react";

interface StatCardProps {
  href: string;
  title: string;
  count?: string | number;
  icon?: ReactNode;
}

const StatCard = ({ href, title, count, icon }: StatCardProps) => {
  return (
    <Link
      href={href}
      className="bg-white p-4 rounded-lg shadow-md block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Navigate to ${title}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          {/* Use provided icon or fallback to BarChart if no icon is provided */}
          {icon ?? <BarChart className="h-10 w-10 shrink-0 text-gray-600" />}
          <div>
            <h3 className="text-gray-500">{title}</h3>
            {count && (
              <div className="text-2xl font-bold">{count}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StatCard;