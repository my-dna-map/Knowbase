import { connect } from "react-redux";
import { getUser } from "../Store/User/reducer";
import store from '../Store';

const debug = false;


class Auth {
   

    static async  isBio(Token){
      

        if(store.getState().userReducer.user.access_token === undefined)
        { 
          return   Promise.resolve(false)    }
        else{
    
       
      return fetch(process.env.REACT_APP_API_URL + "/isbio/", {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
              "Authorization" : "Bearer " + store.getState().userReducer.user.access_token
          }
        })
        .then(async response => {
            if (response.status !== 200) {
             // throw new Error('Login response not valid')
              return false;
            }
            return response.json();
          })
          .then(
            data=> {
             return data;
            }
          )
  
          .catch(error=> {

            return error;
          });

    
    }}
}

  const mapStateToProps = (state, ownProps) => {
    return { User: getUser(state) };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(Auth);