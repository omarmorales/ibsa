// formSchema.ts

import { z } from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "El nombre debe contener al menos dos caracteres.",
  }),
  key: z.string().toUpperCase().min(2, {
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

export const supplierFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "El nombre debe contener al menos dos caracteres.",
  }),
  rfc: z.string().min(2, {
    message: "El RFC debe contener al menos dos caracteres.",
  }),
  key: z.string().toUpperCase().min(2, {
    message: "La clave debe contener al menos dos caracteres.",
  }),
  phone: z.string().min(2, {
    message: "El teléfono debe contener al menos dos caracteres.",
  }),
  email: z.string().email({
    message: "El correo electrónico no es válido.",
  }),
  address: z.string().min(2, {
    message: "La dirección debe contener al menos dos caracteres.",
  }),
  description: z.string(),
});
