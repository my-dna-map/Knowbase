import React, { Component } from 'react';
import PhenoItem from './item';
import styles from '../GrupoE/GrupoE.module.css';

export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Genes: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/Fenotipos')
    .then(res => res.json())
    .then((data) => {
      this.setState({ Fenotipos: data ,loading:false })
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
        return  <div>Hubo un problema para recuperar los Fenotipos</div>
      else{
    return (
      <div> 
        <h1>Fenotipos</h1>     
        <div className={styles.Contendor}>
            {this.state.Fenotipos.map((pheno) => (
            <PhenoItem key={pheno.IdPhenotype} pheno={pheno}></PhenoItem>
            
            ))}
        </div>
      </div>
    );
    }}
  }
}
