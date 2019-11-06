import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';

export default class GrupoEItem extends Component {
    
  render() {

    return (
        <div  className={styles.Columna20} > <a href={ '/GrupoE/' +this.props.GrupoE.IdGrupoE} > {this.props.GrupoE.NombreGrupoE}  </a></div>
    );
  }
}
