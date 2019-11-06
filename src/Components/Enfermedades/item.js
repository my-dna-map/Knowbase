import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';

export default class EnfermedadItem extends Component {
  render() {
    return (
        <div  className={styles.Columna20} > <a href={ '/Enfermedades/' +this.props.Enfermedad.IdEnfermedad} > {this.props.Enfermedad.NombreEnfermedad}  </a></div>
    );
  }
}
