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
import { formatCurrency } from "@/lib/utils";

import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = memo(({ products, onEdit, onDelete }) => {
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Clave</TableHead>
        <TableHead>Nombre del producto</TableHead>
        <TableHead className="text-right">Precio</TableHead>
        <TableHead className="w-[50px]"></TableHead>
        <TableHead className="w-[50px]"></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell className="font-medium uppercase">{product.key}</TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell className="text-right">
            {formatCurrency(product.price)}
          </TableCell>
          <TableCell className="text-center">
            <Button variant="ghost" onClick={() => onEdit(product)}>
              <Pencil size={20} />
            </Button>
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
                    permanentemente este producto y eliminará sus datos de
                    nuestros servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (product.id) {
                        onDelete(product.id);
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
  )
});

ProductList.displayName = "ProductList";

export default ProductList;
