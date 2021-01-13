import React from 'react';
import '../styles.css';
import { useFormik } from 'formik';
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Alert} from 'reactstrap';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask } from "../utils/Masks";

const LoginForm = () => {
     const formik = useFormik({
        initialValues: {
            cnpj: '',
            senha: '',
        },
        validationSchema: Yup.object({
            cnpj: Yup.string().required('Campo Obrigatório!'),
            senha: Yup.string().required('Campo Obrigatório!').min(6, 'A senha deve ter obrigatoriamente 6-8 caracteres!').max(8, 'Senha deve ter obrigatoriamente 6-8 caracteres!'),
        }),
        onSubmit: values => {
          // Aqui vem a comunicação com a API
            alert(JSON.stringify(values, null, 2));
          },
        });
   return (
       
       <Container className="themed-container" fluid="sm">
         <h3 align="center">Seja bem vindo ao sistema de Doação de solo de escavações de Brasília!</h3>
        <Form tag="form" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="cnpj">CNPJ</Label>
            <Input
            tag={MaskedInput}
            mask={cnpjMask}
             id="cnpj"
             type="text"
             placeholder="Entre com um CNPJ cadastrado"
             {...formik.getFieldProps('cnpj')}
             />
            {formik.touched.cnpj && formik.errors.cnpj ? (
         <div><Alert color="danger">{formik.errors.cnpj}</Alert></div>
       ) : null}
            </FormGroup>
            <FormGroup>
            <Label for="senha">Senha</Label>
            <Input 
            id="senha"
            type="password"
            placeholder=""
            {...formik.getFieldProps('senha')}
            />
            {formik.touched.senha && formik.errors.senha ? (
         <div><Alert color="danger">{formik.errors.senha}</Alert></div>
       ) : null}
            </FormGroup>
            <Button>Acessar</Button>
        </Form>
        </Container>
        )
}

export default LoginForm;