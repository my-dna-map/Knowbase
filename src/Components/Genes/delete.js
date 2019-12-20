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

 class deleteGen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          Loading : true,
          Item : {},
          Usuario: 0
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
       let ObSend = { "Usuario": this.state.Usuario};
       Consultas.Delete(ObSend,'/Genes/'+ this.props.match.params.IdGen).then(this.props.history.push('/Genes')).catch(err => console.log(err));
      }
    componentWillMount(){
        Auth.isBio().then(res =>{ 

            if(!res)
            this.props.history.push('/');
            else
              this.setState({Loading:false});
         })
         Consultas.Get('/Genes/'+ this.props.match.params.IdGen).then(data=> this.setState({Item: data}));
         this.setState({Usuario: this.props.User.UserID});
    }

    render() {
        let d = new Date(this.state.Item.Created);
        let d1 = new Date(this.state.Item.Modified);
        if(this.state.Loading)
        return <div><Loading></Loading></div>
        else
        return (
            <div>
                <h2>¿Estas Seguro que quieres borrar el Gen {this.state.Item.NombreGen }? </h2>
                <div className={Styles.SuperContenedor}>
                    <div className={Styles.Contenedor}>
                        <div className={Styles.Datos}>
                            <span className={Styles.Titulo}>OMIMGen</span><br/>
                            <span className={Styles.Dato}>{this.state.Item.OMIMGen}</span>
                        </div>
                    
                        
                        <div className={Styles.Datos}>
                            <span className={Styles.Titulo}>NM</span><br/>
                            <span className={Styles.Dato}>{this.state.Item.NM}</span>
                        </div>
                        <div className={Styles.Datos}>
                            <span className={Styles.Titulo}>Version</span><br/>
                            <span className={Styles.Dato}>V{this.state.Item.MayorVersion}.{this.state.Item.MinorVersion}</span>
                        </div>
                    </div>
                    <div className={Styles.Contenedor}>
                    <div className={Styles.DatosGrandes}>
                            <span className={Styles.Titulo}>Descripción</span><br/>
                            <span className={Styles.Dato}>{this.state.Item.DescripcionGen}</span>
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
                        <Link to="/Genes" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
                        
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
  )(deleteGen);
  