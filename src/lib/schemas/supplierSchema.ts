import * as yup from "yup";

export const supplierSchema = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().required(),
  rfc: yup.string().required(),
  key: yup.string().required().matches(/^\S*$/, 'Key should not contain spaces'),
  email: yup.string().email(),
  phone: yup.string(),
  address: yup.string(),
  description: yup.string(),
});
