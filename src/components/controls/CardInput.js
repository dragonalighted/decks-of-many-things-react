import React from 'react'; 
import InputBase from './Input'; 
import {DropDown} from './Input';

class CardSizeSelector extends InputBase {
    render() {
        return (
            <DropDown 
                className={this.props.className}
                style={this.props.style}
                defaultValue={this.defaultValue}
                onChange={this.props.onChange}                                
                propSetter={(card, size) => card.size = size }>
                    <option value='poker'       >Poker     (2.5"  x 3.5")</option>
                    <option value='bridge'      >Bridge    (2.25" x 3.5")</option>
                    <option value='index-sm'    >Small Index (5"    x 3")</option>
                    <option value='index-md'    >Medium Index (6"    x 4")</option>
                    <option value='index-lg'    >Large Index (8"    x 5")</option>                                
            </DropDown>
        );
    }
}

export {CardSizeSelector}