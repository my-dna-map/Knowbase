import React, { Component } from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";

import styles from './Menu.module.css';
import login from '../singin/login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from '../Landing';
import Singout from '../singout';


//Importamos los componentes de los Grupos de Enfermedades
import GrupoE from '../GrupoE';
import GrupoEInfo from '../GrupoE/GrupoEInfo';
import createGrupoE from '../GrupoE/create';
import deleteGrupoE from '../GrupoE/delete';
import editGrupoE from '../GrupoE/edit';

//Importamos los componentes de las enfermedades
import Enfermedades from '../Enfermedades/';
import EnfermedadInfo from '../Enfermedades/EnfermedadInfo';
import createEnfermedad from '../Enfermedades/create';
import deleteEnfermedad from '../Enfermedades/delete';
import editEnfermedad from '../Enfermedades/edit';

//Importamos los componentes de Fenotipos
import Fenotipos from '../Fenotipos/';
import FenotipoInfo from '../Fenotipos/FenotipoInfo';
import createFenotipo from '../Fenotipos/create';
import deleteFenotipo from '../Fenotipos/delete';
import editFenotipo from '../Fenotipos/edit';

//importamos los compoentes de Paneles
import Paneles from '../Paneles';
import PanelInfo from '../Paneles/PanelInfo';
import createPanel from '../Paneles/create';
import editPanel from '../Paneles/edit';
import deletePanel from '../Paneles/delete';

//Importamos los componentes de Genes
import GenInfo from '../Genes/GenInfo';
import createGen from '../Genes/create';
import deleteGen from '../Genes/delete';
import editGen from '../Genes/edit';
import Genes from '../Genes';






export default class Menu extends Component {
 

  render() {
    return (
      <div>
        <Router>
        <div>
          <nav>
            <ul className={styles.Padre}>
              <li className={styles.Hijo}>
                <Link className={styles.Nieto} to="/">Paneles</Link>
              </li>
              <li className={styles.Hijo}>
                <Link  className={styles.Nieto} to="/Grupoe">Grupo Enfermedades</Link>
              </li>
              <li className={styles.Hijo}>
                <Link className={styles.Nieto} to="/Enfermedades">Enfermedades</Link>
              </li>
              <li className={styles.Hijo}>
                <Link className={styles.Nieto} to="/Fenotipos">Fenotipos</Link>
              </li>
              <li className={styles.Hijo}>
                <Link className={styles.Nieto} to="/Genes">Genes</Link>
              </li>
             
              
            </ul>
            <Singout history={this.props.history}></Singout>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            {/*Compoentenes de Autenticacion */}
          <Route exact path="/Login" component={login}/>
          <Route exact path="/Logout" component={Singout}/>
          <Route exact path="/Landing" component={Landing}/>


          <Route exact path="/" component={Paneles} />
          {/*Compoentenes de Paneles */}
          <Route exact path="/Paneles" component={Paneles}/>
          <Route exact path="/Paneles/Create" component={createPanel}/>
          <Route exact path="/Paneles/Edit/:IdPanel" component={editPanel}/>
          <Route exact path="/Paneles/Delete/:IdPanel" component={deletePanel}/>
          <Route exact path="/Paneles/:IdPanel" component={PanelInfo}/>
          {/*Compoentenes de Grupoe de Enfermedades */}
          <Route exact path="/GrupoE" component={GrupoE}/>
          <Route exact path="/GrupoE/Create" component={createGrupoE}/>
          <Route exact path="/GrupoE/Delete/:IdGrupoE" component={deleteGrupoE}/>
          <Route exact path="/GrupoE/Edit/:IdGrupoE" component={editGrupoE}/>
          <Route exact path="/GrupoE/:IdGrupoE" component={GrupoEInfo}/>
          {/*Compoentenes de Enfermedades */}
          <Route exact path="/Enfermedades" component={Enfermedades}/>
          <Route exact path="/Enfermedades/Create" component={createEnfermedad}/>
          <Route exact path="/Enfermedades/Delete/:IdEnfermedad" component={deleteEnfermedad}/>
          <Route exact path="/Enfermedades/Edit/:IdEnfermedad" component={editEnfermedad}/>
          <Route exact path="/Enfermedades/:IdEnfermedad" component={EnfermedadInfo}/>
          {/*Compoentenes de Genes */}
          <Route exact path="/Genes" component={Genes}/>
          <Route exact path="/Genes/Create" component={createGen}/>
          <Route exact path="/Genes/Delete/:IdGen" component={deleteGen}/>
          <Route exact path="/Genes/Edit/:IdGen" component={editGen}/>
          <Route exact path="/Genes/:IdGen" component={GenInfo}/>
          {/*Compoentenes de Fenotipos */}
          <Route exact path="/Fenotipos" component={Fenotipos}/>
          <Route exact path="/Fenotipos/Create" component={createFenotipo}/>
          <Route exact path="/Fenotipos/Delete/:IdPhenotype" component={deleteFenotipo}/>
          <Route exact path="/Fenotipos/Edit/:IdPhenotype" component={editFenotipo}/>
          <Route exact path="/Fenotipos/:IdPhenotype" component={FenotipoInfo}/>
          </Switch>
          
        </div>
      </Router>
        <ToastContainer
        position="bottom-center"
        autoClose={8000}
        newestOnTop
        closeOnClick
        rtl
        pauseOnVisibilityChange
        draggable
        />
        </div>
    );
  }
}
