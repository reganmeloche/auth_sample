import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import history from '../history';
import Lib from '../Lib';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    if (!Lib.isAuthenticated()) {
      history.push("/login");
    }

    async function fetchData() {
      var result = await Lib.getTasks();
      console.log(result);
      setTasks(result);
    }
    fetchData();
  }, []);

  async function complete(taskId) {
    await Lib.completeTask(taskId);
    var result = await Lib.getTasks();
    setTasks(result);
  }

  function isComplete(task) {
    if (task.completed) {
      return (
        <div>Completed on {task.completeDate}</div>
      );
    } else {
      return (
        <Button onClick={() => complete(task.id)}>Complete</Button>
      );
      
    }
  }

  function buildTasks() {
    const taskItems = tasks.map((x) =>
      <tr key={x.id}>
        <td>{x.description}</td>
        <td>{x.createDate}</td>
        <td>{isComplete(x)}</td>
      </tr>
    );
    return taskItems;
  }

  return (
    <div className="tasks">
      <h3>Tasks</h3>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Create Date</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {buildTasks()}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default AllTasks;
