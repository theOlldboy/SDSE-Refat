import React, { Component } from 'react';
import * as Yup from 'yup';
import { Container, Badge, Card, CardBody, CardHeader, Button, Row, Col, FormGroup, Label, Input, Form } from "reactstrap";
import "../styles.css";
import Footer from '../components/Footer/footer';
import { getUser } from '../services/auth';
import { Redirect } from 'react-router';
import api from '../services/api'
import * as toast from '../utils/toasts'

    class PrimeiraSenha extends Component {

        state = {
            senha: '',
            consenha: ''
        };

        handleSubmit = async (e) => { //método responsável por interceptar o submit do form
            e.preventDefault();

            const senha = this.state.senha;
            const consenha = this.state.senha;
            const token = this.props.match.params.token;

            if (senha === '') return;
            if (consenha === '') return;

            if (senha === consenha){
                await api.post("/password-reset", {token, senha}).then( response => {
                    toast.sucesso("Senha criada com sucesso, realize o login!")
                    this.props.history.push('/login');
                })
                .catch(error => {
                    alert(error.response.data.message);
                    console.log(error);
                }); 
            }else{
                toast.erro("As senhas informadas não conferem!")
            }
        };

            handleInputChange =  e => {
                this.setState({senha : e.target.value});//armazena valor digitado no input no state
              };
              
            handleInputChangeConsenha =  e => {
                this.setState({consenha : e.target.value});//armazena valor digitado no input no state
              };

        render(){
            if(getUser() !== null){
                return (<Redirect from={this.props.path} to='/inicio' />);
            }
        return (
            <Container className="main">
                <h1 align="center" className='mb-5'><Badge>SDSE</Badge></h1>
                <Card>
                <CardHeader>Defina uma nova senha em seu Primeiro Acesso!</CardHeader>
                <CardBody>
                <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="senha">Senha</Label>
                  <Input name="senha" id="senha" type="password"
                    onChange={this.handleInputChange} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="consenha">Confirme a Senha</Label>
                  <Input name="consenha" id="consenha" type="password"
                  onChange={this.handleInputChangeConsenha} />
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
    )
    }}
    export default PrimeiraSenha;