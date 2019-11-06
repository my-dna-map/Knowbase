import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';

export default class PhenoItem extends Component {
  render() {
      console.log(this.props.pheno);
    return (
        <div  className={styles.Columna20} > <a href={ '/Fenotipos/' +this.props.pheno.IdPhenotype} > {this.props.pheno.OminPhenotype} </a></div>
    );
  }
}
