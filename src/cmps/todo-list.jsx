import { CircularProgress, List } from '@material-ui/core';
import { TodoPreview } from './todo-preview';

export const TodoList = props => {
  const { todos, onRemoveTodo, onToggleTodo, onTodoClick } = props;
  if (!todos)
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress color="secondary" />
      </div>
    );
  return (
    <List>
      {todos.map(todo => (
        <TodoPreview
          key={todo._id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          onToggleTodo={onToggleTodo}
          onTodoClick={onTodoClick}
        />
      ))}
      {!todos.length && <p>No todos to show</p>}
    </List>
  );
};
