import * as yup from "yup";

export const productSchema = yup.object().shape({
    name: yup.string().required(),
    key: yup.string().required().matches(/^\S*$/, 'Key should not contain spaces'),
    description: yup.string(),
    iva: yup.number(),
    ieps: yup.number(),
    isr: yup.number(),
    sku: yup.string().required(),
    price: yup.number().required(),
    p1: yup.number(),
    p2: yup.number(),
    p3: yup.number(),
    p4: yup.number(),
    p5: yup.number(),
    c1: yup.number(),
    c2: yup.number(),
    c3: yup.number(),
    c4: yup.number(),
    lineId: yup.string(),
    unitId: yup.string(),
});