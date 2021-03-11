import React, { Component } from 'react';
import '../styles.css';
import { getUser, setUser } from '../services/auth';
import {Button, Container, Row, Col, Card, CardBody, Badge, Form, Input, Label, FormGroup, CardTitle} from 'reactstrap';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { cnpjMask, telefoneMask, cpfMask, cfdfMask } from "../utils/Masks";
import api from '../services/api';
import Footer from '../components/Footer/footer';
import * as toast from '../utils/toasts';



  class EdicaoDados extends Component { 
      state = {
        nome: '',
        cnpj: '',
        cfdf: '',
        email: '',
        telefone: '',
        representante: '',
        cargo_representante: '',
        cpf_representante: ''
      };
      componentDidMount(){
        const user = getUser();
        this.setState ({
          nome: user.nome,
          cnpj: user.cnpj,
          cfdf: user.cfdf,
          email: user.email,
          telefone: user.telefone,
          representante: user.representante,
          cargo_representante: user.cargo_representante,
          cpf_representante: user.cpf_representante
        });
      }
      handleSubmit = async (e) => { //método responsável por interceptar o submit do form
        e.preventDefault();

        const nome = this.state.nome;
        const cnpj = this.state.cnpj;
        const cfdf = this.state.cfdf;
        const email = this.state.email;
        const telefone = this.state.telefone;
        const representante = this.state.representante;
        const cargo_representante = this.state.cargos_representante;
        const cpf_representante = this.state.cpf_representante;

        await api.put('empresa', {nome, cnpj, cfdf, email, telefone, representante, cargo_representante, cpf_representante}).then(response => {
            toast.sucesso("Dados atualizados com sucesso!")
            setUser(response.data)
            this.props.history.push("/inicio")
          })
            .catch(error => {
              alert(error);
            });
      };

      handleInputChangeNome =  e => {
        this.setState({nome : e.target.value});//armazena valor digitado no input no state
      };
      handleInputChangeCNPJ =  e => {
        this.setState({cnpj : e.target.value});//armazena valor digitado no input no state
      };
      handleInputChangeCFDF =  e => {
        this.setState({cfdf : e.target.value});//armazena valor digitado no input no state
      };
      handleInputChangeTelefone =  e => {
        this.setState({telefone : e.target.value});//armazena valor digitado no input no state
      };
      handleInputChangeRep =  e => {
        this.setState({representante : e.target.value});//armazena valor digitado no input no state
      };
      handleInputChangeCargo =  e => {
        this.setState({cargo_representante : e.target.value});//armazena valor digitado no input no state
      };
      handleInputChangeCPF =  e => {
        this.setState({cpf_representante : e.target.value});//armazena valor digitado no input no state
      };

    render() { 
    return (
    <Container className="mt-5 mb-5 main">
      <h1 align="center" className='mb-5'><Badge>SDSE</Badge></h1>
        <Card>
            <CardBody>
              <CardTitle>Dados empresariais</CardTitle>
            <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="nome">Nome Fantasia</Label>
                  <Input name="nome" id="nome" type="text"
                    onChange={this.handleInputChangeNome} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="cnpj">CNPJ</Label>
                  <Input name="cnpj" id="cnpj" type="text"
                  tag={MaskedInput} mask={cnpjMask}
                  onChange={this.handleInputChangeCNPJ} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="cfdf">CFDF</Label>
                  <Input name="cfdf" id="cfdf" type="text"
                  tag={MaskedInput} mask={cfdfMask}
                    onChange={this.handleInputChangeCFDF} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="telefone">Telefone</Label>
                  <Input name="telefone" id="telefone" type="text"
                  tag={MaskedInput} mask={telefoneMask}
                    onChange={this.handleInputChangeTelefone} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="representante">Nome do(a) Representante</Label>
                  <Input name="representante" id="representante" type="text"
                    onChange={this.handleInputChangeRep} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="cargo">Cargo do(a) Representante</Label>
                  <Input name="cargo" id="cargo" type="text"
                    onChange={this.handleInputChangeCargo} />
                  </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                  <Label for="cpf">CPF</Label>
                  <Input name="cpf" id="cpf" type="text"
                  tag={MaskedInput} mask={cpfMask}
                    onChange={this.handleInputChangeCPF} />
                  </FormGroup>
                  </Col>
                </Row>

                <Row xs="2">
                <Col><Button type="submit" onClick={this.handleSubmit}>Acessar</Button></Col>
                <Col><Button type="reset">Limpar</Button></Col>
                </Row>

              </Form>
            </CardBody>
        </Card>
      <Footer />
    </Container>
  )
    }}
    export default EdicaoDados;
