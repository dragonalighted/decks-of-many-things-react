import React from 'react';
import ReactDOM from 'react-dom'; 

// components
import WorkSpace from './components/WorkSpace';

// constants
import {appGuid} from './objects/constants.js';
import appObj from './objects/appObj'




function _loadApplicationObject(){
    let obj = appObj.loadAppObj(appGuid, {defaultIfNone:true}); 

    if(!appObj) 
        appObj = Object.assign({}, defaultObj) ;
  
    return appObj; 
}

let appObj = _loadApplicationObject(); 

ReactDOM.render(
    <WorkSpace appObj={appObj} />,
    document.getElementById('example')
);






