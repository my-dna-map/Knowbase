import React, { Component } from 'react'
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import { setUser } from "../../Store/User/action";
import Styles from './SingOut.module.css';
import {withRouter} from 'react-router-dom';



 class SingOut extends Component {
    constructor(props) {
        super(props);
      
        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        this.props.setUser('');
        //console.log(this.props);
        this.props.history.push('/');

      }
    render() {
        const isLogin = this.props.User !== '';
        return (
            <div className={Styles.Fondo}>
                {
                    isLogin?                  
                        <div>{this.props.User.Name} <br/>
                             <button onClick={this.handleClick}>
      Logout
    </button>
                        </div>
                   :
                        <div><a href="/Login">Login</a></div>
                    
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { User: getUser(state) };
  };
  
  export default withRouter( connect(
    mapStateToProps,
    {setUser}
  )(SingOut));
  