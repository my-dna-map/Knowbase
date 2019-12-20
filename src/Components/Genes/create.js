import React, { PureComponent } from 'react';
import Styles from '../Styles/Forms.module.css';
import Auth from '../../Helpers/Graphs';
import Loading from '../Loader';
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import Consultas from "../../Helpers/consultas";
import Guardar from '../../Imagenes/Save.png';
import Cancelar from '../../Imagenes/cancel-32.png';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';


export class createGen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            Loading : true,
      Item : {},
      NombreGen:"",
      OMIMGen:0,
      NM:"",
      DescripcionGen:"",
      NombreAlternativo:"",
      Publish:false
        };
      }
      componentDidMount(){
        Auth.isBio().then(res =>{ 

            if(!res)
            this.props.history.push('/');
            else
              this.setState({Loading:false});
         })
         this.setState({Usuario: this.props.User.UserID});
    }
    onSubmit = event => {
        this.setState({ loading: "true" });
        event.preventDefault();
        console.log(this.state);
        Consultas.Post(this.state,'/Genes').then(this.props.history.push('/Genes')).catch(err => console.log(err));
       
    }
    onChange = e => {
      
        //this.setState({ [event.target.name]: event.target.value });
        this.setState({
          [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        });
      };
    render() {
        if(this.state.Loading)
            return <div><Loading></Loading></div>
        else
        {
        return (
           
            <div>
            <h2>Crear un Gen </h2>
            <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Borrar"></img></Link>
            <Link to="/Genes" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
            <div className={Styles.SuperContenedor}>
            <div className={Styles.Contenedor}>
                    <div className={Styles.DatosGrandesBis}>
                        <TextField
                        label="Nombre del Gen"
                        name="NombreGen"
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
                        label="OMIM del Gen"
                        name="OMIMGen"
                        fullWidth
                        type="number"
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
                        <TextField
                        label="NM del Gen"
                        name="NM"
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
                        label="Descripcion del Gen"
                        name="DescripcionGen"
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
            </div>
            
        </div>
        )}
    }
}

const mapStateToProps = (state, ownProps) => {
    return { User: getUser(state) };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(createGen);
  

