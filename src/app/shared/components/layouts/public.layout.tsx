import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
} from "react";
import { withRouter, Redirect } from "react-router-dom";
import PublicNavbar from "../navBar";
import Footer from "../footer";
import { compose } from "recompose";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { configConstants } from "../../constants/configs.constants";
import { getConfigs } from "../../actions/userconfig.actions";

class PublicLayout extends React.Component<any> {
  constructor(props){
    super(props);
   
  }
  componentDidMount() {
    this.props.getUserConfigs();
  
  }
  render() {
  
    return (
      <div>
        { (Object.keys(this.props.configs).length !== 0) && 
          <PublicNavbar configs={this.props.configs === "dark" ? true : false} ></PublicNavbar>  }
          <Footer />
      
       
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  loggedIn: state.authentication.loggedIn,
  configs:  state.configs
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserConfigs: () => {
      dispatch(getConfigs());
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PublicLayout);
