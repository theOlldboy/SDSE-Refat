import React, {Component} from 'react';
import '../styles.css';
import {Button, Container, Card, CardBody, CardHeader, CardFooter, Badge} from 'reactstrap';

export default class Inicio extends Component {
    render(){
    return(
        <Container>
        <h1 align="center">Sistema de Doação de Solo de Escavações <Badge>SDSE</Badge></h1>
        <Container>
        <Card>
            <CardHeader>Selecione a opção que desejar!</CardHeader>

            <CardBody>
                <Button size="lg" block>Doar Solo</Button>
                <Button size="lg" block>Solicitar Doação</Button>
                <Button size="lg" block>Editar Dados</Button>
            </CardBody>

            <CardFooter className="text-center">Secretaria de Obras do Distrito Federal <div>CopyRigth @ 2020</div></CardFooter>
        </Card>
        </Container>
        </Container>
    )
}
}