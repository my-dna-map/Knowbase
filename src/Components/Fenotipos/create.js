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


const INITIAL_STATE = {
  OMIMPhenotype: 0,
  DescripcionPhenotype: "",
    Usuario: 0,
    error: ""
  };


 class createFenotipo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          ...INITIAL_STATE,
          Loading : true
        };
      }
    componentWillMount(){
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
        Consultas.Post(this.state,'/Fenotipos').then(rest => this.props.history.push('/Fenotipos')).catch(err => console.log(err));
       
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
            const { OMIMPhenotype, DescripcionPhenotype } = this.state;

        
    return (
      <div>
      <h2>¿Estas Seguro que quieres borrar el Gen {this.state.NombreGen }? </h2>
      <div className={Styles.SuperContenedor}>
          <div className={Styles.Contenedor}>
             
              <div className={Styles.Datos}>
                  <span className={Styles.Titulo}>OMIMPhenotype</span><br/>
                  <input  name="OMIMPhenotype"
                            value={OMIMPhenotype}
                            onChange={this.onChange}
                            type="Number"
                            placeholder="OMIM del Fenotipo"
                            className={Styles.CampoTexto}></input>
              </div>
          </div>
          <div className={Styles.Contenedor}>
            <div className={Styles.DatosGrandes}>
                  <span className={Styles.Titulo}>Descripción</span><br/>
                  <textarea name="DescripcionPhenotype" className={Styles.CampoTextoGrande} value={DescripcionPhenotype} onChange={this.onChange} ></textarea>
              </div>
          </div>

      </div>
      <div className={Styles.Linea}></div>
      <div className={Styles.Linea}>
          <div className={Styles.ContenedorBotones}>
              <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Guardar
              "></img></Link>
              <Link to="/Fenotipos" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
              
          </div>
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
)(createFenotipo);