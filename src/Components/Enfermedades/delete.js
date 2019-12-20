import React, { PureComponent } from 'react';
import Styles from '../Styles/Forms.module.css';
import Consultas from "../../Helpers/consultas";
import { Link } from "react-router-dom";
import Borrar from '../../Imagenes/delete.png';
import Cancelar from '../../Imagenes/cancel-32.png';
import Auth from '../../Helpers/Graphs';
import Loading from '../Loader';
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import TextField from '@material-ui/core/TextField';
import Informacion from '../Controles/Informacion';
import RelacionERO from '../Relaciones/RelacionERO';


 class deleteEnfermedad extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

      Loading : true,
      GrupoE : [],
      Item:{}
    };
  }
  onChange = e => {
      
    //this.setState({ [event.target.name]: event.target.value });
    this.setState({
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };
  componentDidMount(){
  Auth.isBio().then(res =>{ 

        if(!res)
        this.props.history.push('/');
        else{
          Consultas.Get('/GrupoE').then(data => {this.setState({GrupoE:data})
          Consultas.Get('/Enfermedades/'+ this.props.match.params.IdEnfermedad).then(data => {this.setState({NombreEnfermedad: data.NombreEnfermedad,IdGrupoE: data.IdGrupoE,Item: data,texto: data.DescripcionGrupoE,Loading:false});})
        });
       }
       
      
    })
    this.setState({Usuario: this.props.User.UserID});
    
}
onSubmit= event =>{
  let Obenviar = {
    NombreEnfermedad : this.state.NombreEnfermedad,
    IdGrupoE: this.state.IdGrupoE,
    Usuario: this.state.Usuario,
    Publish: false
  }
  this.setState({ loading: "true" });
  event.preventDefault();
  Consultas.Delete(Obenviar,'/Enfermedades/' + this.props.match.params.IdEnfermedad).then(rest => this.props.history.push('/Enfermedades')).catch(err => console.log(err));

}
  render() {
    
    
    
    if(this.state.Loading)
      return <Loading></Loading>
      else{

    let Relaciones = this.state.Item.Data;
    return (
      <div> 
         <h2>¿Esta seguro que quiere borrar la Enfermedad {this.state.NombreEnfermedad} ?</h2>
  
              <Link to="#" onClick={this.onSubmit}><img height="32" src={Borrar} alt="Guardar
              "></img></Link>
              <Link to="/Enfermedades" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
    
            <div className={Styles.SuperContenedor}>
                <div className={Styles.Contenedor}>
                  <div className={Styles.DatosGrandesBis} style={{height:"300px"}}>
                  <TextField
          label="Nombre de la Enfermedad"
          name="NombreEnfermedad"
          fullWidth
          readOnly
          value={this.state.NombreEnfermedad}
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
            Relaciones.map((Relacion,idex)=>{
              return (
                <RelacionERO Index={idex} key={idex} Value={Relacion}  ></RelacionERO>
              
              )
            })
          }
          </div>
  </div>

    );
      }
  }
}
const mapStateToProps = (state, ownProps) => {
  return { User: getUser(state) };
};

export default connect(
  mapStateToProps,
  null
)(deleteEnfermedad);