import React, { Component } from 'react';
import '../styles.css';
import { Field, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import {Button, Container, Card, CardBody, Badge, CardTitle} from 'reactstrap';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask, telefoneMask, cpfMask, cfdfMask } from "../utils/Masks";
import api from '../services/api';
import Footer from '../components/Footer/footer';



  class EdicaoDados extends Component {
    render() { 
    return (
    <Container className="main">
      <h1 align="center" className='mb-5'><Badge>SDSE</Badge></h1>
        <Card>
            <CardBody>
              <CardTitle>Dados empresariais</CardTitle>
        <Formik
              initialValues={{nome: '', cnpj: '', cfdf: '', email: '', telefone: '', representante: '', cargorep: '', cpfrep: '' }}
              validationSchema={Yup.object().shape({
                cnpj: Yup.string().required('Campo Obrigatório!'),
                cfdf: Yup.string().required('Campo Obrigatório!'),
                email: Yup.string().required('Campo Obrigatório!').email('E-mail inválido!'),
                telefone: Yup.string().required('Campo Obrigatório!'),
                representante: Yup.string().required('Campo Obrigatório!'),
                cargorep: Yup.string().required('Campo Obrigatório!'),
                cpfrep: Yup.string().required('Campo Obrigatório!'),
              })}
              onSubmit={async(values, { setSubmitting }) => {          
                const cnpj = values.cnpj;
                const cfdf = values.cfdf;
                const email = values.email;
                const telefone = values.telefone;
                const representante = values.representante;
                const cargorep = values.cargorep;
                const cpfrep = values.cpfrep;
          
                await api.post(''/*rota do back*/, {cnpj, cfdf, email, telefone, representante, cargorep, cpfrep}).then(response => {
                  // Ações pós post vão aqui!
                })
                  .catch(error => {
                    alert(error.response.data.message);
                  });
              } }
              >
              <Form>
                  <Field name="nome"  label="Nome Fantasia" type="text" component={ReactstrapInput} />

                  <Field name="cnpj"  label="CNPJ" type="text" 
                  tag={MaskedInput} mask={cnpjMask} component={ReactstrapInput} />

                  <Field name="cfdf"  label="CFDF" type="text"
                  tag={MaskedInput} mask={cfdfMask} component={ReactstrapInput} />

                  <Field name="email"  label="Email" type="text" component={ReactstrapInput} />

                  <Field name="telefone"  label="Telefone" type="text"
                  tag={MaskedInput} mask={telefoneMask} component={ReactstrapInput} />

                  <Field name="representante"  label="Representante Legal" type="text" component={ReactstrapInput} />

                  <Field name="cargorep"  label="Cargo do Representante" type="text" component={ReactstrapInput} />

                  <Field name="cpfrep"  label="CPF fo Representante" type="text"
                  tag={MaskedInput} mask={cpfMask} component={ReactstrapInput} />

                <Button type="submit">Salvar</Button>
                <Button type="reset">Limpar</Button>

              </Form>
              </Formik>
            </CardBody>
        </Card>
      <Footer />
    </Container>
  )
    }}
    export default EdicaoDados;
