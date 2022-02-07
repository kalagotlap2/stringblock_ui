import { configConstants } from "../constants/configs.constants";

export default function userSettingsReducer(state = {}, action) {
  switch (action.type) {
    case configConstants.PROFILE_SETTINGS_SUBMIT:
      return action.json;
    case configConstants.PROFILE_SETTINGS_REQUEST:
      return action.json
    default:
      return state;
  }
}
