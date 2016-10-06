import React from 'react';
import ReactDOM from 'react-dom'; 

// components
import WorkSpace from './components/WorkSpace';

// constants
import AppObject from './objects/AppObject'

try {
ReactDOM.render(
    <WorkSpace appObj={AppObject.loadAppObject()} />,
    document.getElementById('example')
);
}
catch(err) {
    ReactDOM.render(
        <WorkSpace appObj={AppObject.loadAppObject()} />,
        document.getElementById('example')
    );    
}






