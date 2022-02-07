import { combineReducers } from "redux";
import { alertReducer } from "./alert.reducer";
import { authenticationReducer } from "./auth.reducer";
import { loginReducer } from "../../modules/login/login.reducer";
import configReducer from "./userconfig.reducer";
import userSettingsReducer from "./userSettings.reducer";

export default combineReducers({
  alert: alertReducer,
  authentication: authenticationReducer,
  login: loginReducer,
  configs: configReducer,
  userSettings: userSettingsReducer
});
