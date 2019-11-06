import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';

export default class GenC extends Component {
  render() {
    return (
                          <div className={styles.Columna20} >
                              <a href={'/Genes/' + this.props.Gen.IdGen}>{this.props.Gen.NombreGen}</a>
                          </div>
              
    );
  }
}
