import React, { Component } from 'react';
import styles from '../Styles/Listado.module.css';
import Edit from '../../Imagenes/Edit.png';
import Borrar from '../../Imagenes/delete.png';
import { Link } from "react-router-dom";

export default class EnfermedadItem extends Component {
  render() {
    return (
        //<div  className={styles.Columna20} > <a href={ '/Enfermedades/' +this.props.Enfermedad.IdEnfermedad} > {this.props.Enfermedad.NombreEnfermedad}  </a></div>
        <div  className={styles.ListItemGrande}>
        <div className={styles.Buttons}>
              {this.props.isBio ? <Link to={"/Enfermedades/Edit/" + this.props.Enfermedad.IdEnfermedad}><img height="25" className={styles.Imagenes} alt="Edit" src={Edit}/></Link>: ''}
              {this.props.isBio ?<Link  to={"/Enfermedades/Delete/" + this.props.Enfermedad.IdEnfermedad}><img height="25" className={styles.Imagenes} alt="Borrar" src={Borrar}/></Link>: ''} 
            </div>
            <div className={styles.Data}>
              <Link to={'/Enfermedades/' +this.props.Enfermedad.IdEnfermedad}  > {this.props.Enfermedad.NombreEnfermedad}  </Link><br/>
            </div>
      </div>
    );
  }
}
