import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';

class App extends Component {

    state = {
        error: '',
        consulta: {},
        resultado: {}
    }

    componentDidMount() {
        this.setState({
            error: false
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.consulta !== this.state.consulta) {
            this.consultarApi();
        }   
    }

    consultarApi = () => {

        const { ciudad, pais } = this.state.consulta;

        if(!ciudad || !pais) return null;

        //leer la url agregar el api key
        const appId = '6c1bf288e5a6ed77700f0d3f2760567b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        
        //consultar con fecth
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => {
                this.setState({
                    resultado: datos
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    datosConsulta = respuesta => {
        const { ciudad, pais } = respuesta;

        //comprobar que los campos no esten vacios
        if (ciudad === '' || /^\s+$/.test(ciudad) || pais === '' || /^\s+$/.test(pais) ) {
            this.setState({
                error: true
            });
        } else {
            this.setState({
                error: false,
                consulta: respuesta
            });
        }
    }

    render() {

        const error = this.state.error;

        let resultado;

        if(error) {
            resultado = <Error mensaje="Ambos campos son obligatorios!!"/>
        } else if(!error){
            resultado = <Clima resultado={this.state.resultado}/>
        }

        return (
            <div className="app">
                <Header 
                    titulo={'Clima React'}
                />

                <Formulario
                    datosConsulta={this.datosConsulta}
                />

                {resultado}
            </div>
        );
    }
}

export default App;
