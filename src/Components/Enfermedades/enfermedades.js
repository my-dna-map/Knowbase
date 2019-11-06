import React, { Component } from 'react';
import tablas from '../Styles/tabla.module.css'

export default class Enfermedades extends Component {
  render() {
    if(this.props.Enfermedades.length > 0){
    return (
      <div className={tablas.Columna20}> 
            {   
                this.props.Enfermedades.map((Enfermedad) => (
                <div><a href={"/Enfermedades/" + Enfermedad.IdEnfermedad }>{ Enfermedad.NombreEnfermedad}</a></div>
                    
        ))}
      </div>
    );
    }
    else
        return <div><span>No tenemos registrada ninguna Enfermedades</span></div>
  }
}
