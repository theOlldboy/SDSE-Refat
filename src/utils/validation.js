import * as yup from 'yup';

export const userSchema = yup.object().shape({ 
    cnpj: yup.string().required("Campo Obrigatório!"),
    email: yup.string().email("Email inválido!").required("Campo Obrigatório!"),
    senha: yup.string().min(6, "A senha deve ter entre 6-10 caracteres!").max(10, "A senha deve ter entre 6-10 caracteres!").required("Campo Obrigatório!")
})