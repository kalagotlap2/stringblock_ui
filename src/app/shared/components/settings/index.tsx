import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withRouter, Redirect } from "react-router-dom";
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Button from '@material-ui/core/Button';
import { compose } from "recompose";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { submitUserProfileSettings } from "../../actions/userconfig.actions";


const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

const myTheme = createTheme({});
class Settings extends Component <any, any>{
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }
  onContentStateChange: Function = (contentState) => {
    this.setState({
      contentState,
    });
    console.log(this.state.contentState);
  };
  render() { 
    const { contentState } = this.state;
  return (
    <div>
    <div className="settings_content">
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={this.onContentStateChange}
      />
    
    </div>
    <Button onClick={()=>{this.props.getUserProfileSetings(contentState)}}>submit</Button>
    </div>
  );
  }
}
const mapStateToProps = (state: AppState) => ({
  loggedIn: state.authentication.loggedIn,
  userSettings: state.userSettings
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfileSetings: (json) => {
      dispatch(submitUserProfileSettings(json));
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Settings);