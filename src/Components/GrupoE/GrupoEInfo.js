import React, { Component } from 'react';
import Styles from '../Styles/Forms.module.css';
import Consultas from "../../Helpers/consultas";
import { Link } from "react-router-dom";

import Auth from '../../Helpers/Graphs';
import Loading from '../Loader';
import TextField from '@material-ui/core/TextField';
import Back from '../../Imagenes/back.png';
import Edit from '../../Imagenes/Edit.png';
import Delete from '../../Imagenes/delete.png';
import Informacion from '../Controles/Informacion';
import RelacionGERO from '../Relaciones/RelacionGERO';


export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Item: {} ,loading:true, Error:""};
  }

  componentDidMount() {
    Auth.isBio().then(res =>{ this.setState({IsBio: res})
    Consultas.Get('/GrupoE/'+ this.props.match.params.IdGrupoE).then(data=> this.setState({Item: data,loading:false, texto: data.DescripcionGrupoE, Relaciones: data.Data}));})

  }

  render() {
    if(this.state.loading)
    return <Loading></Loading>
    else{
 
  let isBio = this.state.IsBio;
  let Relaciones = this.state.Relaciones
  return (
    <div> 
       <h2>Detalles del Grupo de Enfermedades {this.state.NombreGrupoE} </h2>
       <Link to="/Enfermedades" tootltip="Listado de Genes"><img src={Back} alt="Back"></img></Link>
               {
                 isBio ? <Link to={"/Grupoe/Edit/" + this.state.Item.IdGrupoE}><img src={Edit} alt="Edit"></img></Link> :''
               }
               {
                 isBio ?<Link to={"/GrupoE/Delete/" + this.state.Item.IdGrupoE}><img src={Delete} alt="Delete"></img></Link>:''
               }
              
          <div className={Styles.SuperContenedor}>
          <div className={Styles.Contenedor}>
                  <div className={Styles.DatosGrandesBis}>
                  <TextField
          label="Nombre del Grupo de Enfermedades"
          name="NombreGrupoE"
          fullWidth
          readOnly
          value={this.state.Item.NombreGrupoE}
          margin="normal"
          
          InputLabelProps={{
            shrink: true,
          }}
        />
                  </div>
                  <div className={Styles.DatosGrandesBis}>
                  <TextField
          label="Descripción del Grupo de Enfermedades"
          name="DescripcionGrupoE"
          fullWidth
          multiline
          readOnly
          rows="4"
          value={this.state.Item.DescripcionGrupoE}
          margin="normal"
          
          InputLabelProps={{
            shrink: true,
          }}
        />
                  </div>
                  </div>
                  <div className={Styles.Contenedor}>
                  <div className={Styles.DatosGrandesBis}>
                    
                    <TextField
        label="Nombre de la Enfermedad"
        name="NombreEnfermedad"
        fullWidth
        readOnly
        value={this.state.Item.NombrePanel + " V" + this.state.Item.Version}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      /></div>
                    <div className={Styles.DatosGrandesBis}>
                    </div>
                  </div>
              
                </div>  
                <div >
              
                </div>
                <Informacion Informacion={this.state.Item}></Informacion>
        <h2>Relaciones</h2>
        <div  className={Styles.SuperContenedor} onChange={this.Dinamic} >
          {
            (Relaciones !== null)?
            Relaciones.map((Relacion,idex)=>{
              return (
                <RelacionGERO Index={idex} key={idex} Value={Relacion}  ></RelacionGERO>
              
              )
            }):""
          }
        </div>
</div>
    );
    }}
  }

