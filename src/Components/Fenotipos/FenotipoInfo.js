import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';
import EnfermedadItem from '../Enfermedades/item';
import GenC from '../Genes/GenC';

export default class FenotipoInfo extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Enfermedades: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/Fenotipos/'+ this.props.match.params.IdPhenotype)
    .then(res => res.json())
    .then((data) => {
      this.setState({ Fenotipos: data ,loading:false })
    })
    .catch(error => {
        console.log(error.message);
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
          console.log(this.state.Fenotipos);
    return (
      <div> 
        <h1>Detalles del fenotipo {this.state.Fenotipos.OminPhenotype} V{this.state.Enfermedades.MayorVersion}.{this.state.Enfermedades.MinorVersion}</h1>
        <div className={styles.Contendor}>
        <div className={styles.Columna20}>
            <h3>Enfermedades Asociadas</h3>
            {this.state.Fenotipos.Enfermedades.map((Enfermedad) => (
          <EnfermedadItem key={Enfermedad.IdEnfermedad} Enfermedad={Enfermedad}></EnfermedadItem>
          
        ))}

        </div>
        <div className={styles.Columna80}>
            <div className={styles.Contendor}>
            {
                this.state.Fenotipos.Genes.map((Gen) => (
                    <GenC key={Gen.IdGen} Gen={Gen}></GenC>
                   ))
        
            }
            </div>
        </div>
</div>

      </div>
    );
    }}
  }
}
