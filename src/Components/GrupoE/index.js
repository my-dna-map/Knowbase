import React, { Component } from 'react';
import GrupoEItem from './Item';
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
    this.state = { GrupoED: [] ,loading:true, Error:"",buscador:"",Filtrados:[]};
  }

  componentDidMount() {
    Auth.isBio().then(res =>{  
      this.setState({isBio:res})
      Consultas.Get('/GrupoE').then(data=>this.setState({ GrupoED: data ,loading:false, Filtrados:data }))
    .catch(error => {
      this.setState({Error: error.message, loading:false});
    });
  });
  }
  onChange = e=>{
    this.setState({loading:true})
  
    this.setState({buscador: e.target.value})
  
  this.setState({Filtrados: this.state.GrupoED.filter((GrupoE) => GrupoE.NombreGrupoE.indexOf(e.target.value) > -1),loading:false})
  }
  render() {

    if(this.state.loading)
    {
      return  <Loader></Loader>
    }
    else{
      if(this.state.Error !== "")
        return  <MensajeError Mensaje={this.state.Error} Titulo="Consulta de Grupos de Enfermedades"></MensajeError>
      else{
        let isBio = this.state.isBio;
    return (
      <div> 
      <h1>Grupos de Enfermedades {isBio?<Link to="/GrupoE/create"><img src={Add} alt="Agregar"/></Link>:''} </h1>     
      <input name="Buscador" onChange={this.onChange}  value={this.state.buscador}></input> 
      <div className={styles.Contenedor}>
      {this.state.Filtrados.map((GrupoE) => (
          <GrupoEItem isBio={isBio} key={GrupoE.IdGrupoE} GrupoE={GrupoE}></GrupoEItem>
          
          ))}
      </div>
    </div>
    );
    }}
  }
}
