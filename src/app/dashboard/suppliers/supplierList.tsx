import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Supplier } from "@/types/supplier";

interface SupplierListProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

const SupplierList: React.FC<SupplierListProps> = memo(
  ({ suppliers, onEdit, onDelete }) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Clave</TableHead>
            <TableHead>Nombre del proveedor</TableHead>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium uppercase">
                {supplier.key}
              </TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" onClick={() => onEdit(supplier)}>
                  <Pencil size={20} />
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {/* Using a span or div to avoid nesting buttons */}
                    <span className="flex items-center justify-center cursor-pointer">
                      <Button variant="ghost">
                        <Trash size={20} />
                      </Button>
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Eliminar proveedor</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      ¿Estás seguro de que deseas eliminar a {supplier.name}?
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (supplier.id) {
                            onDelete(supplier.id);
                          }
                        }}
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

SupplierList.displayName = "SupplierList";

export default SupplierList;