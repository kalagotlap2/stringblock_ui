
import { configConstants } from "../constants/configs.constants";

export function isLoading(isLoading = false) {
  return {
    type: configConstants.CONFIGS_LOADING,
    isLoading: isLoading,
  };
}

export function getUserConfigs(json) {
  return {
    type: configConstants.CONFIGS_SUCCESS,
    json: json,
  };
}

export function submitUserProfileSettings(json){
  return {
    type:configConstants.PROFILE_SETTINGS_SUBMIT,
    json: json,
  }
}

export function requestUserProfileSettings(json){
  return {
    type:configConstants.PROFILE_SETTINGS_REQUEST,
    json: json
  }
}





export function getConfigs() {
  const myrequesturl = window.location.href;
  const baseURL= "http:"+myrequesturl.split(":")[1];
  return (dispatch) => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Origin','http://localhost:3000');
    dispatch(isLoading(true));
  
    fetch(baseURL+":8080/config/getall",{ method:"GET", headers:headers})
    .then(response => {
      console.log(response);
       return response.json()
    }).then((json) => {
        dispatch(isLoading(false));
        if(Object.keys(json).length !== 0){
        json.data.map(item => {
            if(baseURL.indexOf(item.user)!== -1){
              dispatch(getUserConfigs(item.theme));
            }
          })
         
         
        }
       
      }).catch(error => {
        console.error('There was an error!', error);
    });
  };
}