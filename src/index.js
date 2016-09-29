var React = require('react');
var ReactDOM = require('react-dom'); 

// components
var WorkSpace = require('./components/WorkSpace');

// constants
const guid = '9e39253c-b1f8-4d0a-822f-6a386757ba43';
var defaultObj = require('./defaultObj.js');


function _loadApplicationObject(){
    let appObj = localStorage[guid];

    if(!appObj) 
        appObj = Object.assign({}, defaultObj) ;
  
    return appObj; 
}

let appObj = _loadApplicationObject(); 

ReactDOM.render(
    <WorkSpace appObj={appObj} />,
    document.getElementById('example')
);






