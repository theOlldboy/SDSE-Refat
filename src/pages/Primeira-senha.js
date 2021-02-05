import React from 'react';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";
import { Container, Badge, Card, CardBody, CardHeader, Button } from "reactstrap";
import "../styles.css";
import Footer from '../components/Footer/footer';

    const PrimeiraSenha = () => (
        <div>
            <Container className="main">
                <h1 align="center">Sistema de Doação de Solo de Escavações <Badge>SDSE</Badge></h1>
                <Card>
                <CardHeader>Defina uma nova senha em seu Primeiro Acesso!</CardHeader>
                <CardBody>
            <Formik
                initialValues={{ senha: '', consenha: '' }}
                validationSchema={Yup.object().shape({
                    senha: Yup.string().required('Campo Obrigatório!').min(6, 'A senha deve ter obrigatoriamente 6-8 caracteres!').max(8, 'Senha deve ter obrigatoriamente 6-8 caracteres!'),
                    consenha: Yup.string().required('Campo Obrigatório!').oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais!'),                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                } }
            >
                <Form>
                    <Field name="senha"  label="Senha" type="password" component={ReactstrapInput} />
                    
                    <Field name="consenha" label="Confirme a Senha" type="password" component={ReactstrapInput} />

                    <Button type="submit">Salvar</Button>
                </Form>
            </Formik>
            </CardBody>
            </Card>
            <Footer />
            </Container>
    </div>
    );export default PrimeiraSenha;