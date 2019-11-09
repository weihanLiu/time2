import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { get_sheet } from '../ajax';

function state2props(state, props) {
    let id = parseInt(props.id)
    return {id: id, sheet: state.sheets.get(id)};
  }

function SheetsShow({id, sheet}) {
    

    if (!sheet) {
        get_sheet(id);
        return (
        <div>
            <h1>Show Sheet</h1>
            <p>Loading...</p>
        </div>
        );
    }

    let tasks = _.map(sheet.tasks, (task) => {
      return <Task 
        key={"Task_ID" + task.id} 
        task={task} 
        />;
    });

    function Task(probs) {
      let t = probs.task;
      return (
          <tr>
            <td>{t.job_code}</td>
            <td>{t.spend_hours}</td>
            <td>{t.note}</td>
          </tr>
        );
    }
    

    return (
    <div>
        <h1>Show Sheet</h1>
      <ul>
        <li>
          <strong>Date:</strong>
          {sheet.date}
        </li>

        <li>
          <strong>Status:</strong>
          {sheet.approved ? "Approved" : "Not Approved"}
        </li>

        {/* <li>
          <strong>Worker:</strong>
          {sheet.worker.name}
        </li> */}
      </ul>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Job_Code</th>
            <th>Hours</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>

    </div>
    );
}

export default connect(state2props)(SheetsShow);