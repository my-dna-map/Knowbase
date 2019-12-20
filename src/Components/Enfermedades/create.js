import React, { PureComponent } from 'react';
import Styles from '../Styles/Forms.module.css';
import Consultas from "../../Helpers/consultas";
import { Link } from "react-router-dom";
import Guardar from '../../Imagenes/Save.png';
import Cancelar from '../../Imagenes/cancel-32.png';
import Auth from '../../Helpers/Graphs';
import Loading from '../Loader';
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Add from '../../Imagenes/add.png';




const INITIAL_STATE = {
  NombreEnfermedad: "",
  
    Usuario: 0,
    error: "",
    IdGrupoE: 0
  };

 class createEnfermedad extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      Loading : true,
      GrupoE : []
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
        else
        Consultas.Get('/GrupoE').then(data => this.setState({GrupoE:data,Loading:false}));
     })
    this.setState({Usuario: this.props.User.UserID});
    
}
onSubmit= event =>{
  let Obenviar = {
    NombreEnfermedad : this.state.NombreEnfermedad,
    IdGrupoE: this.state.IdGrupoE,
    Usuario: this.state.Usuario
  }
  this.setState({ loading: "true" });
  event.preventDefault();
  Consultas.Post(Obenviar,'/Enfermedades').then(rest => this.props.history.push('/Enfermedades')).catch(err => console.log(err));

}
  render() {
    if(this.state.Loading)
      return <Loading></Loading>
      else
    return (
      <div> 
         <h2>Crear una Enfermedad </h2>
            <div className={Styles.SuperContenedor}>
                <div className={Styles.Contenedor}>
                  <div className={Styles.DatosGrandesBis}>
                  <TextField
          label="Nombre de la Enfermedad"
          name="NombreEnfermedad"
          fullWidth
          onChange={this.onChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
                  </div>
                  <div className={Styles.DatosGrandesBis}>
                  <div style={{width:"100%",height:"60px"}}>
                  <Autocomplete
      id="combo-box-demo"
      options={this.state.GrupoE}
      getOptionLabel={option =>   option.NombreGrupoE}
      style={{ width: 450, float:"left" }}
      name="GrupoeID"
      onChange={(event, newValue) => {
        
        
        if(newValue !== null)
          this.setState({texto: newValue.DescripcionGrupoE,IdGrupoE:newValue.IdGrupoE})

        else
        this.setState({texto: ''})
      }}
      
      renderInput={params => (
        <TextField {...params}  label="Nombre de la Enfermedad"  fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }} />
      )}
    /><Link style={{marginTop:30, float:"left" }} to="/GrupoE/create"><img src={Add} alt="Agregar"/></Link></div>
       <p style={{maxHeight: '250px',overflowY: "scroll",textAlign:"justify"}}>{this.state.texto}</p>
                  </div>
                  <div className={Styles.DatosGrandesBis}>
      
                    </div>
                    </div>
                  </div>  
                  <div >
                
                  </div>
                  <div className={Styles.Linea}></div>
      <div className={Styles.Linea}>
          <div className={Styles.ContenedorBotones}>
              <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Guardar
              "></img></Link>
              <Link to="/Enfermedades" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
              
          </div>
      </div>
  </div>

    );
        
  }
}
const mapStateToProps = (state, ownProps) => {
  return { User: getUser(state) };
};

export default connect(
  mapStateToProps,
  null
)(createEnfermedad);