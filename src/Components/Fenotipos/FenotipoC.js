import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';
import GenC from '../Genes/GenC';

export default class EnfermedadC extends Component {
  render() {
    return (
               <div className={styles.Datos}>
                    <div className={styles.Columna20}>
                      <a href={'/Fenotipos/' + this.props.Pheno.IdPhenotype}>{this.props.Pheno.OminPhenotype}</a>
                  </div>
                  <div className={styles.Columna80}>
                    <div className={styles.Datos}>
                    <div className={styles.Columna50}>
                      <span>Todavia no tenemos los HPOS</span>
                    </div>
                    <div className={styles.Columna50}>
                    <div className={styles.Genes}>
                      {
                        this.props.Pheno.Genes.map(Gen=>(
                            <GenC Gen={Gen}></GenC>
                          
                        ))
                      }</div>
                      </div>
                      </div>
                  </div>
                </div>
             
    );
  }
}
