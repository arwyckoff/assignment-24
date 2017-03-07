import $ from 'jquery';
import React from "react"
import ReactDOM from "react-dom"

const ToDoComp = React.createClass({

  getInitialState: function(){
    return{

      theToDoItems: [],

    }
  },
  _handleRemoveItem: function(itemToRemoveIndex){
    // console.log(this.state.theToDoItems[itemToRemoveIndex])
    let filterItemArrayCopy = this.state.theToDoItems
      var filteredArray = []
    function checkDeletedItem(item){
      return item !== filterItemArrayCopy[itemToRemoveIndex]
    }
    filteredArray = filterItemArrayCopy.filter(checkDeletedItem)
      // console.log(filterItemArrayCopy.filter(checkDeletedItem))
      this.setState({
        theToDoItems: filteredArray
      })
  },



  _updateToDoList: function(newListItem){
    let itemArrayCopy = this.state.theToDoItems
    itemArrayCopy.push(newListItem)
    this.setState({
      theToDoItems: itemArrayCopy
    })

  },

  render: function(){
    // console.log(this.state.theToDoItems)
      return (
        <div>
          <h1 className="title">ToDo List</h1>
           <div className="bodydiv">
          <InputComp updateToDoListCB ={this._updateToDoList}/>
          <ListComp toDoList={this.state.theToDoItems} removeItem={this._handleRemoveItem}/>
          </div>
        </div>
      )
  }
})

const InputComp = React.createClass({


  _handleNewItem: function(){
    let newItem = {
      item: this.refs.listInput.value
    }
      this.props.updateToDoListCB(newItem)
      this.refs.listInput.value = ""
  },
  render: function(){

      return (
        <div className = "inputcomp">
          <div className = "inputcontainer">
            <input className="input" ref="listInput" type="text" placeholder="Next ToDo Item"/>
            <button className="btn plusbutton" onClick={this._handleNewItem} key={"input"}>
            <i className="fa fa-plus"/>
            </button>
          </div>
        </div>

      )
  }

})

const ListComp = React.createClass({



  _createJSXListItem: function(listItemArray){
    let self = this
    let jsxItemArray = listItemArray.map(function(itemObj, i){
      // console.log(itemObj.item, 'wath am ite')
      console.log('waht up')
      return (
        <div  >
        <input className="checkbox" type="checkbox" value="on" key={i}/>
        <li className="itemObj">{itemObj.item}</li>
        <button className="btn" onClick={function(){return self.props.removeItem(i)}}>
        <i className="fa fa-remove" />
        </button>
        </div>
      )


    })
    return jsxItemArray

  },
  render: function(){

    return (
        <div>
          <hr/>
          <ul>
            <div className="todolistitem">
              {this._createJSXListItem(this.props.toDoList)}
              </div>
          </ul>

        </div>

    )
  }
})




ReactDOM.render(<ToDoComp/>, document.querySelector('#app-container'))
