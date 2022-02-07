import { configConstants } from "../constants/configs.constants";

export default function configReducer(state = {}, action) {
  switch (action.type) {
    case configConstants.CONFIGS_SUCCESS:
      return action.json;
    default:
      return state;
  }
}
