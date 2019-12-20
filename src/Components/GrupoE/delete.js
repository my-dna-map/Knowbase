import React, { Component } from 'react';
import Styles from '../Styles/Forms.module.css';
import Consultas from "../../Helpers/consultas";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import Auth from '../../Helpers/Graphs';
import Loading from '../Loader';
import TextField from '@material-ui/core/TextField';
import Back from '../../Imagenes/back.png';
import Delete from '../../Imagenes/delete.png';
import Informacion from '../Controles/Informacion';
import RelacionGERO from '../Relaciones/RelacionGERO';

class borrarGrupoE extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Item: {} ,Loading:true, Error:""};
    this.CancelClick = this.CancelClick.bind(this);
    this.BorrarClick = this.BorrarClick.bind(this);
  }

  CancelClick(e){
    e.preventDefault();
    this.props.history.push('/Genes');
  }
  BorrarClick(e){
    e.preventDefault();
   let ObSend = { "Usuario": this.state.Usuario};
   Consultas.Delete(ObSend,'/GrupoE/'+ this.props.match.params.IdGrupoE).then(this.props.history.push('/GrupoE')).catch(err => console.log(err));
  }


  componentDidMount() {
    Auth.isBio().then(res =>{ 

      if(!res)
      this.props.history.push('/');
      Consultas.Get('/GrupoE/'+ this.props.match.params.IdGrupoE).then(data=> this.setState({Item: data,Loading:false, texto: data.DescripcionGrupoE, Relaciones: data.Data}))
   this.setState({Usuario: this.props.User.UserID});
   })
  
  }

  render() {
    if(this.state.Loading)
    return <Loading></Loading>
    else{
 
  
  let Relaciones = this.state.Relaciones
  return (
    <div> 
       <h2>Detalles del Grupo de Enfermedades {this.state.NombreGrupoE} </h2>
       <Link to="/Enfermedades" tootltip="Listado de Genes"><img src={Back} alt="Back"></img></Link>
              
                 <Link to="#" onClick={this.BorrarClick}><img src={Delete} alt="Delete"></img></Link>
               
              
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
           Relaciones.map((Relacion,idex)=>{
              return (
                <RelacionGERO Index={idex} key={idex} Value={Relacion}  ></RelacionGERO>
              
              )
            })
          }
        </div>
</div>
    );
    }}
  }
  const mapStateToProps = (state, ownProps) => {
    return { User: getUser(state) };
  };
  

  export default connect(
    mapStateToProps,
    null
  )(borrarGrupoE);