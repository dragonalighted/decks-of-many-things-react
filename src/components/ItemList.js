import React from 'react'; 
import ItemListItem from './ItemListItem';  
import ConfirmationModal from './modals/ConfirmationModal';


export default class ItemList extends React.Component {

    constructor(props){
        super(props);
        if(!this.props.itemTypeName) 
            this.props.itemTypeName
        this.state = this._initialState();
        this._handleItemDelete = this._handleItemDelete.bind(this);
        this._deleteItem = this._deleteItem.bind(this);
    }

    _initialState(){
        return {
            selectedId:null
        };
    }
    _handleItemSelected(itemId){

        if(!this.props.multiSelect){
            for(let listItem of this.listItems){
                if(listItem.itemId !== itemId && listItem.selected === true )
                    listItem.selected = false;
            }
        }

        if(this.props.onSelectItem)
            this.props.onSelectItem(itemId);
    }
    _handleItemDelete(itemId){
        this.confirmDelete.setState({key : itemId});
        this.confirmDelete.show();    
    }
    _deleteItem(itemId){
        if(this.props.onDeleteItem)
            this.props.onDeleteItem(itemId);
    }
    _getListTitle(){
        if(this.props.title){
            return (<h3 className="margin-0 padding-10">{this.props.title}</h3>);
        }
    }
    _getAddButton() {
        if(this.props.onAddItem) {
            return (
                <button className="btn btn-md btn-success pull-right margin-right-10 margin-top-10"
                    onClick={() => this.props.onAddItem()}>
                    Add {this.props.itemTypeName}
                </button> 
            );
        }
    }
    render(){
        return (
            <div>
                {this._getAddButton()}
                {this._getListTitle()}
                <ul className="deck-list greedy" ref={(ref)=> this.list = ref}>
                { 
                    this.props.items.map(function(item){
                        let id = this.props.getItemId ? this.props.getItemId(item) : undefined; 
                        let name = this.props.getName ? this.props.getName(item) : undefined;
                        let tooltip = this.props.getTooltip ? this.props.getTooltip(item) :undefined;  
                        return(
                            <ItemListItem 
                                ref={(ref) => {
                                    if(!this.listItems) 
                                        this.listItems = [];
                                    this.listItems.push(ref);
                                }}
                                key={id|| item.key || item.id || null}
                                itemId={ id|| item.key || item.id || null}
                                name={ name || item.name || ''}
                                tooltip= {tooltip || item.tooltip || null}
                                onDelete={this.props.onDeleteItem ? this._handleItemDelete : undefined}
                                onAdd={this.props.onAddToItem}
                                onSelect={(itemId) => this._handleItemSelected(itemId)}
                                onEdit={this.props.onEditItem}
                            /> 
                        );      
                    }, this)
                }
                </ul>

                <ConfirmationModal ref={(ref) => this.confirmDelete = ref}
                    title={`Delete ${this.props.itemTypeName}`}
                    action={`Are you sure you want to delete this ${this.props.itemTypeName}?`}
                    onYes={this._deleteItem} />
                 
            </div>
        )
    }

    static ListItemWrapperFactory(WrappedComponent){
        let classListItem = class ListItemWrapper extends React.Component{

            constructor(props){
                super(props);
            }

            render(){

                let wrappedProps = Object.assign({}, this.props);
                delete wrappedProps["liStyle"];
                delete wrappedProps["liClass"];
                delete wrappedProps["onSelect"];
                return (
                    <li style={this.props.liStyle} 
                        className={`${this.props.liClass} ${this.props.selected ? this.props.selectedClass || 'selected':''}`} 
                        data-value={this.props.itemId}
                        onClick={() =>{ if(this.props.onSelect){ this.props.onSelect(this.props.itemId); } } }>
                            <WrappedComponent {...this.props} />
                    </li>
                );
            }
        }
        return classListItem;
    }
}
ItemList.defaultProps = {
    items:[],
    itemTypeName:"Item",
    multiSelect:false
}