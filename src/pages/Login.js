import React, { Component } from 'react';
import '../styles.css';
import { Field, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import {Button, Container, Row, Col, Card, CardBody, CardHeader, Badge, CardLink} from 'reactstrap';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask } from "../utils/Masks";
import { getUser, login } from '../services/auth';
import api from '../services/api';
import { Link, Redirect } from "react-router-dom";
import Footer from '../components/Footer/footer';



  class Login extends Component {
    render() {  
    if(getUser() !== null){
        return (<Redirect from={this.props.path} to='/inicio' />);
    }
    return (
    <Container className="main">
      <h1 align="center" className='mb-5'><Badge>SDSE</Badge></h1>
        <Card>
            <CardHeader>Seja bem vindo!</CardHeader>
            <CardBody>
        <Formik
              initialValues={{cnpj: '', senha: ''}}
              validationSchema={Yup.object().shape({
                cnpj: Yup.string().required('Campo Obrigatório!'),
                senha: Yup.string().required('Campo Obrigatório!').min(6, 'A senha deve ter obrigatoriamente 6-8 caracteres!').max(8, 'Senha deve ter obrigatoriamente 6-8 caracteres!'),
              })}
              onSubmit={async(values, { setSubmitting }) => {          
                const cnpj = values.cnpj;
                const senha = values.senha;
          
                await api.post('login/', {cnpj, senha}).then(response => {
                  login(response.data);
                  this.props.history.push("/inicio");
                })
                  .catch(error => {
                    alert(error.response.data.message);
                    console.log(values);
                  });
              } }
              >
              <Form>
                <Row>
                  <Col xs="12">
                  <Field name="cnpj"  label="CNPJ" type="text" 
                    tag={MaskedInput} mask={cnpjMask} component={ReactstrapInput} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <Field name="senha"  label="Senha" type="password" component={ReactstrapInput} />
                  </Col>
                </Row>

              <Row xs="2">
                <Col><Button type="submit">Acessar</Button></Col>
                <Col className="text-sm"><CardLink><Link to="/recupera_senha">Esqueceu sua senha?</Link></CardLink></Col>
                <Col></Col>
                <Col className="text-sm"><CardLink><Link to="/primeiro_acesso">Primeiro Acesso?</Link></CardLink></Col>
              </Row>

              </Form>
              </Formik>
            </CardBody>
        </Card>
      <Footer />
    </Container>
  )
    }}
    export default Login;
