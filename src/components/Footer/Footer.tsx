/* Hide the footer if there are no todos */

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useEffect, useState } from 'react';

interface FooterProps {
  todoList: Todo[];
  todosType: 'all' | 'active' | 'completed';
  handleTodosTypeChange: (todosType: 'all' | 'active' | 'completed') => void;
}

export const Footer: React.FC<FooterProps> = ({
  todoList,
  todosType,
  handleTodosTypeChange,
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(todoList.filter(todo => !todo.completed).length);
  }, [todoList]);

  return (
    todoList.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {active} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: todosType === 'all',
            })}
            data-cy="FilterLinkAll"
            onClick={() => handleTodosTypeChange('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: todosType === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => handleTodosTypeChange('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: todosType === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => handleTodosTypeChange('completed')}
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
