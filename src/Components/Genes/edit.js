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
import Informacion from '../Controles/Informacion';

class editGen extends PureComponent {
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
    this.CancelClick = this.CancelClick.bind(this);
    this.BorrarClick = this.BorrarClick.bind(this);
  }

  CancelClick(e){
    e.preventDefault();
    this.props.history.push('/Genes');
  }
  BorrarClick(e){
    e.preventDefault();
    console.log(this.state);
   // console.log('Borrar ' +this.props.match.params.IdGen);
   Consultas.Put(this.state,'/Genes/'+ this.props.match.params.IdGen).then(this.props.history.push('/Genes')).catch(err => console.log(err));
  }

  onChange = e => {
      
    //this.setState({ [event.target.name]: event.target.value });
    this.setState({
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };
 componentDidMount() { 
    Auth.isBio().then(res =>{ 

        if(!res)
        this.props.history.push('/');
        
     })
     Consultas.Get('/Genes/'+ this.props.match.params.IdGen)
     .then(data=> this.setState({Item: data,Loading: false,NombreGen: data.NombreGen,OMIMGen: data.OMIMGen,NM: data.NM,DescripcionGen: data.DescripcionGen}));
    this.setState({Usuario: this.props.User.UserID});
}
  render() {
    //const isInvalid = NombreGen === "" || OMIMGen === "" || NM === "" ;
    if(this.state.Loading)
    return <div><Loading></Loading></div>
    else
    return (
      <div>
      <h2>¿Estas Seguro que quieres borrar el Gen {this.state.NombreGen }? </h2>
      <Link to="#" onClick={this.BorrarClick}><img height="32" src={Guardar} alt="Borrar"></img></Link>
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
                        value= {this.state.NombreGen}
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
                        value= {this.state.OMIMGen}
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
                        value= {this.state.NM}
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
                        value= {this.state.DescripcionGen}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        />
                    </div>
                </div>
            </div>
                <Informacion Informacion={this.state.Item}></Informacion>
      <div className={Styles.Linea}></div>
      <div className={Styles.Linea}>
          <div className={Styles.ContenedorBotones}>
            
              
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
)(editGen);
