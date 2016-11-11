import React from 'react'; 
import rpCard from '../objects/rpCard';


export default class CardComponent extends React.Component {u  
    undefinedgh

    get component() { return this.props.component; }
    get colors() {return this.props.colors ;}
    get icons() {return this.props.icons ;}

    render() {

        switch(this.props.component.type) {
            case 'subtitle' : return this.renderSubtitle()
            case 'hr'       : return this.renderDivider();
            case 'prop'     : return this.renderProperty();
            case 'section'  : return this.renderSectionHeader();
            case 'p'        : return this.renderParagraph();
            case 'stat'     : return this.renderStatBlock(); 
            case 'fill'     : return this.renderFill();
            case 'list'     : return this.renderList();
            case 'img'      : return this.renderPicture(); 
        }
    }


    renderSubtitle() {
        return ( 
            <div className="cd-subtitle" style={{ color: this.colors.card }}> 
                {this.component.text}
            </div>
        ); 
    }    

    renderDivider() { }   
    renderProperty() {}
    renderSectionHeader() {}
    renderParagraph() {}
    renderStatBlock() {}
    renderFill() {}
    renderList() {}
    renderPicture() {} 

}



