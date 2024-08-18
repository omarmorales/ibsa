// formSchema.ts

import { z } from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "El nombre debe contener al menos dos caracteres.",
  }),
  key: z.string().min(2, {
    message: "La clave debe contener al menos dos caracteres.",
  }),
  description: z.string(),
  iva: z
    .number()
    .min(0, {
      message: "El IVA no puede ser negativo.",
    })
    .max(100, {
      message: "El IVA no puede ser mayor al 100%.",
    }),
  ieps: z.number(),
  isr: z.number(),
  sku: z.string().min(2, {
    message: "El SKU debe contener al menos dos caracteres.",
  }),
  price: z.number(),
  //p1: z.number().optional(),
});
