import React from 'react'; 

export default class ItemListItem extends React.Component {

    constructor(props){
        super(props)
        this.state = this._initialState();
        if(props.itemId === undefined || props.itemId === null) {
            throw "Property 'itemId' must be defined in ItemListItem";  
        }
        this._itemSelected = this._itemSelected.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleAdd = this._handleAdd.bind(this);
        this._handleEdit = this._handleEdit.bind(this);     
    }

    get itemId(){ return this.props.itemId; }

    get selected() {return this.state.selected;}
    set selected(value = true) { this.setState({selected: value});}

    _itemSelected(){
        this.setState({selected: true})
        if(this.props.onSelect) 
            this.props.onSelect(this.props.itemId); 
    }

    _handleDelete(){
        if(this.props.onDelete)
            this.props.onDelete(this.props.itemId);
    }
    _handleAdd(){
        if(this.props.onAdd)
            this.props.onAdd(this.props.itemId); 
    }
    _handleEdit(){
        if(this.props.onEdit)
            this.props.onEdit(this.props.itemId)
    }

    _initialState(){
        return { selected: false};
    }

    _getButton(handler, icon = 'glyphicon-menu-hamburger', addedClasses = '', tooltip = '') {
        return (
            <span className={`ctrl glyphicon ${icon} ${addedClasses}`} title={tooltip} onClick={handler}></span>
        );
    }
    render(){

        let editIcon = this.props.onEdit 
            ? this._getButton(this._handleEdit,'glyphicon-pencil', 'margin-right-10', 'Edit') 
            : null; 
        let deleteIcon = this.props.onDelete 
            ? this._getButton(this._handleDelete,'glyphicon-trash', '', 'Delete') 
            : null; 
        let addIcon = this.props.onAdd 
            ? this._getButton(this._handleAdd,'glyphicon-plus', 'margin-right-10', 'Add To') 
            : null;  

        return(
            <li  className={this.state.selected ? 'selected' : ''} data-value={this.props.itemId} >
                <span onClick={this._itemSelected} 
                    title={this.props.tooltip}
                    className="ctrl padding-right-10">
                    {this.props.name}
                </span>
                <div className="inline-block pull-right padding-right-10">
                    {editIcon}
                    {addIcon}
                    {deleteIcon}
                </div>
            </li>
        );
    }

}