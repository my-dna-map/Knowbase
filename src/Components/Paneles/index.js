import React, { Component } from 'react';
import PanelC from '../Paneles/Panel';
import styles from '../Genes/genes.module.css';
import Loader from '../Loader';
import Auth from '../../Helpers/Graphs';
import Consultas from '../../Helpers/consultas';
import { Link } from "react-router-dom";
import Add from '../../Imagenes/add.png';
import MensajeError from '../Controles/MensajeError';
export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { PanelesD: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    
    Auth.isBio().then(res =>{  
      this.setState({isBio:res});
      Consultas.Get('/Paneles').then(data=>this.setState({ PanelesD: data ,loading:false , Filtrados: data}))
      .catch(error => {
        this.setState({Error: error.message, loading:false});
      });
     
    })
  }

  render() {

    if(this.state.loading)
    {
      return  <Loader></Loader>
    }
    else{
      if(this.state.Error !== "")
        return  <MensajeError Mensaje={this.state.Error} Titulo="Consulta de Paneles"></MensajeError>
      else{
        let isBio = this.state.isBio;
    return (
      <div> 
        <h1>Paneles {isBio?<Link to="/Paneles/create"><img src={Add} alt="Agregar"/></Link>:''}</h1>  
        <div className={styles.Contenedor}>
          {this.state.PanelesD.map((Panel) => (
            <PanelC key={Panel.IdPanelVer} isBio={isBio} Panel={Panel} Version={true}></PanelC>
          ))}
        </div>   
      </div>
    );
    }}
  }
}
