import React, { Component } from 'react';
import * as Yup from 'yup';
import {Button, Container, Row, Col, Card, CardBody, CardHeader, Badge, CardLink, Form, Input, Label, FormGroup} from 'reactstrap';
import "../styles.css";
import Footer from '../components/Footer/footer';
import api from '../services/api';
import { getUser } from '../services/auth';
import { Redirect } from 'react-router';
import * as toast from '../utils/toasts'

    class RedefSenha extends Component {
        state = {
            senha: '',
            consenha: ''
        };

        handleSubmit = async (e) => { //método responsável por interceptar o submit do form
            e.preventDefault(); //evita comportamentos padrões do submit

            const senha = this.state.senha;
            const consenha = this.state.consenha;
            const token = this.props.match.params.token;

            if (senha === '') return;
            if (consenha === '') return;

            if (senha === consenha){
                await api.post("/password-reset", {token, senha}).then( response => {
                toast.sucesso("Senha redefinida com sucesso! Realize o Login!")
                this.props.history.push('/login');
            })
            .catch(error => {
                alert(error.response.data.message);
                console.log(error);
                this.setState({
                    cnpj: '',
                    senha: '',
                  })
            });
            }else{
                toast.erro("As senhas informadas não conferem!")
            };
        };

        handleInputChange =  e => {
            this.setState({senha : e.target.value});//armazena valor digitado no input no state
          };
          
          handleInputChangeEmail =  e => {
            this.setState({consenha : e.target.value});//armazena valor digitado no input no state
          };

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
export default RedefSenha;