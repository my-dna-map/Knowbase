import React, { Component } from 'react';
import styles from '../Styles/Listado.module.css';
import Edit from '../../Imagenes/Edit.png';
import Borrar from '../../Imagenes/delete.png';
import { Link } from "react-router-dom";

export default class GrupoEItem extends Component {
    
  render() {
    return (
      <div  className={styles.ListItemGrande}>
      <div className={styles.Buttons}>
        {this.props.isBio ? <Link to={"/GrupoE/Edit/" + this.props.GrupoE.IdGrupoE}><img height="25" className={styles.Imagenes} alt="Edit" src={Edit}/></Link>: ''}
        {this.props.isBio ?<Link  to={"/GrupoE/Delete/" + this.props.GrupoE.IdGrupoE}><img height="25" className={styles.Imagenes} alt="Borrar" src={Borrar}/></Link>: ''} 
      </div>
      <div className={styles.Data}>
        <Link to={'/GrupoE/' + this.props.GrupoE.IdGrupoE }  > {this.props.GrupoE.NombreGrupoE}  </Link><br/>
     
      </div>
     
  </div>)
  }
}
