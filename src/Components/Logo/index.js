import React, { PureComponent } from "react";
import url from "../../Imagenes/Logo.svg";
import styles from "../../styles/firebase.module.css";

export default class Logo extends PureComponent {
  render() {
    return (
      <div className={styles.Imagen}>
        <img alt="Logo" className={styles.Logo} src={url} />
      </div>
    );
  }
}
