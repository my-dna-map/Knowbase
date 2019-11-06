import React, { Component } from 'react';
import styles from '../GrupoE/GrupoE.module.css';

export default class GenInfo extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { Genes: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/Genes/'+ this.props.match.params.IdGen)
    .then(res => res.json())
    .then((data) => {
      this.setState({ Genes: data ,loading:false })
    })
    .catch(error => {
        console.log(error.message);
      this.setState({Error: error.message, loading:false});
    });
  }

  render() {
    console.log(this.state.Genes);
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
        <h1>Detalles del Gen {this.state.Genes.NombreGen} V{this.state.Genes.MayorVersion}.{this.state.Genes.MinorVersion}</h1>
        <div className={styles.Contendor}>
        <div className={styles.Columna20}>
           {
             this.state.Genes.Paneles.map(Panel=>
              (
                <a href={"/Paneles/" + Panel.IdPanel }>
                  {Panel.NombrePanel + " V" + Panel.MayorVersion + "." + Panel.MinorVersion}
                </a>
             ))
           }

        </div>
        <div className={styles.Columna80}>
           <div className={styles.Contendor}>
             <div className={styles.Columna50}>
                <div className={styles.Columna20}>
                  <span>NM</span>
                </div>
                  <div className={styles.Columna80}>
                    <spam>{this.state.Genes.NM}</spam>
                  </div>
             </div> 
             <div className={styles.Columna50}>
                <div className={styles.Columna20}>
                  <span>OMIM Gen</span>
                </div>
                  <div className={styles.Columna80}>
                    <spam>{this.state.Genes.OMINGen}</spam>
                  </div>
             </div>
           </div>
           <div className={styles.Descripcion}>
           <div className={styles.Columna20}>
                  <span>Descripción</span>
                </div>
                  <div className={styles.Columna80}>
                    <span>{this.state.Genes.DescripcionGen}</span>
                  </div>
           </div>
        </div>
</div>

      </div>
    );
    }}
  }
}
