import React, { Component } from 'react';
import '../styles.css';
import {Button, Container, Row, Col, Card, CardBody, CardHeader, Badge, CardLink, Form, Input, Label, FormGroup} from 'reactstrap';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask } from "../utils/Masks";
import { getUser, login } from '../services/auth';
import api from '../services/api';
import { Link, Redirect } from "react-router-dom";
import Footer from '../components/Footer/footer';
import * as toast from '../utils/toasts';



  class Login extends Component {

    state = {//variavel que armazena dados do componente para serem usados por ele, e caso alguma das informações mude o render() é executado novamente
      cnpj: '',
      senha: ''
  };

  handleSubmit = async (e) => { //método responsável por interceptar o submit do form
    e.preventDefault(); //evita comportamentos padrões do submit

    const cnpj = this.state.cnpj;
    const senha = this.state.password;

    if (cnpj === "") return;// verifica se algo foi digitado para continuar processamento
    if (senha === "") return;


    await api.post('login/', {
      cnpj,
      senha
  }).then( response => {
      login(response.data);
          this.props.history.push('/inicio');
      })
  .catch(error => {
      toast.erro(error.response.data.message,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
          });
      this.setState({
        cnpj: '',
        senha: '',
      })
  })
};

handleInputChange =  e => {
  this.setState({cnpj : e.target.value});//armazena valor digitado no input no state
};

handleInputChangeSenha =  e => {
  this.setState({senha : e.target.value});//armazena valor digitado no input no state
};

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
                  <Label for="senha">Senha</Label>
                  <Input name="senha" id="senha" type="password"
                  onChange={this.handleInputChangeSenha} />
                  </FormGroup>
                  </Col>
                </Row>

              <Row xs="2">
                <Col><Button type="submit" onClick={this.handleSubmit}>Acessar</Button></Col>
                <Col className="text-sm"><CardLink><Link to="/recupera_senha">Esqueceu sua senha?</Link></CardLink></Col>
                <Col></Col>
                <Col className="text-sm"><CardLink><Link to="/primeiro_acesso">Primeiro Acesso?</Link></CardLink></Col>
              </Row>

              </Form>
            </CardBody>
        </Card>
      <Footer />
    </Container>
  )
    }}
    export default Login;
