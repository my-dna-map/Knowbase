import React, { Component } from 'react';
import GenItem from './item';
import styles from './genes.module.css';
import Loader from '../Loader';
import Auth from '../../Helpers/Graphs';
import Consultas from '../../Helpers/consultas';
import { Link } from "react-router-dom";
import Add from '../../Imagenes/add.png';
import MensajeError from '../Controles/MensajeError';

export default class Genes extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Genes: [] ,loading:true, Error:"",isBio: false,buscador:"",Filtrados: []};
  }

  
  componentDidMount() {
    Auth.isBio().then(res =>{  
      this.setState({isBio:res});
      Consultas.Get('/Genes').then(data=>this.setState({ Genes: data ,loading:false , Filtrados: data}))
      .catch(error => {
        this.setState({Error: error.message, loading:false});
      });
     
    })
  }

  onChange = e=>{
    this.setState({loading:true})

    this.setState({buscador: e.target.value})
  
  this.setState({Filtrados: this.state.Genes.filter((Gen) => Gen.NombreGen.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1),loading:false})
  }

 
  render() {

    if(this.state.loading)
    {
      return  <Loader></Loader>
    }
    else{
      if(this.state.Error !== "")
        return  <MensajeError Mensaje={this.state.Error} Titulo="Consulta de Genes"/>
      else{
        const isBio = this.state.isBio;
    return (
      <div> 
        <h1>Genes {isBio?<Link to="/genes/create"><img src={Add} alt="Alta"></img></Link>:''}</h1>   
        
        <input name="Buscador" onChange={this.onChange}  value={this.state.buscador}></input> 
        <div className={styles.Contenedor}>
            {this.state.Filtrados.map((Gen) => (
            <GenItem key={Gen.IdGen} Gen={Gen} isBio= {isBio}></GenItem>
            
            ))}
        </div>
      </div>
    );
    }}
  }
}
