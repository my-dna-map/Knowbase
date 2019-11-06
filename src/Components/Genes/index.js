import React, { Component } from 'react';
import GenItem from './item';
import styles from '../GrupoE/GrupoE.module.css';

export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Genes: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/Genes')
    .then(res => res.json())
    .then((data) => {
      this.setState({ Genes: data ,loading:false })
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
        return  <div>Hubo un problema para recuperar los Genes</div>
      else{
    return (
      <div> 
        <h1>Genes</h1>     
        <div className={styles.Contendor}>
            {this.state.Genes.map((Gen) => (
            <GenItem key={Gen.IdGen} Gen={Gen}></GenItem>
            
            ))}
        </div>
      </div>
    );
    }}
  }
}
