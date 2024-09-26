"use client";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SupplierForm } from "./supplierForm";
import { supplierFormSchema } from "../formSchema";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Supplier } from "@/types/supplier";

const Suppliers: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const { toast } = useToast();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "n" || event.key === "N")
    ) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const createSupplier = () => {
    setOpen(true);
    let defaultValues = {
      name: "",
      rfc: "",
      key: "",
      phone: "",
      email: "",
      address: "",
      description: "",
    };
    setSelectedSupplier(defaultValues);
  };

  const form = useForm<z.infer<typeof supplierFormSchema>>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      rfc: "",
      key: "",
      phone: "",
      email: "",
      address: "",
      description: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof supplierFormSchema>) => {
      const isEdit = Boolean(values?.id);
      const apiUrl = isEdit ? `/api/suppliers/${values.id}` : "/api/suppliers";
      const apiMethod = isEdit ? axios.put : axios.post;
      const successMessage = isEdit
        ? "¡Proveedor actualizado!"
        : "¡Proveedor creado!";
      const errorMessage = isEdit
        ? "Hubo un problema al actualizar el proveedor."
        : "Hubo un problema al crear el proveedor.";

      const valuesToSend = { ...values };
      if (valuesToSend.id) {
        delete valuesToSend.id;
      }

      try {
        const res = await apiMethod(apiUrl, valuesToSend);

        if (res.status === 200 && !res.data.status) {
          setSuppliers((prevSuppliers) =>
            isEdit
              ? prevSuppliers.map((supplier) =>
                  supplier.id === values.id ? res.data : supplier
                )
              : [...prevSuppliers, res.data]
          );
          form.reset();
          setOpen(false);
          toast({
            title: successMessage,
            description: `El proveedor ha sido ${
              isEdit ? "actualizado" : "creado"
            } exitosamente.`,
          });
        } else if (res.data.error) {
          toast({
            variant: "destructive",
            title: "¡Oh! Algo salió mal.",
            description: errorMessage,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "¡Oh! Algo salió mal.",
        });
        console.error(
          `Failed to ${isEdit ? "update" : "create"} product`,
          error
        );
      }
    },
    [toast, form]
  );

  return (
    <div>
      <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
        {/* Breadcrumb starts */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Proveedores</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Breadcrumb ends */}

        {/* Add product button starts */}
        <Button
          onClick={() => createSupplier()}
          className="fixed right-4 bottom-4 md:right-6 md:bottom-6 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
        >
          <Plus />
        </Button>
        {/* Add product button ends */}

        {/* Dialog starts */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px] md:min-w-[900px]">
            <DialogHeader>
              <DialogTitle>
                {selectedSupplier && selectedSupplier.id
                  ? "Editar producto"
                  : "Nuevo producto"}
              </DialogTitle>
              <DialogDescription>
                Agrega la información de tu nuevo proveedor.
              </DialogDescription>
            </DialogHeader>

            <SupplierForm
              initialValues={selectedSupplier}
              onSubmit={onSubmit}
            />
          </DialogContent>
        </Dialog>
        {/* Dialog ends */}
      </MaxWidthWrapper>
    </div>
  );
};

export default Suppliers;
