import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Mapa from './Mapa';
import PDFViewer from 'pdf-viewer-reactjs'

class TabelaSolicitacoes extends Component {
  
  state = {
    currentPage : 0,
    selected : {volume : '', 
      tipo_solo : {tipo: 'Tipo do solo', id : 0}, 
      status_solo : {status: 'Status do solo', id : 0},
      empresa_user : {nome : '', telefone : '', cnpj : '', email: '', representante: ''},
      file : {url : ''}
    },
    showModal: false,
    places : []
  }

  componentWillReceiveProps() {
    this.setState({solos : this.props.solos})
  }
  
   handlePageClick = (e, index) => {
    e.preventDefault();
    this.setState({currentPage: index});
  };

  handlePreviousClick = (e) => {
    e.preventDefault();
    this.setState({currentPage: this.state.currentPage - 1});
  }

  handleNextClick = (e) => {
    e.preventDefault();
    this.setState({currentPage: this.state.currentPage + 1});
  }

  toggle = () => this.setState({showModal: !this.state.showModal})

  render() {
    return (
      <div>
        <Table striped bordered dark hover hidden={this.props.hidden}>
            <thead>
                <tr>
                  <th>Volume</th>
                  <th>Tipo</th>
                  <th>Informações</th>
                </tr>
            </thead>
            <tbody>
            {this.props.solos
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(solo => {
                return (
                  <React.Fragment key={solo.id}>
                    <tr>
                      <td>{solo.volume} Kg</td>
                      <td>{solo.tipo_solo.tipo}</td>
                      <td>
                        <Button onClick={() => {this.setState({selected : solo}); this.toggle()}}>Mais +</Button></td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          pagesCount={Math.round((this.props.solos.length / 10) + 0.5)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
        
        <Modal isOpen={this.state.showModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Informações sobre a doação</ModalHeader>
          <ModalBody>
          <ListGroup>
            <ListGroupItem>Empresa: {this.state.selected.empresa_user.nome}</ListGroupItem>
            <ListGroupItem>Telefone: {this.state.selected.empresa_user.telefone}</ListGroupItem>
            <ListGroupItem>CNPJ: {this.state.selected.empresa_user.cnpj}</ListGroupItem>
            <ListGroupItem>E-mail: {this.state.selected.empresa_user.email}</ListGroupItem>
            <ListGroupItem>Representante: {this.state.selected.empresa_user.representante}</ListGroupItem>
          </ListGroup>
          <PDFViewer
              document={{
                  url: this.state.selected.file.url,
              }}/>
          <div className='mapa'>
            <Mapa places={this.state.places}></Mapa>
          </div>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default TabelaSolicitacoes;
