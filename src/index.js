var React = require('react');
var ReactDOM = require('react-dom'); 

// components
var WorkSpace = require('./components/WorkSpace');

// constants
const guid = '9e39253c-b1f8-4d0a-822f-6a386757ba43';


function _loadApplicationObject(){
    const defaultObj = {     decks: [ { name: "Example Deck", tags: ["example", "demo"], created:new Date(), modified:null  } ]};
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






