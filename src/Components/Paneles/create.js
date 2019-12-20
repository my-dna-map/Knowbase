import React, { PureComponent } from 'react';
import Styles from '../Styles/Forms.module.css';
import Consultas from "../../Helpers/consultas";
import { Link } from "react-router-dom";
import Guardar from '../../Imagenes/Save.png';
import Cancelar from '../../Imagenes/cancel-32.png';
import Auth from '../../Helpers/Graphs';
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import TextField from '@material-ui/core/TextField';

const INITIAL_STATE = {
    NombrePanel: "",
      Usuario: 0,
      error: ""
    };
  


class createPanel extends PureComponent {
  constructor() {
    super();

    this.state = {
        ...INITIAL_STATE
    }
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
     })
    this.setState({Usuario: this.props.User.UserID});
    
}
onSubmit= event =>{
  let Obenviar = {
    NombrePanel : this.state.NombrePanel,
    Usuario: this.state.Usuario
  }
  this.setState({ loading: "true" });
  event.preventDefault();
  Consultas.Post(Obenviar,'/Paneles').then(rest => this.props.history.push('/Paneles')).catch(err => console.log(err));

}


render () {
    return (
        <div> 
            <h2>Crear un Panel  
              </h2>
              <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Guardar
              "></img></Link>  
              <Link to="/Paneles" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
            <div className={Styles.SuperContenedor}>
                <div className={Styles.Contenedor}>
                <div className={Styles.DatosGrandesBis}>
                <TextField
                    label="Nombre del Panel"
                    name="NombrePanel"
                    fullWidth
                    onChange={this.onChange}
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    />
                </div>
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
  )(createPanel);