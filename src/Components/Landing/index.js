import React, { Component } from 'react'
import { connect } from "react-redux";
import { getUser } from "../../Store/User/reducer";
import Auth from '../../Helpers/Graphs';

 class Landing extends Component {
    componentDidMount() {


        if (this.props.User === "") {
          this.props.history.push('/');
        }
       // console.log(this.props.User);
       Auth.isBio().then(isbio =>
        {
          if(!isbio)
          this.props.history.push('/');
        console.log(isbio)
      });
      //  console.log(Auth.isBio());
      }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.User)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { User: getUser(state) };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(Landing);
  