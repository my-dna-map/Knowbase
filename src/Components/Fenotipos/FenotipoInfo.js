import React, { Component } from 'react';
import Loader from '../Loader';
import Styles from '../Styles/Forms.module.css';
import Consultas from "../../Helpers/consultas";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import Back from '../../Imagenes/back.png';
import Edit from '../../Imagenes/Edit.png';
import Delete from '../../Imagenes/delete.png';
import Auth from '../../Helpers/Graphs';

export default class FenotipoInfo extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Enfermedades: [] ,loading:true, Error:"", Item:{}};
  }

  componentDidMount() {
    Auth.isBio().then(res =>{ this.setState({IsBio: res})})

    Consultas.Get('/Fenotipos/'+ this.props.match.params.IdPhenotype).then(data=> this.setState({Item: data,loading:false}));
  }

  render() {
    console.log(this.state.Item);
    if(this.state.loading)
    {
      return  <Loader></Loader>
    }
    else{
      if(this.state.Error !== "")
        return  <div>Hubo un problema para recuperar el Fenotipo</div>
      else{
        let d = new Date(this.state.Item.Created);
        let d1 = new Date(this.state.Item.Modified);
        let isBio = this.state.IsBio;
        console.log(isBio);
    return (
      <div> 

             <div>
              <h2>Detalles del Fenotipo {this.state.Item.OMIMPhenotype} </h2> 
               <Link to="/Fenotipos" tootltip="Listado de Fenotipos"><img src={Back} alt="Back"></img></Link>
               {
                 isBio ? <Link to={"/Fenotipos/Edit/" + this.state.Item.IdPhenotype}><img src={Edit} alt="Edit"></img></Link> :''
               }
               {
                 isBio ?<Link to={"/Fenotipos/Delete/" + this.state.Item.IdPhenotype}><img src={Delete} alt="Delete"></img></Link>:''
               }
              
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
                            <p className={Styles.DatoGrande}>{this.state.Item.DescripcionPhenotype}</p>
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
                <ReactTable
          data = {this.state.Item.Data}
          filterable
          noDataText="No tenemos información al respecto"
          columns={[
           
            {
              Header: "Datos del Panel",
              columns: [
                {
                  accessor: "Numero",
                  Cell: row => (
                    <a href={'/Paneles/' + row.value }><img alt="Gen" src={require('../../Imagenes/gen32.png')} /></a>
                    
                  ),
                  maxWidth:40
                },
                {
                  Header: "Panel",
                  accessor: "NombrePanel",
                  maxWidth: 200
                 
                },
                {
                  Header: "Version",
                  id: "Version",
                  accessor: "Version",
                  maxWidth: 200
                }
              ]
            },
            {
              Header: "Datos del Gen",
              columns: [
                {
                  Header: "OMIM Gen",
                  accessor: "OMIMGen",
                  maxWidth: 200
                },
                {
                  Header: "Nombre Gen",
                  accessor: "NombreGen",
                  maxWidth: 200
                },
                {
                  Header: "Inheritance",
                  accessor: "Inheritance",
                  maxWidth: 200
                }
              ]
            },
            {
              Header: "Enfermedades",
              columns: [
                {
                  Header: "Nombre",
                  accessor: "NombreEnfermedad"
                }
              ]
            },
            {
              Header: "Estado",
              columns: [
                {
                  Header: "Estado",
                  accessor: "Estado",
                  maxWidth: 200
                }
              ]
            }
          ]}
         debug="true"
          defaultPageSize={5}
          style={{
            height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
          SubComponent={row => { return (
            <div style={{ padding: "20px" }}>
            {row.original.DescripcionGrupoE}
            </div>)
          }}
        />
               
            </div>

       

      </div>
  
    );
    }}
  }
}
