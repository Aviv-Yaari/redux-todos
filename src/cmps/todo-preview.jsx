import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import '../css/todo-preview.css';

export const TodoPreview = props => {
  const { todo, onTodoClick } = props;

  const onToggleTodo = (ev, todo) => {
    ev.stopPropagation();
    props.onToggleTodo(todo);
  };

  const onRemoveTodo = (ev, todo) => {
    ev.stopPropagation();
    props.onRemoveTodo(todo);
  };

  return (
    <ListItem
      className={'todo-preview' + (todo.status === 'done' ? ' done' : '')}
      onClick={() => onTodoClick(todo._id)}>
      <ListItemText primary={todo.text} />
      <IconButton onClick={ev => onToggleTodo(ev, todo)} aria-label="mark as done">
        <CheckCircleIcon className="btn-done" />
      </IconButton>
      <IconButton onClick={ev => onRemoveTodo(ev, todo)} edge="end" aria-label="delete">
        <DeleteIcon className="btn-delete" />
      </IconButton>
    </ListItem>
  );
};
