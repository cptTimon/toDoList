import React from 'react';
import io from 'socket.io-client';


class App extends React.Component {

  state = {
    tasks: [],
    taskName: '',
  };

  componentDidMount() {
    this.socket = io('localhost:8000');
    this.socket.on('updateTasks', (tasks) => this.updateTasks(tasks));
    this.socket.on('removeTask', (index) => this.removeTask(index));
    this.socket.on('addTask', (task) => this.addTask(task));
  };

  removeTask = (index, localRemoval = false) => {
    this.setState({
      tasks: this.state.tasks.filter(task => this.state.tasks.indexOf(task) !== index),
    });
    if(localRemoval) this.socket.emit('removeTask', index);
  };

  updateTasks = (newTasks) => {
    this.setState({
      tasks: newTasks,
    });
  };

  addTask = task => {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.addTask(this.state.taskName);
    this.socket.emit('addTask', this.state.taskName);
    this.setState({
      taskName: '',
    });
  }

  render() {
    const { tasks, taskName } = this.state;
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {tasks.map((task, i) => (
              <li key={i} className="task" >{task}
                <button className="btn btn--red" onClick={() => this.removeTask(tasks.indexOf(task), i)}>Remove</button>
              </li>
            ))}
          </ul>

          <form id="add-task-form" onSubmit={event => this.submitForm(event)}>
            <input
              className="text-input"
              onChange={event => this.setState({taskName: event.currentTarget.value})}
              autoComplete="off"
              value={taskName}
              type="text"
              placeholder="Type your description"
              id="task-name"
            />
            <button
              className="btn"
              type="submit"
            >
              Add
            </button>
          </form>

        </section>
      </div>
    );
  }
};

export default App;
