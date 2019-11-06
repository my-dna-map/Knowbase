import React, { Component } from 'react';
import styles from './GrupoE.module.css';
import EnfermedadC from '../Enfermedades/EnfermedadC';

export default class GrupoEC extends Component {
  render() {
    return (
        
      <div className={styles.container}> 
        <div className={styles.Datos}>
        <div className={styles.Columna20}>
          <span>Categoria</span>
        </div>
        <div className={styles.Columna20}>
          <span >Enfermedad</span>    
        </div>
        <div className={styles.Columna20}>
          <span>OMIN Enfermedades</span>
          
        </div>
        <div className={styles.Columna20}>
          <span>HPO</span>
          
        </div>
        <div className={styles.Columna20}>
          <span>Genes Asociados</span>
          
        </div>
        </div>
        <div className={styles.Descripcion}>
          <div className={styles.Columna20}>
            <a href={"/GrupoE/" + this.props.GrupoE.IdGrupoE}><span >{this.props.GrupoE.NombreGrupoE}</span></a>
          </div>
          <div className={styles.Columna80}>
          {   
                this.props.GrupoE.Enfermedades.map((Enfermedad) => (
                  <EnfermedadC key={Enfermedad.IdEnfermedad} Enfermedad={Enfermedad}></EnfermedadC>
        ))}
       
        </div>
        </div>
        <div className={styles.Descripcion}>
          <div className={styles.Columna20}>
              <b><span>Descripción de la enfermedad y epidemiología</span></b>
          </div>
          <div className={styles.Columna80}>
            <p>{this.props.GrupoE.DescripcionGrupoE}</p>
          </div>
        </div>       
      </div>
    );
  }
}
