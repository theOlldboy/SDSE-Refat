import React from 'react';
import '../styles.css';
import { useFormik } from 'formik';
import {Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert, Card, CardBody, CardHeader, Badge, CardLink} from 'reactstrap';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask } from "../utils/Masks";
import { login, getuser } from '../services/api';

export default function Login () {
 
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
          handleSubmit = async (e) => { //método responsável por interceptar o submit do form
            e.preventDefault(); //evita comportamentos padrões do submit
    
            const email = this.state.username;
            const password = this.state.password;
    
            if (email == "") return;// verifica se algo foi digitado para continuar processamento
            if (password == "") return;
    
            await api.post('login/', {
                email,
                password
            }).then( response => {
                login(response.data);
                if (getUser().userTypeId == 2){
                    this.props.history.push('/busca');
                }else {
                    this.props.history.push('/meu_perfil');
                }
            })
            .catch(error => {
                toast.configure()
                toast.error(error.response.data.message,{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                    });
                this.setState({
                    username: '',
                    password: '',
                })
            })
        };
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
              <Col xs="12">
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
               <Col xs="12">
            {formik.touched.cnpj && formik.errors.cnpj ? (
         <div><Alert color="danger">{formik.errors.cnpj}</Alert></div>
       ) : null}
              </Col>
             </Row>
            </FormGroup>

            <FormGroup>
            <Label for="senha">Senha</Label>
            <Row>
              <Col xs="12">
            <Input 
            id="senha"
            type="password"
            placeholder=""
            {...formik.getFieldProps('senha')}
            />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                {formik.touched.senha && formik.errors.senha ? (
         <div><Alert color="danger">{formik.errors.senha}</Alert></div>
       ) : null}
              </Col>
            </Row>
            </FormGroup>
            
            <Row xs="2">
            <Col><Button>Acessar</Button></Col>
            <Col className="text-sm"><CardLink>Esqueceu sua senha?</CardLink></Col>
            <Col></Col>
            <Col className="text-sm"><CardLink>Primeiro Acesso?</CardLink></Col>
            </Row>
            
            </CardBody>
        </Form>
        </Card>
        </Container>
        </Container>
        )
}
}