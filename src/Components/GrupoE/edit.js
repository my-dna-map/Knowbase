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
import Informacion from '../Controles/Informacion';




const INITIAL_STATE = {
  NombreEnfermedad: "",
    IdPanel: 0,
    NombreGrupoE: 0,
    DescripcionGrupoE:"",
    Usuario: 0,
    error: ""
  };

 class editGrupoE extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      Loading : true,
      GrupoE : [],
      Paneles: [],
      Enfermedades: [],
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
        else
        Consultas.Get('/Paneles/Activos').then(data => {this.setState({Paneles:data})
          Consultas.Get('/GrupoE/'+ this.props.match.params.IdGrupoE).then(
            res => {
              this.setState({Item: res,NombreGrupoE:res.NombreGrupoE,DescripcionGrupoE:res.DescripcionGrupoE,Loading:false});
            }
          )
        });
     })
    this.setState({Usuario: this.props.User.UserID});
    
}
onSubmit= event =>{
  let Obenviar = {
    
    IdPanel: this.state.IdPanel,
    NombreGrupoE : this.state.NombreGrupoE,
    DescripcionGrupoE: this.state.DescripcionGrupoE,
    Usuario: this.state.Usuario,
    Publish: false
  }
  this.setState({ loading: "true" });
  event.preventDefault();
  Consultas.Put(Obenviar,'/GrupoE/'+ this.props.match.params.IdGrupoE).then(rest => this.props.history.push('/GrupoE')).catch(err => console.log(err));

}
  render() {
    if(this.state.Loading)
      return <Loading></Loading>
      else
    return (
      <div> 
         <h2>Modificar el grupo de Enfermedades {this.state.Item.NombreGrupoE} </h2>
         <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Guardar
              "></img></Link>
              <Link to="/Enfermedades" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
            <div className={Styles.SuperContenedor}>
                <div className={Styles.Contenedor}>
                  <div className={Styles.DatosGrandesBis}>
                  <TextField
          label="Nombre del Grupo de Enfermedades"
          name="NombreGrupoE"
          value ={this.state.NombreGrupoE}
          fullWidth
          onChange={this.onChange}
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
                  </div>
                  <div className={Styles.DatosGrandesBis}>
                  <TextField
          label="Descripción del Grupo de Enfermedades"
          name="DescripcionGrupoE"
          value={this.state.DescripcionGrupoE}
          fullWidth
          multiline
          rows="4"
          onChange={this.onChange}
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
                  </div>
                  </div>
                  <div className={Styles.Contenedor}>
                  <div className={Styles.DatosGrandesBis}>
                  
                  <Autocomplete
      id="combo-box-demo"
      options={this.state.Paneles}
      getOptionLabel={option =>   option.NombrePanel + " V" + option.MayorVersion + "." + option.MinorVersion}
      defaultValue={this.state.Paneles[this.state.Paneles.findIndex((e) => e.IdPanel === this.state.Item.IdPanel)]}
      variant="filled"
      name="GrupoeID"
      onChange={(event, newValue) => {
        
        
        if(newValue !== null)
          this.setState({IdPanel: newValue.IdPanel})

      }}
      
      renderInput={params => (
        <TextField {...params}  label="Nombre Panel"  fullWidth
        margin="normal"
        variant="filled"
        
        InputLabelProps={{
          shrink: true,
        }}
        />
      )}
    />
                  </div><div className={Styles.DatosGrandesBis}>
                  
                    </div></div>
                  </div>   <Informacion Informacion={this.state.Item}></Informacion>
                  <div >
                
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
)(editGrupoE);