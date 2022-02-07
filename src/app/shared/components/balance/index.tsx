import React, { useEffect,useState } from 'react';
import { compose } from "recompose";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withRouter, Redirect } from "react-router-dom";
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core';
import { getLoginDetails } from '../../actions/auth.actions';

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa';


function  Balance(props)  {

    const [login,updateLogin] = useState({});
     
    var myTimeout;  
    let count;
   
       
 
    const { account } = useEthers()
    const userBalance = useEtherBalance(account)
    myTimeout = setTimeout(function(){
      if(userBalance!= undefined){
        props.getLoginDetailsFromWallet({"useraccount":account,login:true})
        count++;
      
    }},
      1000);
     if(count== 1){ clearTimeout(myTimeout)};
   
    const stakingBalance = useEtherBalance(STAKING_CONTRACT)
    return <div className="balance">
         <h1 className="balance_title"> user account details</h1>
         <div>
            {/* {stakingBalance && (
              <div>
                <label>ETH2 staking contract holds:</label> <h3>{formatEther(stakingBalance)}</h3>{' '}
                <label>ETH</label>
              </div>
            )} */}
            {account  && (
              <div>
                <label>Account Address:<h3>{account}</h3></label> 
              </div>
            )}
            {userBalance && (
              <div>
                <label>Ether balance:<h3>{formatEther(userBalance)}<span>  ETH</span></h3> </label> 
              </div>
            )}
          </div>
    </div>;
  
}
const mapStateToProps = (state: AppState) => ({
    loggedIn: state.login,
    userSettings: state.userSettings
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getLoginDetailsFromWallet: (json) => {
        dispatch(getLoginDetails(json));
      },
    };
  };
  
  export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
  )(Balance);