"use client";
// FIXME: Move the products functionality to a separate file

import { useEffect, useState } from "react";
import axios from "axios";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { selectOptions } from "./selectOptions";
import { formSchema } from "./formSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

interface Product {
  key: string;
  name: string;
  price: number;
  // add other properties as needed
}

const Page = () => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const allProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/products");

      setProducts(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    allProducts();
  }, []);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("values", values);
      const res = await axios.post("/api/products", values);

      if (res.status === 200) {
        setProducts(prevProducts => [...prevProducts, res.data]);
        form.reset(); // reset the form
      }

      if (res.data.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      } else {
        toast({
          title: "Product created!",
          description: "Your product has been successfully created.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:grid lg:grid-cols-12 lg:gap-x-0 xl:gap-x-8 "
        >
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-12 mt-5 flex justify-end">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Form>

      // TODO: Add pagination to products list
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Clave</TableHead>
            <TableHead>Nombre del producto</TableHead>
            <TableHead className="text-right">Precio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            products.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{ product.key.toUpperCase() }</TableCell>
                <TableCell>{ product.name }</TableCell>
                <TableCell className="text-right">{product.price}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Toaster />
    </MaxWidthWrapper>
  );
};

export default Page;
