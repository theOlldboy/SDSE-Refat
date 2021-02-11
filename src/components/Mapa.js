import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAJWJvGO3fXRoOlq6ELP9MkoSBdVC1gCo4')
})(class Mapa extends Component {

    constructor (props){
        super(props)
        this.state = {
            selectedPlace : {
                id: 0, lat:0, lng: 0,addresses : [{latitude : '0', longitude : '0'}]
            },
            selected : false
        }
      };

      componentWillMount () {
        this.setState({selected : false})
      }

      open(place, selected) {
        if(place.id != 0 && selected){
           window.location.href = ``;
        }
      }

  render() {
    return (
        <Map google={this.props.google} zoom={14} initialCenter={{lat : JSON.parse(localStorage.getItem('@user-loc')).lat, lng : JSON.parse(localStorage.getItem('@user-loc')).lng}} >
           {this.props.places.map(
             place =>(
            <Marker key={place.id}
            position={{
                lat: place.latitude,
                lng: place.longitude
            }} onClick={() => {
              this.setState({selected : true,
                selectedPlace : place})
            }}>
            </Marker>
           ))}

            <InfoWindow visible={this.state.selected} position={{
                lat: this.state.selectedPlace.latitude,
                lng: this.state.selectedPlace.longitude
            }}  onClick={this.open(this.state.selectedPlace, this.state.selected)} >
            <h3 className='to-link'>{this.state.selectedPlace.name}</h3>
            <p>{this.state.selectedPlace.description}</p> 
            </InfoWindow>
        </Map>
    );
  }
})
