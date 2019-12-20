import React, { PureComponent } from 'react';
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
import RelacionERO from '../Relaciones/RelacionERO';

export default class EnfermedadInfo extends PureComponent {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Enfermedad: [] ,
                  loading:true, 
                  Error:"",
                  IsBio : false,
                  Item: {}};
  }

  componentDidMount() {

    Auth.isBio().then(res =>{ this.setState({IsBio: res})
    Consultas.Get('/Enfermedades/'+ this.props.match.params.IdEnfermedad).then(data=> this.setState({Item: data,loading:false, texto: data.DescripcionGrupoE, Relaciones: data.Data}));})

   
  }


  render() {
    if(this.state.loading)
    return <Loading></Loading>
    else{
 
  let isBio = this.state.IsBio;
  let Relaciones = this.state.Relaciones
  return (
    <div> 
       <h2>Detalles de la Enfermedad {this.state.NombreEnfermedad} </h2>
       <Link to="/Enfermedades" tootltip="Listado de Genes"><img src={Back} alt="Back"></img></Link>
               {
                 isBio ? <Link to={"/Enfermedades/Edit/" + this.state.Item.IdEnfermedad}><img src={Edit} alt="Edit"></img></Link> :''
               }
               {
                 isBio ?<Link to={"/Enfermedades/Delete/" + this.state.Item.IdEnfermedad}><img src={Delete} alt="Delete"></img></Link>:''
               }
              
          <div className={Styles.SuperContenedor}>
              <div className={Styles.Contenedor}>
                <div className={Styles.DatosGrandesBis} style={{height:"310px"}}>
                <TextField
        label="Nombre de la Enfermedad"
        name="NombreEnfermedad"
        fullWidth
        readOnly
        value={this.state.Item.NombreEnfermedad}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
                </div>
                <div className={Styles.DatosGrandesBis}>
                  <div style={{width:"100%",height:"70px"}}>
                  <TextField
        label="Nombre de la Enfermedad"
        name="NombreEnfermedad"
        fullWidth
        readOnly
        value={this.state.Item.NombreGrupoE}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
                </div>
  <p style={{maxHeight: '250px',overflowY: "scroll",textAlign:"justify"}}>{this.state.texto}</p>
                </div>
               
                  </div>
                </div>  
                <div >
              
                </div>
                <Informacion Informacion={this.state.Item}></Informacion>
        <h2>Relaciones</h2>
        <div  className={Styles.SuperContenedor} onChange={this.Dinamic} >
          {
            (Relaciones != null)?
            Relaciones.map((Relacion,idex)=>{
              return (
                <RelacionERO Index={idex} key={idex} Value={Relacion}  ></RelacionERO>
              
              )
            })
          
            :""
          }
        </div>
</div>

  );
    }
  }
}
