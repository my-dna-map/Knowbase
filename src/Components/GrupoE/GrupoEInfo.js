import React, { Component } from 'react';
import EnfermedadC from '../Enfermedades/EnfermedadC';
import styles from './GrupoE.module.css';
import PanelC from '../Paneles/Panel';

export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { GrupoED: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/GrupoE/'+ this.props.match.params.IdGrupoE)
    .then(res => res.json())
    .then((data) => {
      this.setState({ GrupoED: data ,loading:false })
    })
    .catch(error => {
        console.log(error.message);
      this.setState({Error: error.message, loading:false});
    });
  }

  render() {

    if(this.state.loading)
    {
      return  <div>Waiting....</div>
    }
    else{
      if(this.state.Error !== "")
        return  <div>Hubo un problema para recuperar los Paneles</div>
      else{
          console.log(this.state.GrupoED);
    return (
      <div> 
        <h1>Detalles del grupo {this.state.GrupoED.NombreGrupoE} V{this.state.GrupoED.MayorVersion}.{this.state.GrupoED.MinorVersion}</h1>
        <div className={styles.Contendor}>
        <div className={styles.Columna20}>
            <h3>Paneles Asociados</h3>
            {this.state.GrupoED.Paneles.map((Panel) => (
          <PanelC key={Panel.IdPanel} panel={Panel} Version={false}></PanelC>
          
        ))}

        </div>
        <div className={styles.Columna80}>
{
     
       
    this.state.GrupoED.Enfermedades.map((Enfermedad) => (
      <EnfermedadC Enfermedad={Enfermedad}></EnfermedadC>
     
))
}
        </div><div className={styles.Descripcion}>
          <div class={styles.Columna20}>
              <b><span>Descripción de la enfermedad y epidemiología</span></b>
          </div>
          <div class={styles.Columna80}>
            <p>{this.state.GrupoED.DescripcionGrupoE}</p>
          </div>
        </div>  
</div>

      </div>
    );
    }}
  }
}
