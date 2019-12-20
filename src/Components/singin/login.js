import React, { Component } from 'react'
import style from "../../styles/firebase.module.css";
import Logo from '../Logo';
import { toast} from "react-toastify";
import { setUser } from "../../Store/User/action";
import { connect } from "react-redux";
  

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
  };

 class login extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          contador: 0,
          ...INITIAL_STATE
        };
      }
      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      onSubmit = event => {
        this.setState({ loading: "true" });
        event.preventDefault();
        let body = {
            username: this.state.email,
            password: this.state.password
        }
        
        fetch(process.env.REACT_APP_API_URL + "/login/", {
            method: "Post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          })
            .then(function(response) {
              return response.json();
            })
            .then(
              data=> {
              //  console.log(data);
               this.props.setUser(data);
               this.props.history.push('/');
              }
            )
  
            .catch(error=> {
              this.setState({ loading: false });
              toast.error("Usted no esta autorizado para ingresar a esta pagina", {
                position: toast.POSITION.BOTTOM_CENTER
              });
            });
      

      }
    render() {
        const { email, password } = this.state;
        const isInvalid = password === "" || email === "";
        return (
            <div className={style.Container}>
            <form onSubmit={this.onSubmit}>
              <div className={style.LoginCotainer}>
                <Logo />
  
                <input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="E-mail"
                />
  
                <input
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Contraseña"
                />
                <input type="submit" disabled={isInvalid} value="Acceder" />
              </div>
            </form>
           
          </div>
        )
    }
}

export default connect(
    null,
    {  setUser }
  )(login);
  