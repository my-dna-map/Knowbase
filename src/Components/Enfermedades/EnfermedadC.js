import React, { Component } from 'react';
import FenotipoC from '../Fenotipos/FenotipoC';
import styles from '../GrupoE/GrupoE.module.css';

export default class EnfermedadC extends Component {
  render() {
    return (
        <div className={styles.Enfermedad}>
        <div className={styles.Columna20}><a href={"/Enfermedades/" + this.props.Enfermedad.IdEnfermedad }>{ this.props.Enfermedad.NombreEnfermedad}</a></div>
        <div className={styles.Columna80}>
            {
              this.props.Enfermedad.Phenotypes.map((Pheno) => (
               <FenotipoC Pheno={Pheno}></FenotipoC>
              )
              )
            }
        </div>

    </div>
    );
  }
}
