import React, { Component } from 'react';
import '../styles.css';
import {Button, Container, Card, CardBody, CardHeader, Badge} from 'reactstrap';
import Footer from '../components/Footer/footer';
import {logout} from '../services/auth';

class Inicio extends Component {
    render (){
    return(
        <Container className="main">
        <h1 align="center" className='mb-5'><Badge>SDSE</Badge></h1>
        <Container>
        <Card>
            <CardHeader>Selecione a opção que desejar!</CardHeader>

            <CardBody>
                <Button size="lg" block onClick={() => this.props.history.push("/doacoes")}>Doar Solo</Button>
                <Button size="lg" block className='bg-primary' onClick={() => this.props.history.push("/doacoes-disponiveis")}>Ver doações disponíveis</Button>
                <Button size="lg" block onClick={() => this.props.history.push("/solicitacao")}>Solicitar Doação</Button>
                <Button size="lg" block onClick={() => this.props.history.push("/edicao-dados")}>Editar Dados</Button>
                <Button size="lg" block onClick={() => {logout(); this.props.history.push("/login")}}>Sair</Button>
            </CardBody>

        </Card>
        </Container>
        <Footer />
        </Container>
    );
}} export default Inicio;