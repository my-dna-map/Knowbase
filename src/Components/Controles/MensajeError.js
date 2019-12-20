import React, { PureComponent } from 'react';
import { toast} from "react-toastify";
import help from '../../Imagenes/help.jpg'

export default class MensajeError extends PureComponent {
    componentWillMount(){
        toast.error("Hubo un problema en " + this.props.Titulo +": " + this.props.Mensaje, {
            position: toast.POSITION.BOTTOM_CENTER
          });
    }
    
    render() {
        return (
            <div>
                <h2>Hubo un problema en {this.props.Titulo +": " + this.props.Mensaje}</h2>
                <img src={help} alt='Help'></img>
                <br/>
                <span>Por favor contactar a Federico Hansen </span>
            </div>
        )
    }
}
