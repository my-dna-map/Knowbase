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
import Informacion from '../Controles/Informacion';




const INITIAL_STATE = {
  NombreEnfermedad: "",
    IdPanel: 0,
    NombreGrupoE: 0,
    DescripcionGrupoE:"",
    Usuario: 0,
    error: ""
  };

 class editPanel extends PureComponent {
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
       
          Consultas.Get('/Paneles/'+ this.props.match.params.IdPanel).then(
            res => {
              console.log(res);
              this.setState({Item: res,Loading:false,NombrePanel: res.NombrePanel});
            });
    })
    this.setState({Usuario: this.props.User.UserID});
    
}
onSubmit= event =>{
  let Obenviar = {
    IdPanel: this.state.IdPanel,
    NombrePanel : this.state.NombrePanel,
    Usuario: this.state.Usuario,
    Publish: false
  }
  this.setState({ Loading: "true" });
  event.preventDefault();
  Consultas.Put(Obenviar,'/Paneles/'+ this.props.match.params.IdPanel).then(rest => this.props.history.push('/Paneles')).catch(err => console.log(err));

}
  render() {
    if(this.state.Loading)
      return <Loading></Loading>
      else
    return (
      <div> 
         <h2>Modificar el panel {this.state.Item.NombrePanel} </h2>
         <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Guardar
              "></img></Link>
              <Link to="/Paneles" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
            <div className={Styles.SuperContenedor}>
                <div className={Styles.Contenedor}>
                  <div className={Styles.DatosGrandesBis}>
                  <TextField
          label="Nombre del Panel"
          name="NombrePanel"
          value ={this.state.NombrePanel}
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
                  
                  </div>
                  </div>
                  
                  </div>   <Informacion Informacion={this.state.Item}></Informacion>
                  <div >
                    <h2>Relaciones</h2>

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
)(editPanel);