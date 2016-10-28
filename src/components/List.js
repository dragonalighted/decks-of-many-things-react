import React from 'react'; 
import ConfirmationModal from './modals/ConfirmationModal';

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
                controls.edit = this._getButton('edit', 'glyphicon-pencil', 'margin-right-10', 'Edit');
            if(allowedControls.includes('delete') || allowedControls.includes('trash'))
                controls.trash = this._getButton('trash','glyphicon-trash', '', 'Trash');
            if(allowedControls.includes('add') || allowedControls.includes('addTo'))
                controls.add = this._getButton('addTo','glyphicon-plus', 'margin-right-10', 'Add To');
        }

        return controls; 
    }

    _getButton(command, icon = 'glyphicon-menu-hamburger', addedClasses = '', tooltip = '') {
        return (
            <span 
                className={`ctrl glyphicon ${icon} ${addedClasses}`} 
                title={tooltip} 
                onClick={(event) => this.props.itemHandler(event, command, this.props.item, this.props.id)}>
            </span>
        );
    }

    
}


export default class List extends React.Component {

    constructor(props){
        super(props);
        this._confirmDelete = this._confirmDelete.bind(this);
        this._onDelete = this._onDelete.bind(this);
    }


    render(){
        let ListItemWrapper = List._ListItemWrapperFactory( this.props.fnBuildItem  
             ? (props) => this.props.fnBuildItem(props)
             : (props) => <ListItem {...props} /> );
        return (
            <div>
                { this._getAddButton()}
                { this._getListTitle()}
                <ul ref={(ref) => this.list = ref} 
                    className={this.props.className}>
                   {
                    this.props.items.map((item) => {
                        let id = List.getKey(this.props, item);  
                        let name = List.getName(this.props, item); 
                        let tooltip = List.getTooltip(this.props, item);

                        return (
                            <ListItemWrapper 
                                key={id} id={id}
                                name={name} tooltip={tooltip}
                                item={item} allow={this.props.allow}
                                onSelect={(item, id, selected) => this._onSelect(item, id, selected)}
                                itemHandler={this.props.itemHandler} 
                                confirmDelete={this.props.confirmDelete ? this._confirmDelete : undefined }/>
                            );
                    })
                }

                </ul>

                <ConfirmationModal ref={(ref) => this.confirmDelete = ref}
                    title={`Delete ${this.props.type || "Item"}`}
                    action={`Are you sure you want to delete this ${this.props.type || "Item"}?`}
                    onYes={this._onDelete} />
            </div>
        );
    }

    _confirmDelete(command, item, id) {
        this.confirmDelete.setState({key : id, item, command});
        this.confirmDelete.show();   
    }

    _onDelete(command, item, id) {
        this.props.itemHandler(command, item, id);
    }
    _onSelect(item, id, selected){
        if(this.props.onSelect)
            this.props.onSelect(item, id, selected);    
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
                this.state = { selected : this.props.selected || false};
            }
            _onSelect(event, item, id) {
                let selected = !this.state.selected;
                this.setState( {selected : selected});
                this._itemHandler(event, selected ? 'select' : 'deselect', item, id)
            }
            _itemHandler(event, command, item, id) {
                event.preventDefault();
                event.stopPropagation();
                if(this.props.itemHandler){
                    switch(command.trim()) {                    
                        case '': break; 
                        case "trash"  :
                        case "delete" :
                        case "dispose":
                            this.props.confirmDelete 
                                ? this.props.confirmDelete(command, item, id)
                                : this.props.itemHandler(command, item, id); 
                                break;
                        default: 
                            this.props.itemHandler(command, item, id);
                            break;
                    }

                }

            }

            _confirmDelete(event, command, item, id){

            }

            render(){


                let wrappedProps = Object.assign({}, this.props);
                delete wrappedProps["liStyle"];
                delete wrappedProps["liClass"]; 
                delete wrappedProps["onSelect"];
                delete wrappedProps["confirmDelete"];
                wrappedProps.selected = this.state.selected;                
                wrappedProps["itemHandler"] = (event, command, item, id) => this._itemHandler(event, command, item, id);
                return (
                    // <WrappedComponent {...wrappedProps} />
                    <li style={this.props.liStyle} 
                        className={`${this.props.liClass} ${this.state.selected ? this.props.selectedClass || 'selected':''}`} 
                        data-value={this.props.id}
                        onClick={(event) => this._onSelect(event, this.props.item, id) }>
                            <WrappedComponent {...wrappedProps} />
                    </li>
                );
            }
        }
        return classListItem;
    }



    static getKey(props, item){
        return props.getItemId ? props.getItemId(item) : (item.id || item.ID || item.Id || item.key || item.Key || item.itemId || undefined);            
    }
    static getName(props, item) {
        return props.getName ? props.getName(item) : (item.name || item.Name || undefined);
    }

    static getTooltip(props, item) {
        return props.getTooltip ? props.getTooltip(item) : (item.tooltip || '');
    }
}
