import React, { Component } from 'react';

export default class Panel extends Component{
  render() {
    return (
      <div > <a href={ '/Paneles/' +this.props.panel.IdPanel} > {this.props.panel.NombrePanel} { (this.props.Version)? this.props.panel.MayorVersion +"." +this.props.panel.MinorVersion: ""}</a></div>
    );
  }
}
