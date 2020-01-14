import React, { Component } from 'react';
import Loader from '../Loader';
import Styles from '../Styles/Forms.module.css';
import Consultas from "../../Helpers/consultas";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import Back from '../../Imagenes/back.png';
import Edit from '../../Imagenes/Edit.png';
import Delete from '../../Imagenes/delete.png';
import Auth from '../../Helpers/Graphs';
import TextField from '@material-ui/core/TextField';
import Informacion from '../Controles/Informacion';
import VarianteRO from '../Variantes/VarianteRO';
import RelacionERO from '../Relaciones/RelacionGRO';



export default class GenInfo extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Genes: [] ,
                  loading:true, 
                  Error:"",
                  IsBio : false};
  }

  componentDidMount() {

    Auth.isBio().then(res =>{ this.setState({IsBio: res})})

    Consultas.Get('/Genes/'+ this.props.match.params.IdGen).then(data=> this.setState({Item: data,loading:false,Variantes: data.Variantes,Relaciones: data.Data[0]}));
  }


  render() {
    if(this.state.loading)
    {
      return  <Loader></Loader>
    }
    else{
      if(this.state.Error !== "")
        return  <div>Hubo un problema para recuperar los Genes</div>
      else{
        let isBio = this.state.IsBio; 
        console.log(this.state.Item)
        console.log(this.state.Variantes)
    return (
      
      <div> 

             <div>
              <h2>Detalles del Gen {this.state.Item.NombreGen} </h2> 
               <Link to="/Genes" tootltip="Listado de Genes"><img src={Back} alt="Back"></img></Link>
               {
                 isBio ? <Link to={"/Genes/Edit/" + this.state.Item.IdGen}><img src={Edit} alt="Edit"></img></Link> :''
               }
               {
                 isBio ?<Link to={"/Genes/Delete/" + this.state.Item.IdGen}><img src={Delete} alt="Delete"></img></Link>:''
               }
              
              <div className={Styles.SuperContenedor}>
            <div className={Styles.Contenedor}>
                    <div className={Styles.DatosGrandesBis}>
                        <TextField
                        label="Nombre del Gen"
                        name="NombreGen"
                        fullWidth
                        onChange={this.onChange}
                        margin="normal"
                        readOnly
                        value= {this.state.Item.NombreGen}
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
                        readOnly
                        value= {this.state.Item.OMIMGen}
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
                        readOnly
                        value= {this.state.Item.NM}
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
                        readOnly
                        value= {this.state.Item.DescripcionGen}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        />
                    </div>
                </div>
            </div>
            <div>
              <h1>Variantes</h1>
            </div>
            {this.state.Variantes.map((Variante) => (
              <VarianteRO key={Variante.IdVariante} Value={Variante}></VarianteRO>
            
            
            ))}

            <div>
              <h1>Relaciones</h1>
            </div>
            {this.state.Relaciones.map((Relacion) => (
              <RelacionERO key={Relacion.IdRelacion} Value={Relacion}></RelacionERO>
            
            
            ))}

                <Informacion Informacion={this.state.Item}></Informacion>
                
            </div>

       

      </div>
    );
    }}
  }
}
