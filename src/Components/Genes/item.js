import React, { Component } from 'react';
import styles from './genes.module.css';
import Edit from '../../Imagenes/Edit.png';
import Borrar from '../../Imagenes/delete.png';
import { Link } from "react-router-dom";

export default class GenItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e){
    e.preventDefault();
    this.props.history.push('/Genes/Delete/' + this.props.Gen.IdGen);
  }

  render() {
    return (
        <div  className={styles.ListItem}>
            <div className={styles.Buttons}>
              {this.props.isBio ? <Link to={"/Genes/Edit/" + this.props.Gen.IdGen}><img height="25" className={styles.Imagenes} alt="Edit" src={Edit}/></Link>: ''}
              {this.props.isBio ?<Link  to={"/Genes/Delete/" + this.props.Gen.IdGen}><img height="25" className={styles.Imagenes} alt="Borrar" src={Borrar}/></Link>: ''} 
            </div>
            <div className={styles.Data}>
              <Link to={'/Genes/' +this.props.Gen.IdGen}  > {this.props.Gen.NombreGen}  </Link><br/>
              <span className={styles.SubTitulo}  >OMINGen {this.props.Gen.OMIMGen} </span>
            </div>
           
        </div>
    );
  }
}
