// TODO: Edit products
// TODO: Search filter by key and name
// TODO: Toaster componnet should be available across the app
// TODO: Only authenticated users should be able to access this page
"use client";

import { useEffect, useState, useCallback } from "react";
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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Half2Icon } from "@radix-ui/react-icons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "../formSchema";

import { selectOptions } from "../selectOptions";

import { useToast } from "@/components/ui/use-toast";

import { Toaster } from "@/components/ui/toaster";

import { Trash, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  key: string;
  price: number;
}

const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const limit = 10;
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

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

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);

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
            title: "Product created!",
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

  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      <h1 className="text-2xl mb-2">Productos</h1>
      {/* Drawer starts */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="fixed right-4 bottom-4 md:right-6 md:bottom-6 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center">
            <Plus />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Nuevo producto</DrawerTitle>
            <DrawerDescription>
              Agrega la siguiente informacion de tu producto
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 xl:gap-x-8 p-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormLabel>Nombre del producto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Clave del producto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Descripción del producto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iva"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>IVA</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectOptions.iva.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ieps"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>IEPS</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectOptions.ieps.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isr"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>ISR</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectOptions.isr.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Precio de compra</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DrawerFooter>
                <Button type="submit">Crear</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
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
          {/* Products data starts */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Clave</TableHead>
                <TableHead>Nombre del producto</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium uppercase">
                    {product.key}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(product.price)}
                  </TableCell>
                  <TableCell className="text-center">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash size={20} />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            ¿Estás absolutamente seguro?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará
                            permanentemente este producto y eliminará sus datos
                            de nuestros servidores.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProduct(product.id)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Products data ends */}

          {/* Pagination starts */}
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
          {/* Pagination ends */}
        </>
      )}
      <Toaster />
    </MaxWidthWrapper>
  );
};

export default Products;
