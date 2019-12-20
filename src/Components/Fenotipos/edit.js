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
  Usuario: 0,
  DescripcionPhenotype: "",
  error: "",
  CreatedBy : "",
  Created:"",
  
};

 class editFeno extends PureComponent {

  constructor(props)
  {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      Loading : true,
      Item:{},
      Publish:false,
    };

  }
  componentWillMount(){
    Auth.isBio().then(res =>{ 

         if(!res)
         this.props.history.push('/');
         else
         {
           console.log(this.props.match.params);
           Consultas.Get('/Fenotipos/'+ this.props.match.params.IdPhenotype)
           .then(data =>{
             console.log(data);
              this.setState({Loading:false,OMIMPhenotype: data.OMIMPhenotype,DescripcionPhenotype: data.DescripcionPhenotype, Created: data.Created,Item: data});
           })
           .catch(error => {console.log(error); this.setState({Loading:false})});
         
         }
      })
     this.setState({Usuario: this.props.User.UserID});
    
 }
 onChange = e => {
      
  //this.setState({ [event.target.name]: event.target.value });
  this.setState({
    [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
  });
};
onSubmit = event => {
  this.setState({ loading: "true" });
  event.preventDefault();
  console.log(this.state);
  Consultas.Put(this.state,'/Fenotipos/'+ this.props.match.params.IdPhenotype).then(this.props.history.push('/Fenotipos')).catch(err => console.log(err));
 
}

  render() {
    let d = new Date(this.state.Item.Created);
    let d1 = new Date(this.state.Item.Modified);
    const {DescripcionPhenotype,OMIMPhenotype} =this.state;

    if(this.state.Loading)
    return <div><Loading></Loading></div>
    else
    return (
      <div>
      <h2>¿Estas Seguro que quieres borrar el Gen {this.state.OMIMGen }? </h2>
      <div className={Styles.SuperContenedor}>
          <div className={Styles.Contenedor}>
              
              <div className={Styles.Datos}>
                  <span className={Styles.Titulo}>OMIMPhenotype</span><br/>
                  <input  name="OMIMPhenotype"
                            value={OMIMPhenotype}
                            onChange={this.onChange}
                            type="Number"
                            placeholder="OMIM del Phenotype"
                            className={Styles.CampoTexto}></input>
              </div>
          
              
             
              <div className={Styles.Datos}>
                  <span className={Styles.Titulo}>Version</span><br/>
                  <span className={Styles.Dato}>V{this.state.Item.Mayorversion}.{this.state.Item.MinorVersion}</span>
              </div>
          </div>
          <div className={Styles.Contenedor}>
          <div className={Styles.DatosGrandes}>
                  <span className={Styles.Titulo}>Descripción</span><br/>
                  <textarea name="DescripcionPhenotype" className={Styles.CampoTextoGrande} onChange={this.onChange} value={DescripcionPhenotype}  ></textarea>
                  
              </div>
          </div>
          <div className={Styles.Contenedor}>
              <div className={Styles.Datos}>
                  <span className={Styles.Titulo}>Creado</span><br/>
                  <span className={Styles.Dato}>{d.toLocaleString()}</span>
              </div>
              <div className={Styles.Datos}>
                  <span className={Styles.Titulo}>Creado por</span><br/>
                  <span className={Styles.Dato}>{this.state.Item.CreatedBy}</span>
              </div>
              <div className={Styles.Datos}>
                  <span className={Styles.Titulo}>Modificado</span><br/>
                  <span className={Styles.Dato}>{d1.toLocaleString()}</span>
              </div>
              <div className={Styles.Datos}>
                  <span className={Styles.Titulo}>Modificado por</span><br/>
                  <span className={Styles.Dato}>{this.state.Item.ModifiedBy}</span>
              </div>
              
          </div>
      </div>
      <div className={Styles.Linea}></div>
      <div className={Styles.Linea}>
          <div className={Styles.ContenedorBotones}>
              <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Borrar"></img></Link>
              <Link to="/Fenotipos" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
              
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
)(editFeno);