import React, { Component, PropTypes } from 'react'
import Todo from './Todo'

export default class TodoList extends Component {
  renderTodo(todo,index){
    return (<Todo {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />);
  }
  render() {
    return (
      <ul>
        {this.props.alltodos.map((todo, index) => {
          switch(this.props.filter){
            case 'SHOW_ALL':    
             return this.renderTodo(todo,index);
            case 'SHOW_COMPLETED': {
              if(todo.completed) {
                return this.renderTodo(todo,index)
              };break;}
            case 'SHOW_ACTIVE': {
              if(!todo.completed) {
                return this.renderTodo(todo,index)
              };break;}
            default:console.log('default,todolist switch');
          }
             return null;
          }

        )}
      </ul>
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}