import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';
import GrupoEItem from '../GrupoE/Item';
import FenotipoC from '../Fenotipos/FenotipoC';

export default class EnfermedadInfo extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Enfermedades: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/Enfermedades/'+ this.props.match.params.IdEnfermedad)
    .then(res => res.json())
    .then((data) => {
      this.setState({ Enfermedades: data ,loading:false })
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
        return  <div>Hubo un problema para recuperar las Enfermedades</div>
      else{
          console.log(this.state.Enfermedades);
    return (
      <div> 
        <h1>Detalles de la enfermedad {this.state.Enfermedades.NombreEnfermedad} V{this.state.Enfermedades.MayorVersion}.{this.state.Enfermedades.MinorVersion}</h1>
        <div className={styles.Contendor}>
        <div className={styles.Columna20}>
            <h3>Grupos de Enfermedades Asociados</h3>
            {this.state.Enfermedades.GrupoE.map((GrupoE) => (
          <GrupoEItem key={GrupoE.IdGrupoE} GrupoE={GrupoE}></GrupoEItem>
          
        ))}

        </div>
        <div className={styles.Columna80}>
            {
                this.state.Enfermedades.Phenotypes.map((Pheno) => (
                    <div>
                    <FenotipoC key={Pheno.IdPhenotype} Pheno={Pheno}></FenotipoC>
                    <hr/>
                    </div>
                   ))
        
            }
        </div>
</div>

      </div>
    );
    }}
  }
}
