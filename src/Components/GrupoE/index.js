import React, { Component } from 'react';
import GrupoEItem from './Item';
import styles from './GrupoE.module.css';

export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { GrupoED: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/GrupoE')
    .then(res => res.json())
    .then((data) => {
      this.setState({ GrupoED: data ,loading:false })
    })
    .catch(error => {
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
        return  <div>Hubo un problema para recuperar los Grupos de Enfermedades</div>
      else{
    return (
      <div> 
        <h1>Grupos de Enfermedades</h1>     
        <div className={styles.Contendor}>
            {this.state.GrupoED.map((GrupoE) => (
            <GrupoEItem key={GrupoE.IdGrupoE} GrupoE={GrupoE}></GrupoEItem>
            
            ))}
        </div>
      </div>
    );
    }}
  }
}
