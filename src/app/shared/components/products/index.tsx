import React, { Component } from 'react';
import { compose } from "recompose";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withRouter, Redirect } from "react-router-dom";
class Products extends Component<any,any> {

  render() {
const products = this.props.userSettings.blocks ? this.props.userSettings.blocks.map(function(item){
       
             if(item.type=="header-one"){
               return <div className="headertitle">{item.text}</div>
             } else if(item.type=="unstyled" && item.text!=""){
                return <div className="description">{item.text}</div>
             }
}):"no products";

    return <div className="products_list">{products}</div>;
  }
}
const mapStateToProps = (state: AppState) => ({
    loggedIn: state.authentication.loggedIn,
    userSettings: state.userSettings
  });
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       getUserProfileSetings: (json) => {
//         dispatch(submitUserProfileSettings(json));
//       },
//     };
//   };
  
  export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Products);