import React, { Component } from 'react';

export default class Genes extends Component {
  render() {
    if(this.props.Genes.length > 0){
    return (
      <div> 
            {   
                this.props.Genes.map((Gen) => (
                <div><a href={"/Genes/" + Gen.IdGen }>{ Genes.NombreGen}</a></div>
          
        ))}
      </div>
    );
    }
    else
        return <div><span>No tenemos registrada ningun Gen</span></div>
  }
}
