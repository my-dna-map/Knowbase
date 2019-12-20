import React, { Component } from 'react';
import styles from '../Styles/Listado.module.css';
import Edit from '../../Imagenes/Edit.png';
import Borrar from '../../Imagenes/delete.png';
import { Link } from "react-router-dom";

export default class Panel extends Component{
  render() {
   return (
      <div  className={styles.ListItem}>
      <div className={styles.Buttons}>
        {this.props.isBio && this.props.Panel.Activo ? <Link to={"/Paneles/Edit/" + this.props.Panel.IdPanel}><img height="25" className={styles.Imagenes} alt="Edit" src={Edit}/></Link>: ''}
        {this.props.isBio && this.props.Panel.Activo ?<Link  to={"/Paneles/Delete/" + this.props.Panel.IdPanel}><img height="25" className={styles.Imagenes} alt="Borrar" src={Borrar}/></Link>: ''} 
      </div>
      <div className={styles.Data}>
        <Link to={'/Paneles/' + this.props.Panel.IdPanel }  > {this.props.Panel.NombrePanel}  </Link><br/>
        <span className={styles.SubTitulo}  >Version {this.props.Panel.MayorVersion + '.' + this.props.Panel.MinorVersion} </span>
      </div>
     
  </div>);
  }
}
