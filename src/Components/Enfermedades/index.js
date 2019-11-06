import React, { Component } from 'react';
import EnfermedadItem from './item';
import styles from '../GrupoE/GrupoE.module.css';

export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Enfermedades: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/Enfermedades')
    .then(res => res.json())
    .then((data) => {
      this.setState({ Enfermedades: data ,loading:false })
    })
    .catch(error => {
      this.setState({Error: error.message, loading:false});
    });
  }

  render() {

    if(this.state.loading)
    {
      return  <div>Waiting....</div>
    }
    else{
      if(this.state.Error !== "")
        return  <div>Hubo un problema para recuperar las Enfermedades</div>
      else{
    return (
      <div> 
        <h1>Enfermedades</h1>     
        <div className={styles.Contendor}>
            {this.state.Enfermedades.map((Enfermedad) => (
            <EnfermedadItem key={Enfermedad.IdEnfermedad} Enfermedad={Enfermedad}></EnfermedadItem>
            
            ))}
        </div>
      </div>
    );
    }}
  }
}
