import React, { Component } from 'react';
import PhenoItem from './item';
import styles from '../Genes/genes.module.css';
import Loader from '../Loader';
import Auth from '../../Helpers/Graphs';
import Consultas from '../../Helpers/consultas';
import {Link} from 'react-router-dom';
import Add from '../../Imagenes/add.png';
import MensajeError from '../Controles/MensajeError';

export default class Fenotipos extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Fenotipos: [] ,loading:true, Error:"",isBio: false, Filtrados:[], buscador:""};
  }

  componentDidMount() {
   Auth.isBio().then(res =>{  
      this.setState({isBio:res})
     Consultas.Get('/Fenotipos').then(data=>{
    this.setState({ Fenotipos: data ,loading:false , Filtrados: data})})
  .catch(error => {
   
    this.setState({Error: error.message, loading:false});
  });
  }).catch(error => {
    
    this.setState({Error: error.message, loading:false});
  });
  
}
onChange = e=>{
  this.setState({loading:true})

  this.setState({buscador: e.target.value})

this.setState({Filtrados: this.state.Fenotipos.filter((Fenotipo) => Fenotipo.OMIMPhenotype.toString().indexOf(e.target.value) > -1),loading:false})
}
  render() {

    if(this.state.loading)
    {
      return  <Loader></Loader>
    }
    else{
      if(this.state.Error !== "")
        return  <MensajeError Mensaje={this.state.Error} Titulo="Consulta de Fenotipos"/>
      else{
        let isBio = this.state.isBio;
    return (
      <div> 
        <h1>Fenotipos {isBio?<Link to="/Fenotipos/create"><img src={Add} alt="Agregar"/></Link>:''} </h1>    
        <input name="Buscador" onChange={this.onChange}  value={this.state.buscador}></input> 
        <div className={styles.Contenedor}>
            {this.state.Filtrados.map((pheno) => (
            <PhenoItem isBio={isBio}  key={pheno.IdPhenotype} pheno={pheno}></PhenoItem>
            
            ))}
        </div>
      </div>
    );
    }}
  }
}
