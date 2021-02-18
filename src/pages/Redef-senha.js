import React, { Component } from 'react';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";
import { Container, Badge, Card, CardBody, CardHeader, Button } from "reactstrap";
import "../styles.css";
import Footer from '../components/Footer/footer';
import api from '../services/api';
import { getUser } from '../services/auth';
import { Redirect } from 'react-router';
import * as toast from '../utils/toasts'

    class RedefSenha extends Component {
        render (){
            if(getUser() !== null){
                return (<Redirect from={this.props.path} to='/inicio' />);
            }
        return (
            <Container className="main">
                <h1 align="center" className='mb-5'><Badge>SDSE</Badge></h1>
                <Card>
                <CardHeader>Defina uma nova senha para sua conta!</CardHeader>
                <CardBody>
            <Formik
                initialValues={{ senha: '', consenha: '', token: '' }}
                validationSchema={Yup.object().shape({
                    senha: Yup.string().required('Campo Obrigatório!').min(6, 'A senha deve ter obrigatoriamente 6-8 caracteres!').max(8, 'Senha deve ter obrigatoriamente 6-8 caracteres!'),
                    consenha: Yup.string().required('Campo Obrigatório!').min(6, 'A senha deve ter obrigatoriamente 6-8 caracteres!').max(8, 'Senha deve ter obrigatoriamente 6-8 caracteres!'),                })}
                onSubmit={async(values, { setSubmitting }) => {
                    const senha = values.senha;
                    const token = this.props.match.params.token;

                    await api.post("/password-reset", {token, senha}).then( response => {
                        toast.sucesso("Senha redefinida com sucesso! Realize o Login!")
                        this.props.history.push('/login');
                        setSubmitting(false);
                    })
                    .catch(error => {
                        alert(error.response.data.message);
                        console.log(error);
                    });
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
        )
}}
export default RedefSenha;