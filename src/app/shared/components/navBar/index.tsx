
import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useState,
  useEffect,
} from "react";

import { Route, Switch,useHistory } from "react-router-dom";
import Products from "../products";
import Settings from "../settings";
import Balance from '../balance';
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  Toolbar,
  Typography,
  ThemeOptions,
  Box,
  IconButton,
} from "@material-ui/core";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter, Link } from "react-router-dom";
import { AppState } from "../../store";
import { IPublicNavBar } from "../interfaces";
import { muiStyles } from "../../styles/mui.styles";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { ContentCopy } from "@mui/icons-material";

const socialIcons = [
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Facebook</title>
        <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
      </svg>
    ),
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Twitter</title>
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
      </svg>
    ),
    label: "Twitter",
    href: "https://www.twitter.com/",
  },
  {
    icon: (
      <svg
        width="24px"
        role="img"
        height="24px"
        viewBox="0 0 71 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="71" height="55" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    label: "Discord",
    href: "",
  },
];

const PublicNavbar = (
  props: PropsWithChildren<any>
): ReactElement<FunctionComponent<any>> => {


 
  const {
    window,
    classes,
    theme,
    children,
  } = props;

  const [mobileOpen, setMobileOpen] = React.useState<boolean | null>(false);

    const [appliedTheme, setAppliedTheme] = React.useState<boolean>(props.configs);
    useEffect(function(){
      setAppliedTheme(props.configs);
      
    },[]);
     const themename = appliedTheme ? "dark" : "bright";
  


 
 
  
  const applyTheme = () =>
    muiStyles.getMuiTheme(
      appliedTheme
        ? (muiStyles.darkTheme as ThemeOptions)
        : (muiStyles.lightTheme as ThemeOptions)
    );
   

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const drawer: JSX.Element = null;
  const container =
    window !== undefined ? () => window.document.body : undefined;
   
  return (
    <MuiThemeProvider theme={applyTheme()}>
      <div className={themename}>
        <CssBaseline />
        <div className="header_info">
          {/* <h1>test{JSON.stringify(props.loggedIn)}</h1> */}
          <Toolbar>
            <Typography variant="h5">StringBlock</Typography>
            <div className={classes.grow}>
              <ul className="nav-items">
                <Link to="/products">Products</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/useraccount">UserAccount</Link>
              </ul>
            </div>
            <div className={classes.sectionDesktop}>
              <Box display="flex">
                {socialIcons.map((socialIcon, index) => (
                  <Box
                    key={index}
                    mr={index !== socialIcons.length - 1 ? 1 : 0}
                  >
                    <IconButton aria-label={socialIcon.label}>
                      {socialIcon.icon}
                    </IconButton>
                  </Box>
                ))}
              </Box>
              {/* {props.loggedIn && <span>{props.loggedIn}</span> } */}
            </div>
          </Toolbar>
        </div>
        <main className="main_content">
          <Switch>
            <Route path="/products" component={Products} />
            <Route path="/settings" component={Settings} />
            <Route path="/useraccount" component={Balance}/>
          </Switch>
        </main>
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state: AppState) => ({
  loggedIn: state.authentication.loggedIn
});

export default compose(
  withRouter,
  withStyles(muiStyles.navBarStyles, { withTheme: true }),
  connect(mapStateToProps, null)
)(PublicNavbar);
