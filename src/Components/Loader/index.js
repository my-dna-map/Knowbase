import React, {
  PureComponent
} from "react";
import style from "../../styles/loader.module.css";

export default class Loader extends PureComponent {
  render() {
    return ( <section className = {style.mdmcontainer} >
        <div className = {style.mdmloadercontainer} >
          <span> </span> 
          <span> </span > 
          <span> </span> 
          <span> </span > 
          <span> </span> 
          <span> </span> 
        </div> 
      </section >
    );
  }
}