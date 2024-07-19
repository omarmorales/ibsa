"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useRouter } from "next/router";
import { Half2Icon } from "@radix-ui/react-icons";

interface Product {
  id: number;
  name: string;
  key: string;
  price: number;
}

const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const limit = 5;

  const allProducts = async () => {
    setIsLoading(true);
    try {
      // http://localhost:3000/api/products?limit=2&page=1&include=metadata
      const res = await axios.get(
        `/api/products?limit=${limit}&page=1&include=metadata`
      );
      setProducts(res.data.products);
      setMetadata(res.data.metadata);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    allProducts();
  }, []);

  const handlePreviousClick = async () => {
    if (metadata.page > 1) {
      const res = await axios.get(
        `/api/products?limit=${limit}&page=${
          metadata.page - 1
        }&include=metadata`
      );
      setProducts(res.data.products);
      setMetadata(res.data.metadata);
    }
  };

  const handleNextClick = async () => {
    if (metadata.page < metadata.page_count) {
      const res = await axios.get(
        `/api/products?limit=${limit}&page=${
          metadata.page + 1
        }&include=metadata`
      );
      setProducts(res.data.products);
      setMetadata(res.data.metadata);
    }
  };

  const handlePageClick = async (page: number) => {
    const res = await axios.get(
      `/api/products?limit=${limit}&page=${page}&include=metadata`
    );
    setProducts(res.data.products);
    setMetadata(res.data.metadata);
  };

  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      <h1>Products</h1>

      {isLoading ? (
        [...Array(10)].map((_, i) => (
          <div key={i} className="flex space-x-4 p-1.5">
            <Skeleton className="h-6 w-1/6" />
            <Skeleton className="h-6 w-4/6" />
            <Skeleton className="h-6 w-1/6" />
          </div>
        ))
      ) : (
        <>
          {/* TODO: Add pagination to products list */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Clave</TableHead>
                <TableHead>Nombre del producto</TableHead>
                <TableHead className="text-right">Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.key}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {metadata && (
            <Pagination className="pt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={handlePreviousClick} />
                </PaginationItem>

                {[...Array(metadata.page_count)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={metadata.page === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext href="#" onClick={handleNextClick} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Products;
