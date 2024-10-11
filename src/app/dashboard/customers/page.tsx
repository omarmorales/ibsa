import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";

const Customers: React.FC = () => {
    return (
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
            {/* Breadcrumb starts */}
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Clientes</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Breadcrumb ends */}
        </MaxWidthWrapper>
    );
}

export default Customers;