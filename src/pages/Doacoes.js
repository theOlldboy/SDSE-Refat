import React, {Component} from 'react';
import { Container, Badge, Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaDoacoes from '../components/TabelaDoacoes'
import * as toast from '../utils/toasts'
import Api from '../services/api'

class Doacao extends Component {

    state = {
        doacoes : [],
        hidden : true,
        volume : '',
        latitute : '',
        longitude : '',
        dropdownOpenTipos : false,
        labelTipo : {tipo : 'Tipo de solo', id : 0}
    }

    hiddenTabela = () => this.setState({hidden : !this.state.hidden})

    toggleTipo = () => this.setState({dropdownOpenTipos : !this.state.dropdownOpenTipos})
    
    changeTipo = (e) => {
        this.setState({
            labelTipo : {
                tipo : e.target.textContent,
                id : e.target.value
            }  
        })
    }

    changeVolume = (e) => this.setState({volume : e.target.value})

    changeLatitude = (e) => this.setState({latitude : e.target.value})

    changeLongitude = (e) => this.setState({longitude : e.target.value})

    cleanFilters = () => {
        this.setState({
            labelTipo : {tipo : 'Tipo de solo', id : 0},
            volume : '',
            latitute : '',
            longitude : '',
        })
    }

    buscarDoacao = async () => {
        const {volume} = this.state
        const tipoId = this.state.labelTipo.id
        await Api.post('solos-data-params/', {volume,tipoId}).then( response => {
            this.setState({doacoes : response.data})
            if (this.state.doacoes.length <= 0){
                toast.info("Nenhuma doação encontrada com os filtros informados")
            }
        })
        if (this.state.doacoes.length !== 0 && this.state.hidden) {
            this.hiddenTabela()
        }else if (this.state.doacoes.length === 0 && this.state.hidden === false){
            this.hiddenTabela()
        }
    }

    render () {
        return (
            <Container className="main">
                <h1 align="center">Sistema de Doação de Solo de Escavações <Badge>SDSE</Badge></h1>
                <Card className="p-3 mt-3">
                    <CardTitle><h3>Minhas doações</h3></CardTitle>
                    <CardBody>
                    <Row className="pb-3">
                        <InputGroup>
                            <Input className='rounded-left' placeholder='Volume' type='number' value={this.state.volume} onChange={this.changeVolume}/>
                            <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={this.buscarDoacao}>Buscar</Button></InputGroupAddon>
                            <ButtonDropdown className='ml-3' isOpen={this.state.dropdownOpenTipos} toggle={this.toggleTipo}>
                                <DropdownToggle caret>
                                    {this.state.labelTipo.tipo}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.doacoes.map(doacao => {
                                        return(
                                            <DropdownItem key={doacao.id} disabled={doacao.id === 0 ? true : false} onClick={this.changeTipo} value={doacao.id}>{doacao.tipo}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar filtros</Button>
                        </InputGroup>
                    </Row>
                    </CardBody>
                    <TabelaDoacoes solos={this.state.doacoes} hidden={this.state.hidden}/>
                </Card>
            </Container>
        )
    }
}
export default Doacao;
