import React, { Component } from 'react';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask } from "../utils/Masks";
import {Button, Container, Row, Col, Card, CardBody, CardHeader, Badge, Form, Input, Label, FormGroup} from 'reactstrap';
import "../styles.css";
import Footer from '../components/Footer/footer';
import api from '../services/api'
import { getUser } from '../services/auth';
import { Redirect } from 'react-router';
import * as toast from '../utils/toasts'

    class PrimeiroAcesso extends Component {

        state = {
            cnpj: '',
            email: ''
        };

        handleSubmit = async (e) => { //método responsável por interceptar o submit do form
            e.preventDefault(); //evita comportamentos padrões do submit
        
            const cnpj = this.state.cnpj;
            const email = this.state.email;

        if (cnpj === "") return;// verifica se algo foi digitado para continuar processamento
        if (email === "") return;

        await api.post("/password-firstaccess", {cnpj ,email}).then( response => {
            toast.sucesso("Você receberá em breve um email no endereço fornecido para criar uma senha para sua conta!")
            this.props.history.push('/login');
        })
        .catch(error => {
            alert(error.response.data.message);
            console.log(error);
            this.setState({
              cnpj: '',
              email: '',
            })
          });
        };

        handleInputChange =  e => {
            this.setState({cnpj : e.target.value});//armazena valor digitado no input no state
          };
          
          handleInputChangeEmail =  e => {
            this.setState({email : e.target.value});//armazena valor digitado no input no state
          };

        render(){
            if(getUser() !== null){
                return (<Redirect from={this.props.path} to='/inicio' />);
            }
        return (
            <Container className="main">
                <h1 align="center" className='mb-5'><Badge>SDSE</Badge></h1>
                <Card>
                <CardHeader>Preencha os campos abaixo e enviaremos um link em seu e-mail!</CardHeader>
                <CardBody>
                <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="cnpj">CNPJ</Label>
                  <Input name="cnpj" id="cnpj" type="text" 
                    tag={MaskedInput} mask={cnpjMask}
                    onChange={this.handleInputChange} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="email">Email</Label>
                  <Input name="email" id="email" type="text"
                  onChange={this.handleInputChangeEmail} />
                  </FormGroup>
                  </Col>
                </Row>

                <Row xs="2">
                <Col><Button type="submit" onClick={this.handleSubmit}>Acessar</Button></Col>
                </Row>

              </Form>
            </CardBody>
            </Card>
            <Footer />
            </Container>
        )}};
export default PrimeiroAcesso;