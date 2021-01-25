import React from 'react';
import '../styles.css';
import { useFormik } from 'formik';
import {Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert, Card, CardBody, CardHeader, Badge, CardLink} from 'reactstrap';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask } from "../utils/Masks";
import { login } from '../services/auth';
import api from '../services/api';
import { Link, useHistory } from "react-router-dom";
import Footer from '../components/Footer/footer';



  function Login() {
    const history = useHistory();

  const formik = useFormik({
    initialValues: {
      cnpj: '',
      senha: '',
    },
    validationSchema: Yup.object({
      cnpj: Yup.string().required('Campo Obrigatório!'),
      senha: Yup.string().required('Campo Obrigatório!').min(6, 'A senha deve ter obrigatoriamente 6-8 caracteres!').max(8, 'Senha deve ter obrigatoriamente 6-8 caracteres!'),
    }),

    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      
      

      const cnpj = values.cnpj;
      const senha = values.senha;

      await api.post('login/', {
        cnpj,
        senha
      }).then(response => {
        login(response.data);
        history.push("/inicio");
      })
        .catch(error => {
          alert(error.response.data.message);
          console.log(values);
        });
    }
  });

  
  return (
    <Container className="main">
      
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
                      {...formik.getFieldProps('cnpj')} />
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
                      {...formik.getFieldProps('senha')} />
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
                <Col><Button type="submit">Acessar</Button></Col>
                <Col className="text-sm"><CardLink><Link to="/redef_senha">Esqueceu sua senha?</Link></CardLink></Col>
                <Col></Col>
                <Col className="text-sm"><CardLink>Primeiro Acesso?</CardLink></Col>
              </Row>

            </CardBody>
          </Form>

        </Card>
      </Container>
      <Footer />
    </Container>
  );
}
    export default Login;
