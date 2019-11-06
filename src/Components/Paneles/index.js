import React, { Component } from 'react';
import PanelC from '../Paneles/Panel';

export default class Paneles extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { PanelesD: [] ,loading:true, Error:""};
  }

  componentDidMount() {
    fetch( process.env.REACT_APP_API_URL +'/paneles')
    .then(res => res.json())
    .then((data) => {
      this.setState({ PanelesD: data ,loading:false })
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
        return  <div>Hubo un problema para recuperar los Paneles</div>
      else{
    return (
      <div> 
        <h1>Paneles</h1>     
        {this.state.PanelesD.map((Panel) => (
          <PanelC key={Panel.IdPanel} panel={Panel} Version={true}></PanelC>
          
        ))}
      </div>
    );
    }}
  }
}
