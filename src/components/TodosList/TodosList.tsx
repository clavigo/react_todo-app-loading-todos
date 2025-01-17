/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todoList: Todo[] | undefined;
  isLoading: boolean;
  // handleDeleteTodo: (todoId: number) => Promise<void> | undefined;
  currentTodo: number;
  // handleUpdateTodo: (todo: Todo) => Promise<void> | undefined;
}

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
  isLoading,
  // handleDeleteTodo,
  currentTodo,
  // handleUpdateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList?.map(todo => {
        const isActiveModal = isLoading && currentTodo === todo.id;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label
              className="todo__status-label"
              htmlFor={`TodoStatus-${todo.id}`}
            >
              <input
                id={`TodoStatus-${todo.id}`}
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => {
                  // handleUpdateTodo({
                  //   ...todo,
                  //   completed: !todo.completed,
                  // });
                }}
              />
            </label>
            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              // onClick={() => handleDeleteTodo(todo.id)}
            >
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div
              data-cy="TodoLoader"
              className={classNames('modal overlay', {
                'is-active': isActiveModal,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
