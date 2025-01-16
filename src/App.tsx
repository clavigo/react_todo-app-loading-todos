/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodosList/TodosList';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';
import { Todo } from './types/Todo';
import * as postService from './api/todos';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>();
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTodo, setCurrentTodo] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    postService
      .getTodos()
      .then(todos => {
        setTodoList(todos);
        setIsError('');
      })
      .catch(() => setIsError('Unable to load todos'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddTodo = (title: string) => {
    if (title.length === 0) {
      setIsError('Title should not be empty');

      return;
    }

    return postService
      .addTodo(title, false)
      .then(newTodo => {
        setTodoList(currentList => [...(currentList || []), newTodo]);
        setIsError('');
      })
      .catch(error => {
        setIsError('Unable to add a todo');
        throw error;
      });
  };

  const handleDeleteTodo = (todoId: number) => {
    setCurrentTodo(todoId);
    setIsLoading(true);

    return postService
      .deleteTodo(todoId)
      .then(() => {
        setTodoList(currentList =>
          currentList?.filter(todo => todo.id !== todoId),
        );
        setIsError('');
      })
      .catch(error => {
        setIsError('Unable to delete a todo');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentTodo(0);
      });
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setCurrentTodo(updatedTodo.id);
    setIsLoading(true);

    return postService
      .updateTodo(updatedTodo)
      .then(() => {
        setTodoList(currentList => {
          return currentList?.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          );
        });
        setIsError('');
      })
      .catch(error => {
        setIsError('Unable to update a todo');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentTodo(0);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header handleAddTodo={handleAddTodo} />

        <TodoList
          todoList={todoList}
          isLoading={isLoading}
          handleDeleteTodo={handleDeleteTodo}
          currentTodo={currentTodo}
          handleUpdateTodo={handleUpdateTodo}
        />

        <Footer />
      </div>

      <Errors error={isError} />
    </div>
  );
};
