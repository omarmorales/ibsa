import { memo, useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (products.length === 0) return;

    // Check if Shift key is pressed along with ArrowDown or ArrowUp
    if (event.shiftKey) {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prev) => (prev === null || prev === products.length - 1 ? 0 : prev + 1));
        event.preventDefault(); // Prevent default browser behavior
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prev) => (prev === null || prev === 0 ? products.length - 1 : prev - 1));
        event.preventDefault(); // Prevent default browser behavior
      } else if (event.key === "Enter" && highlightedIndex !== null) {
        onEdit(products[highlightedIndex]);
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedIndex, products, onEdit]);

  return (
    <Table
      ref={tableRef}
      tabIndex={0} // Make the table focusable
      className="outline-none" // Remove any outline for focus
    >
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
        {products.map((product, index) => (
          <TableRow
            key={product.id}
            className={`${highlightedIndex === index ? "bg-gray-200" : ""}`}
          >
            <TableCell className="font-medium uppercase">{product.key}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
            <TableCell className="text-center">
              <Button variant="ghost" onClick={() => onEdit(product)}>
                <Pencil size={20} />
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button variant="ghost" onClick={() => product.id && onDelete(product.id)}>
                <Trash size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

ProductList.displayName = "ProductList";

export default ProductList;