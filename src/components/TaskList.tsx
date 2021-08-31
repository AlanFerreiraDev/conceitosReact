import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    //Retorno nada se não tiver texto, para evitar criar tarefas sem titulo
    if (!newTaskTitle) return;

    //Crio um novo objeto de task, conforme a interface
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    // Seto colocando a tarefa anterior e a nova e seto o titulo como vazio
    setTasks((oldTask) => [...oldTask, newTask]);
    setNewTaskTitle('');
    // console.log(newTask);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // Faço um filtro e pego todas as tasks que o task.id for diferente da que eu estou
    // Faço um filtro e só retorno as tasks diferentes que eu cliquei
    const filteredTasks = tasks.filter((task) => task.id !== id);
    //estado.filter((paramAbs) => paramAbs.paramFun !== paramFun )
    // Para achar a que é igual, eu faria assim
    // const filterrTheSame = tasks.filter((task) => task.id === id);
    // console.log(filteredTasks);
    // console.log(filterr);
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
