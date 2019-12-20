import React, { PureComponent } from 'react'
import Styles from '../Styles/Forms.module.css';
import Auth from '../../Helpers/Graphs';
import Loading from '../Loader';
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import Consultas from "../../Helpers/consultas";
import Borrar from '../../Imagenes/delete.png';
import Cancelar from '../../Imagenes/cancel-32.png';
import { Link } from "react-router-dom";

 class deleteFenotipo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          Loading : true,
          Item : {}
        };
        this.CancelClick = this.CancelClick.bind(this);
        this.BorrarClick = this.BorrarClick.bind(this);
      }

      CancelClick(e){
        e.preventDefault();
        this.props.history.push('/Fenotipos');
      }
      BorrarClick(e){
        e.preventDefault();
       // console.log('Borrar ' +this.props.match.params.IdGen);
       Consultas.Delete(this.state,'/Fenotipos/'+ this.props.match.params.IdPhenotype).then(this.props.history.push('/Fenotipos')).catch(err => console.log(err));
      }
      componentDidMount(){
        Auth.isBio().then(res =>{ 

            if(!res)
            this.props.history.push('/');
            else{
                Consultas.Get('/Fenotipos/'+ this.props.match.params.IdPhenotype).then(data=> this.setState({Item: data,Loading:false}));
                 this.setState({Usuario: this.props.User.UserID});
            }
         })
       
    }

    render() {
        let d = new Date(this.state.Item.Created);
        let d1 = new Date(this.state.Item.Modified);
        if(this.state.Loading)
        return <div><Loading></Loading></div>
        else
        return (
            <div>
                <h2>¿Estas Seguro que quieres borrar el Fenotipo {this.state.Item.OMIMPhenotype }? </h2>
                <div className={Styles.SuperContenedor}>
                    <div className={Styles.Contenedor}>
                        <div className={Styles.Datos}>
                            <span className={Styles.Titulo}>OMIMPhenotype</span><br/>
                            <span className={Styles.Dato}>{this.state.Item.OMIMPhenotype}</span>
                        </div>
                    
                        
                        
                        <div className={Styles.Datos}>
                            <span className={Styles.Titulo}>Version</span><br/>
                            <span className={Styles.Dato}>V{this.state.Item.Mayorversion}.{this.state.Item.MinorVersion}</span>
                        </div>
                    </div>
                    <div className={Styles.Contenedor}>
                    <div className={Styles.DatosGrandes}>
                            <span className={Styles.Titulo}>Descripción</span><br/>
                            <span className={Styles.Dato}>{this.state.Item.DescripcionPhenotype}</span>
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
                        <Link to="#" onClick={this.BorrarClick}><img height="32" src={Borrar} alt="Borrar"></img></Link>
                        <Link to="/Fenotipos" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { User: getUser(state) };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(deleteFenotipo);
  