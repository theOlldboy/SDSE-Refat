import React, {Component} from 'react';
import '../styles.css';
import {Button, Container, Card, CardBody, CardHeader, CardFooter, Badge} from 'reactstrap';
import {getToken, logout} from '../services/auth';

export default class Inicio extends Component {
    render(){
    return(
        
        console.log(),
        <Container>
        <h1 align="center">Sistema de Doação de Solo de Escavações <Badge>SDSE</Badge></h1>
        <Container>
        <Card>
            <CardHeader>Selecione a opção que desejar!</CardHeader>

            <CardBody>
                <Button size="lg">Doar Solo</Button>
                <Button size="lg">Solicitar Doação</Button>
                <Button size="lg">Editar Dados</Button>
            </CardBody>

            <CardFooter className="text-center">Secretaria de Obras do Distrito Federal <div>CopyRigth @ 2020</div></CardFooter>
        </Card>
        </Container>
        </Container>
    )
}
}