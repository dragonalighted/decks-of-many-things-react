import React from 'react'; 
import ConfirmationModal from './modals/ConfirmationModal';
import ControlButton from './ControlButton';

class ListItem extends React.Component {
    render(){
        let controls = this._getControls();

        return (
            <div>
                <span title={this.props.tooltip} className={this.props.className}>
                    {this.props.name}
                </span>
                <div 
                    className="inline-block pull-right padding-right-10" 
                    onClick={(event) => this.props.itemHandler(event, '', null) }>                     
                        {controls.edit}
                        {controls.add}
                        {controls.trash}
                </div>
            </div>
        );
    }

    _getControls(){        
        let controls = {
            edit : null,
            add : null,
            trash: null
        }; 

        if(this.props.allow){
            let allowedControls = this.props.allow.split('|');
            if(allowedControls.includes('edit'))
                controls.edit = this._getButton('edit', null, 'margin-right-10', 'Edit');
            if(allowedControls.includes('delete') || allowedControls.includes('trash'))
                controls.trash = this._getButton('trash', null,  '', 'Trash');
            if(allowedControls.includes('add') || allowedControls.includes('addTo'))
                controls.add = this._getButton('addTo', null, 'margin-right-10', 'Add To');
        }

        return controls; 
    }

    _getButton(command, icon , addedClasses = '', tooltip = '') {
        return (
            <ControlButton 
                className={addedClasses} 
                icon={icon} 
                command={command} 
                tooltip={tooltip} 
                itemHandler={this.props.itemHandler} 
                item={this.props.item} 
                id={this.props.id}/>
        );
    }

    
}


export default class List extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            items : this.props.items,
            selectedItems : [],
        }
        this._confirmDelete = this._confirmDelete.bind(this);
        this._onDelete = this._onDelete.bind(this);
        this._itemHandler = this._itemHandler.bind(this); 
    }


    render(){
        let ListItemWrapper = List._ListItemWrapperFactory( this.props.buildItem  
             ? (props) => this.props.buildItem(props)
             : (props) => <ListItem {...props} /> );
        return (
            <div>
                { this._getAddButton()}
                { this._getListTitle()}
                <ul ref={(ref) => this.list = ref} 
                    className={this.props.className}>
                   {
                    this.props.items 
                     ? this.props.items.map((item) => {
                            let id = List.getKey(this.props, item);  
                            let name = List.getName(this.props, item); 
                            let tooltip = List.getTooltip(this.props, item);

                            return (
                                <ListItemWrapper 
                                    key={id} id={id}
                                    selected={this.state.selectedItems.indexOf(id) >= 0}
                                    name={name} tooltip={tooltip}
                                    item={item} allow={this.props.allow}
                                    itemHandler={this._itemHandler} 
                                    itemTooltip={this.props.itemTooltip}
                                    itemName={this.props.itemName}
                                    itemKey={this.props.itemKey}
                                    />
                                );
                        })
                    :  (<span>No {this.props.type || 'Item'}s exist.</span>)
                }

                </ul>

                <ConfirmationModal ref={(ref) => this.confirmDelete = ref}
                    title={`Delete ${this.props.type || "Item"}`}
                    action={`Are you sure you want to delete this ${this.props.type || "Item"}?`}
                    onYes={this._onDelete} />
            </div>
        );
    }

    _itemHandler(command, item, id) {
        let handler = this.props.itemHandler ? this.props.itemHandler : () => console.log(`${command} no supported by List ${this.props.name || "Unnammed"}`); 
        switch(command) {
            case '' : return; 
            case "trash"  :
            case "delete" :
            case "dispose":
                if (this.props.confirmDelete === undefined ? true : this.props.confirmDelete){
                    this._confirmDelete(command, item, id)
                    return; 
                } 
                break;
            case "select":
                {
                    let previous = this.state.selectedItems; 
                    let selectedItems = this.props.multiSelect ? previous : [];
                    selectedItems.push(id);   
                    this.setState({selectedItems});

                    for(let pId of previous) {
                        if(this.state.selectedItems.indexOf(pId) < 0 ) {
                            handler('deselect', item, id);
                        }
                    }
                }                             
                break; 
            case "deselect":
                {
                    let selectedItems = this.state.selectedItems; 
                    let index = selectedItems.indexOf(id); 
                    if(index >= 0 ) selectedItems.splice(index, 1);
                    this.setState({selectedItems})
                }
                break; 
            default:  
                break; 
        }
        handler(command, item, id);
    }

    _confirmDelete(command, item, id) {
        this.confirmDelete.setState({key : id, item, command});
        this.confirmDelete.show();   
    }

    _onDelete(command, item, id) {
        this.props.itemHandler(command, item, id);
    }

    _getAddButton(){
        let allowsAdd = this.props.allow && this.props.allow.split('|').includes('new'); 
        if(this.props.itemHandler && allowsAdd ) {
            return (
                <button className="btn btn-md btn-success pull-right margin-right-10 margin-top-10"
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.props.itemHandler('new', null, null)} 
                    }>
                    Add {this.props.itemTypeName}
                </button> 
            );
        }  
    }
    _getListTitle(){
        if(this.props.title){
            return (<h3 className="margin-0 padding-10">{this.props.title} </h3>);
        }
    }

    static _ListItemWrapperFactory(WrappedComponent){
        let classListItem = class ListItemWrapper extends React.Component{

            constructor(props){
                super(props);
            }
            _onSelect(event, item, id) {
                let selected = !this.props.selected;
                this._itemHandler(event, selected ? 'select' : 'deselect', item, id)
                this.ItemId = this.ItemId.bind(this);
            }
            _itemHandler(event, command, item, id) {
                event.preventDefault();
                event.stopPropagation();
                if(this.props.itemHandler){
                    switch(command.trim()) {                    
                        case '': return; 
                        default: break;
                    }
                    this.props.itemHandler(command, item, id);
                }
            }

            _confirmDelete(event, command, item, id){

            }
            ItemId() {
                return this.props.id;
            }
            render(){


                let wrappedProps = Object.assign({}, this.props);
                delete wrappedProps["liStyle"];
                delete wrappedProps["liClass"]; 
                wrappedProps.selected = this.props.selected;                
                wrappedProps["itemHandler"] = (event, command, item, id) => this._itemHandler(event, command, item, id);
                return (
                    // <WrappedComponent {...wrappedProps} />
                    <li style={this.props.liStyle} 
                        className={`${this.props.liClass||''} ${this.props.selected ? this.props.selectedClass || 'selected':''}`} 
                        data-value={this.props.id}
                        onClick={(event) => this._onSelect(event, this.props.item, this.props.id) }>
                            <WrappedComponent {...wrappedProps} />
                    </li>
                );
            }
        }
        return classListItem;
    }



    static getKey(props, item){
        return props.itemKey ? props.itemKey(item) : (item.id || item.ID || item.Id || item.key || item.Key || item.itemId || undefined);            
    }
    static getName(props, item) {
        return props.itemName ? props.itemName(item) : (item.name || item.Name || undefined);
    }
    static getTooltip(props, item) {
        return props.itemTooltip ? props.itemTooltip(item) : (item.tooltip || '');
    }
}
