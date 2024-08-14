// TODO: Edit products
// TODO: Search filter by key and name
// TODO: Toaster componnet should be available across the app
// TODO: Only authenticated users should be able to access this page
"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../formSchema";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Plus } from "lucide-react";
import ProductList from "./productList";
import ProductPagination from "./productPagination";
import { Product } from "@/types/product";
import { ProductForm } from "./productForm";

const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const limit = 10;
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/api/products?limit=${limit}&page=1&include=metadata`
      );
      setProducts(res.data.products);
      setMetadata(res.data.metadata);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    allProducts();
  }, [allProducts]);

  const handlePreviousClick = useCallback(async () => {
    if (metadata.page > 1) {
      try {
        const res = await axios.get(
          `/api/products?limit=${limit}&page=${
            metadata.page - 1
          }&include=metadata`
        );
        setProducts(res.data.products);
        setMetadata(res.data.metadata);
      } catch (error) {
        console.error("Failed to fetch previous page", error);
      }
    }
  }, [metadata, limit]);

  const handleNextClick = useCallback(async () => {
    if (metadata.page < metadata.page_count) {
      try {
        const res = await axios.get(
          `/api/products?limit=${limit}&page=${
            metadata.page + 1
          }&include=metadata`
        );
        setProducts(res.data.products);
        setMetadata(res.data.metadata);
      } catch (error) {
        console.error("Failed to fetch next page", error);
      }
    }
  }, [metadata, limit]);

  const handlePageClick = useCallback(
    async (page: number) => {
      try {
        const res = await axios.get(
          `/api/products?limit=${limit}&page=${page}&include=metadata`
        );
        setProducts(res.data.products);
        setMetadata(res.data.metadata);
      } catch (error) {
        console.error(`Failed to fetch page ${page}`, error);
      }
    },
    [limit]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      key: "",
      description: "",
      iva: 0,
      ieps: 0,
      isr: 0,
      sku: "",
      price: 0,
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        const res = await axios.post("/api/products", values);

        if (res.status === 200) {
          setProducts((prevProducts) => [...prevProducts, res.data]);
          form.reset(); // reset the form
          setOpen(false); // close the drawer
          toast({
            title: "¡Producto creado!",
            description: "El producto ha sido creado exitosamente.",
          });
        } else if (res.data.error) {
          toast({
            variant: "destructive",
            title: "¡Oh! Algo salió mal.",
            description: "Hubo un problema al crear el producto.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "¡Oh! Algo salió mal.",
        });
        console.error("Failed to create product", error);
      }
    },
    [toast, form]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        const res = await axios.delete(`/api/products/${id}`);
        if (res.status === 200) {
          toast({
            title: "Producto eliminado",
            description: "El producto ha sido eliminado exitosamente",
          });
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "¡Oh! Algo salió mal.",
          description: "Hubo un problema al eliminar el producto.",
        });
        console.error("Failed to delete product", error);
      }
    },
    [toast]
  );

  const editProduct = (product: any) => {
    setOpen(true);
    setSelectedProduct(product);
    console.log("Edit product", selectedProduct);
  };

  const createProduct = () => {
    setOpen(true);
    let defaultValues = {
      name: "",
      key: "",
      description: "",
      iva: 0,
      ieps: 0,
      isr: 0,
      sku: "",
      price: 0,
    };
    setSelectedProduct(defaultValues);
    console.log("Create product", selectedProduct);
  };

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
            <BreadcrumbPage>Productos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Breadcrumb ends */}

      {/* Drawer starts */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {selectedProduct && selectedProduct.id ? "Editar producto" : "Nuevo producto"}
            </DrawerTitle>
            <DrawerDescription>
              Agrega la siguiente informacion de tu producto
            </DrawerDescription>
          </DrawerHeader>

          <ProductForm initialValues={selectedProduct} onSubmit={onSubmit} />
        </DrawerContent>
      </Drawer>
      {/* Drawer ends  */}

      {isLoading ? (
        // Skeleton starts
        [...Array(10)].map((_, i) => (
          <div key={i} className="flex space-x-4 p-1.5">
            <Skeleton className="h-6 w-1/6" />
            <Skeleton className="h-6 w-4/6" />
            <Skeleton className="h-6 w-1/6" />
          </div>
        ))
      ) : (
        // Skeleton ends
        <>
          {/* Search bar starts */}
          <div className="flex w-full max-w-sm items-center space-x-2 mb-5">
            <Input type="text" placeholder="Buscar producto" />
            {/* <Button type="submit">Buscar</Button> */}
          </div>
          {/* Search bar ends */}

          {/* Add product button starts */}
          <Button
            onClick={() => createProduct()}
            className="fixed right-4 bottom-4 md:right-6 md:bottom-6 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
          >
            <Plus />
          </Button>
          {/* Add product button ends */}

          {/* Products List */}
          <ProductList
            products={products}
            onEdit={editProduct}
            onDelete={deleteProduct}
          />
          {/* End Products List */}

          {/* Pagination starts */}
          {metadata && (
            <ProductPagination
              page_count={metadata.page_count}
              page={metadata.page}
              onPreviousClick={handlePreviousClick}
              onPageClick={handlePageClick}
              onNextClick={handleNextClick}
            />
          )}
          {/* Pagination ends */}
        </>
      )}
      <Toaster />
    </MaxWidthWrapper>
  );
};

export default Products;