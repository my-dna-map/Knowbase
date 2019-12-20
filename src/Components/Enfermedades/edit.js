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
import Add from '../../Imagenes/add.png';
import RelacionE from '../Relaciones/RelacionE';
import Informacion from '../Controles/Informacion'





const INITIAL_STATE = {
  NombreEnfermedad: "",
  
    Usuario: 0,
    error: "",
    IdGrupoE: 0
  };

  const Relacion =
    {"IdEnfermedad":0, "IdGen": 0, "IdPhenotype": 0, "Inheritance": "", "Phenotype":"","Estado":"","IdRelacion":0,"New": true, "Update":false}
  

 class editEnfermedad extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      Loading : true,
      GrupoE : [],
      Genes: [],
      Fenotipos: [],
      Paneles: [],
      Item:{},
      Panel: "",
      Version: "",
      IdPanel:0,
      Relaciones: [{"IdEnfermedad":0, "IdGen": 0, "IdPhenotype": 0, "Inheritance": "", "Phenotype":"","Estado":"","IdRelacion":0,"New": "true","IdPanelVer":0,"Usuario":0}]
    };
    this.handler = this.handler.bind(this)
    this.handlers = this.handlers.bind(this)
  }

  
  AddRelaciones = e =>{
    Relacion.IdEnfermedad = this.props.match.params.IdEnfermedad;
    Relacion.NombrePanel = this.state.Panel;
    Relacion.Version = this.state.Version;
    Relacion.IdPanelVer = this.state.IdPanelVer;
    Relacion.IdPanel = this.state.IdPanel;
    Relacion.Usuario = this.props.User.UserID;
    this.setState((prevState) => ({
      Relaciones: [...prevState.Relaciones, Relacion],
    }));
     
  }

  Dinamic = e=> {
     
     let Relaciones = [...this.state.Relaciones]
     let Rel = Relaciones[e.target.id.split('-')[0]];
     Rel[e.target.name] = e.target.value;
    
     
     if(Relaciones[e.target.id.split('-')[0]].New !== true)
         Relaciones[e.target.id.split('-')[0]].Update = true;
     this.setState({Relaciones})
  }
  onChange = e => {
      
    //this.setState({ [event.target.name]: event.target.value });
    this.setState({
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };

  handlers = (e,newValue)=>{
    
    let indice = e.target.name.split('-')[0];
    let nombre = e.target.name.split('-')[1];
    let Relaciones = [...this.state.Relaciones]
    Relaciones[indice][nombre] = e.target.value;
    this.setState({Relaciones})
  }

  handler = (e, newValue) => {
    this.forceUpdate();
   
   if(newValue !== null)
   {
    let indice = e.target.id.split('-')[0];
    let nombre = e.target.id.split('-')[1]
    let Relaciones = [...this.state.Relaciones]
    Relaciones[indice][nombre] = newValue[nombre];
    this.setState({Relaciones})
     
   }
   /* if(newValue !== null)
        this.props.Value.IdGen =  newValue.IdGen
    else
        this.props.Value.IdGen =  0*/
   
  
}

  componentDidMount(){
   Auth.isBio().then(res =>{ 

        if(!res)
        this.props.history.push('/');
        else{
          Consultas.Get('/GrupoE').then(data => {this.setState({GrupoE:data})
            Consultas.Get('/Fenotipos').then(data => {this.setState({Fenotipos:data})
              Consultas.Get('/Paneles').then(data => {this.setState({Paneles:data})})
                Consultas.Get('/Genes').then(data => {this.setState({Genes:data})
                  Consultas.Get('/Enfermedades/'+ this.props.match.params.IdEnfermedad)
                    .then(data => {
                      let real = []
                      let UserID = this.props.User.UserID;
                      Object.keys(data.Data).forEach(function(key) {
                        real.push({...data.Data[key],"Update": false, "New": false, "Usuario":  UserID, "Publish": false });
                    });
                      this.setState({NombreEnfermedad: data.NombreEnfermedad,IdGrupoE: data.IdGrupoE,Item: data,texto: data.DescripcionGrupoE,Loading:false,Relaciones:real});
                      real.forEach(Relacion => {
                        if(Relacion.Activo === 1)
                        this.setState({Panel: Relacion.NombrePanel,Version: Relacion.Version, IdPanel: Relacion.IdPanel, IdPanelVer: Relacion.IdPanelVer})
                      });
                })
              })
            })
          });
        }
       
      
    })
    this.setState({Usuario: this.props.User.UserID});
    
}
onSubmit= event =>{
  let Obenviar = {
    NombreEnfermedad : this.state.NombreEnfermedad,
    IdGrupoE: this.state.IdGrupoE,
    Usuario: this.state.Usuario,
    Publish: false
  }
  this.setState({ Loading: true });
  event.preventDefault();
  Consultas.Put(Obenviar,'/Enfermedades/' + this.props.match.params.IdEnfermedad)
        .then(rest =>{
          
          let Relaciones = this.state.Relaciones
          Object.keys(Relaciones).forEach(function(key) {
            
              if(Relaciones[key].New === true)
              {
                 
                  Consultas.Post(Relaciones[key], '/Relaciones')
              }
              if(Relaciones[key].Update === true)
                Consultas.Put(Relaciones[key], '/Relaciones/'+ Relaciones[key].IdRelacion)
            //real.push({...data.Data[key],"Update": true, "New": false});
        });
           this.props.history.push('/Enfermedades');
          }).catch(err => console.log(err));

}
  render() {
    let {Relaciones} = this.state;
    if(this.state.Loading)
      return <Loading></Loading>
    else{
      
      return (
        <div> 
          <h2>Modificar la Enfermedad {this.state.NombreEnfermedad} </h2>  
          <Link to="#" onClick={this.onSubmit}><img height="32" src={Guardar} alt="Guardar"></img></Link>
          <Link to="/Enfermedades" ><img height="32" src={Cancelar} alt="Cancelar"></img></Link>
          <div className={Styles.SuperContenedor}>
            <div className={Styles.Contenedor}>
              <div className={Styles.DatosGrandesBis} style={{height:"310px"}}>
                <TextField
                  label="Nombre de la Enfermedad"
                  name="NombreEnfermedad"
                  fullWidth
                  variant="filled"
                  onChange={this.onChange}
                  value={this.state.NombreEnfermedad}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={Styles.DatosGrandesBis}>
                  <div style={{width:"100%",height:"70px"}}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={this.state.GrupoE}
                      getOptionLabel={option =>   option.NombreGrupoE}
                      style={{ width: 450, float:"left" }}
                      name="GrupoeID"
                      defaultValue={this.state.GrupoE[this.state.GrupoE.findIndex((e) => e.IdGrupoE === this.state.IdGrupoE)]}
                      onChange={(event, newValue) => {
                        if(newValue !== null)
                          this.setState({texto: newValue.DescripcionGrupoE,IdGrupoE:newValue.IdGrupoE})
                        else
                        this.setState({texto: ''})
                      }}
                      renderInput={params => (
                          <TextField {...params}  label="Nombre del grupo de Enfermedades"  fullWidth
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                              shrink: true,
                          }} />
                      )}
                    /><Link style={{marginTop:30, float:"left" }} to="/GrupoE/create"><img src={Add} alt="Agregar"/></Link>
                  </div>
                  <p style={{maxHeight: '250px',overflowY: "scroll",textAlign:"justify"}}>{this.state.texto}</p>
                </div>
                
              </div>
            </div>  
          <div >
        </div>
        <Informacion Informacion={this.state.Item}></Informacion>
        <h2>Relaciones</h2><Link to="#" onClick={this.AddRelaciones}><img src={Add} alt="Agregar"/></Link>
        <div  className={Styles.SuperContenedor} onChange={this.Dinamic} >
          {
            Relaciones.map((Relacion,idex)=>{
              return (
                <RelacionE Index={idex} key={idex} Value={Relacion} Fenotipos={this.state.Fenotipos} Genes={this.state.Genes} Relaciones={this.state.Relaciones} handler = {this.handler} handlers={this.handlers} ></RelacionE>
              )
            })
          }
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
)(editEnfermedad);