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
import VarianteRW from '../Variantes/VarianteRW';
import Add from '../../Imagenes/add.png';

const Variante =
{"IdGen":0, "cDNA": "", "Proteina": "", "IdSNV": "","Clasif":"","PMID":"","Descripcion":"","New": true, "Update":false}

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
      Publish:false,
      Variantes: []
    };
    this.CancelClick = this.CancelClick.bind(this);
    this.BorrarClick = this.BorrarClick.bind(this);
  }

  
  addVariante = e =>{
    console.log("me apretaron");
    Variante.IdGen = this.props.match.params.IdGen;
    Variante.Usuario = this.props.User.UserID;
    this.setState((prevState) => ({
      Variantes: [...prevState.Variantes, Variante],
    }));
     
  }

  CancelClick(e){
    e.preventDefault();
    this.props.history.push('/Genes');
  }
  BorrarClick(e){
    e.preventDefault();
    
   // console.log('Borrar ' +this.props.match.params.IdGen);
   Consultas.Put(this.state,'/Genes/'+ this.props.match.params.IdGen).then(e=>
     {
       let Variantes = this.state.Variantes;
      Object.keys(Variantes).forEach(function(key) {
            
        if(Variantes[key].New === true)
        {
           
            Consultas.Post(Variantes[key], '/Variantes')
        }
        if(Variantes[key].Update === true)
          Consultas.Put(Variantes[key], '/Variantes/'+ Variantes[key].IdVariante) 
        });
      this.props.history.push('/Genes')}
     ).catch(err => console.log(err));
  }

  onChange = e => {
      
    //this.setState({ [event.target.name]: event.target.value });
    this.setState({
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };

  Dinamic = e=> {
     
    let Variantes = [...this.state.Variantes]
    let Rel = Variantes[e.target.id.split('-')[0]];
    
    Rel[e.target.name] = e.target.value;
   
    
    if(Variantes[e.target.id.split('-')[0]].New !== true)
      Variantes[e.target.id.split('-')[0]].Update = true;
    this.setState({Variantes})
 }

 componentDidMount() { 
    Auth.isBio().then(res =>{ 

        if(!res)
        this.props.history.push('/');
        
     })
     Consultas.Get('/Genes/'+ this.props.match.params.IdGen)
     .then(data=> {
      let variant = []
      let UserID = this.props.User.UserID;
      Object.keys(data.Variantes).forEach(function(key) {
            variant.push({...data.Variantes[key],"Update": false, "New": false, "Usuario":  UserID, "Publish": false });
    });
 
       this.setState({Item: data,Loading: false,NombreGen: data.NombreGen,OMIMGen: data.OMIMGen,NM: data.NM,DescripcionGen: data.DescripcionGen,Variantes: variant})});
    this.setState({Usuario: this.props.User.UserID});
}
  render() {
    let {Variantes} = this.state;
    
    //const isInvalid = NombreGen === "" || OMIMGen === "" || NM === "" ;
    if(this.state.Loading)
    return <div><Loading></Loading></div>
    else
    return (
      <div>
      <h2>Edición del Gen {this.state.NombreGen } </h2>
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
            <div  className={Styles.SuperContenedor} onChange={this.Dinamic} >
                  <h2>Variantes</h2> <Link to="#" onClick={this.addVariante}><img src={Add} alt="Agregar"/></Link>
            {Variantes.map((Variante,idex) => (
              
              <VarianteRW key={idex} Index={idex} Value={Variante}></VarianteRW>
            
            
            ))}
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
