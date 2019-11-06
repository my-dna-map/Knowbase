import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Paneles from '../Paneles';
import PanelInfo from '../Paneles/PanelInfo';
import GrupoE from '../GrupoE';
import GrupoEInfo from '../GrupoE/GrupoEInfo';
import Enfermedades from '../Enfermedades/';
import EnfermedadInfo from '../Enfermedades/EnfermedadInfo';
import Genes from '../Genes';
import Fenotipos from '../Fenotipos/';
import FenotipoInfo from '../Fenotipos/FenotipoInfo';

import GenInfo from '../Genes/GenInfo';


export default class Menu extends Component {
  render() {
    return (
        <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Paneles</Link>
              </li>
              <li>
                <Link to="/Grupoe">Grupo Enfermedades</Link>
              </li>
              <li>
                <Link to="/Enfermedades">Enfermedades</Link>
              </li>
              <li>
                <Link to="/Fenotipos">Fenotipos</Link>
              </li>
              <li>
                <Link to="/Genes">Genes</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          <Route exact path="/" component={Paneles} />
          <Route exact path="/Paneles" component={Paneles}/>
          <Route exact path="/Paneles/:IdPanel" component={PanelInfo}/>
          <Route exact path="/GrupoE" component={GrupoE}/>
          <Route exact path="/GrupoE/:IdGrupoE" component={GrupoEInfo}/>
          <Route exact path="/Enfermedades" component={Enfermedades}/>
          <Route exact path="/Enfermedades/:IdEnfermedad" component={EnfermedadInfo}/>
          <Route exact path="/Genes" component={Genes}/>
          <Route exact path="/Genes/:IdGen" component={GenInfo}/>
          <Route exact path="/Fenotipos" component={Fenotipos}/>
          <Route exact path="/Fenotipos/:IdPhenotype" component={FenotipoInfo}/>
          </Switch>
          
        </div>
      </Router>
    );
  }
}
