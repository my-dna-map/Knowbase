import React, { Component } from 'react';
import  './modal.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Loader from '../Loader';
import Informacion from '../Controles/Informacion';


export default class PanelInfo extends Component {
    
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { PanelesD: [] ,loading:true, error : "", filtro:"",Item:{}};
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL +  '/paneles/' + this.props.match.params.IdPanel )
    .then(res => res.json())
    .then((data) => {
      this.setState({ PanelesD: data ,loading:false,Item: data})
    })
    .catch(error => {
      this.setState({Error: error.message, loading:false});
    });
  }
  render() {
    
    

    if(this.state.loading)
    return <Loader></Loader>
    else{
      if(this.state.PanelesD.Error === "No hay Datos"){

        return  ( <div><h2>No hay Datos relacionados con este Panel</h2></div>);
      }
      else
      {
              
    return (
      <div>
          <h1>Detalles del panel {this.state.PanelesD.NombrePanel} V{this.state.PanelesD.MayorVersion}.{this.state.PanelesD.MinorVersion}</h1>

          <Informacion Informacion={this.state.Item}></Informacion>
          <ReactTable
          data={this.state.PanelesD.Data}
          filterable
          noDataText="No tenemos información al respecto"
          columns={[
           
            {
              Header: "Datos del Gen",
              columns: [
                {
                  accessor: "Numero",
                  Cell: row => (
                    <a href={'/Genes/' + row.value }><img alt="Gen" src={require('../../Imagenes/gen32.png')} /></a>
                    
                  ),
                  maxWidth:40
                },
                {
                  Header: "Gen",
                  accessor: "NombreGen",
                  value: "IdGen",
                  id:"IdGen",
                  maxWidth: 200
                 
                },
                {
                  Header: "OMIM Gen",
                  id: "OMIMGen",
                  accessor: d => d.OMIMGen,
                  maxWidth: 200
                }
              ]
            },
            {
              Header: "Datos del Phenotype",
              columns: [
                {
                  Header: "OMIM Phenotype",
                  accessor: "OMIMPhenotype",
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
                  accessor: "Enfermeddad"
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
          defaultPageSize={40}
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
    );
        
        }
  }}
}
