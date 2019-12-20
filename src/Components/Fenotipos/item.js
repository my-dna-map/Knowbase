import React, { Component } from 'react';
import styles from '../Styles/Listado.module.css';
import Edit from '../../Imagenes/Edit.png';
import Borrar from '../../Imagenes/delete.png';
import { Link } from "react-router-dom";

export default class PhenoItem extends Component {
  render() {
    return (
      <div  className={styles.ListItem}>
        <div className={styles.Buttons}>
              {this.props.isBio ? <Link to={"/Fenotipos/Edit/" + this.props.pheno.IdPhenotype}><img height="25" className={styles.Imagenes} alt="Edit" src={Edit}/></Link>: ''}
              {this.props.isBio ?<Link  to={"/Fenotipos/Delete/" + this.props.pheno.IdPhenotype}><img height="25" className={styles.Imagenes} alt="Borrar" src={Borrar}/></Link>: ''} 
            </div>
            <div className={styles.Data}>
              <Link to={'/Fenotipos/' +this.props.pheno.IdPhenotype}  > {this.props.pheno.OMIMPhenotype}  </Link><br/>
            </div>
      </div>
    );
  }
}
