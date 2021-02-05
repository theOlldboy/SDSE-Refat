import React, {Component} from 'react';
import {Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../services/api'
import * as toast from '../utils/toasts'

class TabelaDoacoes extends Component {

  state = {
    currentPage : 0,
    selected : {volume : '', tipo : {tipo: 'Tipo do solo', id : 0}, status : {status: 'Status do solo', id : 0}},
    dropdownOpenTipo : false,
    dropdownOpenStatus : false,
    showModalEdit: false,
    solos : [],
    tipos : [],
    status : []
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

  toggleEdit = () => this.setState({showModalEdit: !this.state.showModalEdit})

  toggleTipo = () => this.setState({dropdownOpenTipo : !this.state.dropdownOpenTipo})

  toggleStatus = () => this.setState({dropdownOpenStatus : !this.state.dropdownOpenStatus})

  changeVolume = (e) => this.setState({selected: {...this.state.selected, volume : e.target.value}})

  changeTipo = (e) => this.setState({
    selected : {...this.state.selected,
      tipo : {
          tipo : e.target.textContent,
          id : e.target.value
        }
      }  
    })
    
  changeStatus = (e) => this.setState({
    selected : {...this.state.selected,
      status : {
          status : e.target.textContent,
          id : e.target.value
        }
      }  
    })

  updateSolo = () => {
    const { id, volume } = this.state.selected;
    const tipoId = this.state.selected.tipo.id
    const statusId = this.state.selected.status.id
    if (volume !== '') {
      if (tipoId !== 0 ) {
          if (statusId !== 0) {
              Api.put(`solo/${id}`, {volume, tipoId, statusId}).then( () => {
                const solos = this.state.solos.filter(p => this.state.selected.id !== p.id)
                this.setState({solos : [this.state.selected].concat(solos)})
                toast.sucesso("Doação atualizado com sucesso")
              }).catch( () => {
                  toast.erro("Erro ao atualizar a doação")
              })
          }else {
              toast.erro("Informe o status da doação")
          }
      }else {
          toast.erro("Informe o tipo do solo")
      }
    }else {
        toast.erro("Informe o volume de solo da doação")
    }
  }

  render() {
    return (
      <div>
        <Table striped bordered dark hover hidden={this.props.hidden}>
            <thead>
                <tr>
                  <th>Volume</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.props.solos
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(solo => {
                return (
                  <React.Fragment key={solo.id}>
                    <tr>
                      <td>{solo.volume}</td>
                      <td>{solo.tipo_solo.tipo}</td>
                      <td>{solo.status_solo.status}</td>
                      <td>
                        <Button onClick={() => {this.setState({selected : solo}); this.toggleEdit()}}>Editar</Button>
                        <Button className='ml-3' onClick={() => {this.setState({selected : solo}); this.toggleDel()}}>Excluir</Button>                     </td>
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
        <Modal isOpen={this.state.showModalEdit} toggle={this.toggleEdit}>
            <ModalHeader toggle={this.toggleEdit}>Editar doação</ModalHeader>
            <ModalBody>
              <Form>
                  <FormGroup>
                    <Row form>
                        <Col>
                            <Label for="volume">Volume (Kg)</Label>
                            <Input value={this.state.selected.volume} id="volume" onChange={this.changeVolume}/>
                        </Col>
                      </Row>
                      <Row form>
                        <Col>
                            <ButtonDropdown isOpen={this.state.dropdownOpenTipo} toggle={this.toggleTipo}  className="pt-4">
                                <DropdownToggle caret>
                                    {this.state.selected.tipo.tipo}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.tipos.map(tipo => {
                                        return(
                                            <DropdownItem key={tipo.id} disabled={tipo.id === 0 ? true : false} onClick={this.changeTipo} value={tipo.id}>{tipo.tipo}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                      <Row form>
                        <Col>
                            <ButtonDropdown isOpen={this.state.dropdownOpenStatus} toggle={this.toggleStatus}  className="pt-4">
                                <DropdownToggle caret>
                                    {this.state.selected.status.status}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.status.map(status => {
                                        return(
                                            <DropdownItem key={status.id} disabled={status.id === 0 ? true : false} onClick={this.changeStatus} value={status.id}>{status.status}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                  </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.updateSolo(); this.toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default TabelaDoacoes;
