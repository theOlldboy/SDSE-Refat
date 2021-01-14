import React from 'react';
import '../styles.css';
import { useFormik } from 'formik';
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Alert, Card, CardBody, CardHeader, CardFooter, Badge, CardLink} from 'reactstrap';
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
       <Container>
        <h1 align="center">Sistema de Doação de Solo de Escavações <Badge>SDSE</Badge></h1>
        <Container>
        <Card>
        <Form tag="form" onSubmit={formik.handleSubmit}>
            <CardHeader>Seja bem vindo!</CardHeader>
            <CardBody>

          <FormGroup>
            <Label for="cnpj">CNPJ</Label>
            <Row>
              <Col xs="10">
            <Input
            tag={MaskedInput}
            mask={cnpjMask}
             id="cnpj"
             type="text"
             placeholder="CNPJ de sua empresa"
             {...formik.getFieldProps('cnpj')}
             />
             </Col>
             </Row>
             <Row>
               <Col xs="10">
            {formik.touched.cnpj && formik.errors.cnpj ? (
         <div><Alert color="danger">{formik.errors.cnpj}</Alert></div>
       ) : null}
              </Col>
             </Row>
            </FormGroup>

            <FormGroup>
            <Label for="senha">Senha</Label>
            <Row>
              <Col xs="10">
            <Input 
            id="senha"
            type="password"
            placeholder=""
            {...formik.getFieldProps('senha')}
            />
              </Col>
            </Row>
            <Row>
              <Col xs="10">
                {formik.touched.senha && formik.errors.senha ? (
         <div><Alert color="danger">{formik.errors.senha}</Alert></div>
       ) : null}
              </Col>
            </Row>
            </FormGroup>

            <Button>Acessar</Button>
            <Button className="btn float-right">Esqueci minha Senha</Button>
            <div align="right"><CardLink>Primeiro Acesso?</CardLink></div>
            </CardBody>
            <CardFooter className="text-center">Secretaria de Obras do Distrito Federal <div>CopyRigth @ 2020</div></CardFooter>
        </Form>
        </Card>
        </Container>
        </Container>
        )
}

export default LoginForm;