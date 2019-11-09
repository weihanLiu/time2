import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Alert, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { submit_new_sheet } from '../ajax';
import { Redirect } from 'react-router';



function state2props(state) {
  return state.forms.new_photo;
}



class SheetsNew extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  

  redirect(path) {
    this.setState({redirect: path});
  }


  changed(data) {
    console.log("in changed")
    console.log(data)
    this.props.dispatch({
      type: 'CHANGE_NEW_SHEET',
      data: data,
    });
    console.log("in changed after")
    console.log(this.props)
  }

  sheet_changed(ev) {
    let input = ev.target;
    let date = input.value;
    this.changed({date: date});
  }

  add_task() {
    console.log("in add task")
    console.log(this.props)
    let tasks = this.props.tasks;
    console.log(tasks)
    tasks = tasks.concat([this.newTask()]);
    this.changed({tasks: tasks});
  }
  newTask() {
    return newTask = {
      job_code: "", 
      hours: 0,
      note: ""
    }
  }

  jobCode_changed(i, ev) {
    let tasks = this.props.tasks.concat([]);
    if (tasks.length > 0) {
      tasks[i] = Object.assign({}, tasks[i], {job_code: ev.target.value});
    }
    this.changed({tasks: tasks});
  }

  hour_changed(i, ev) {
    let tasks = this.props.tasks.concat([]);
    if (tasks.length > 0) {
      tasks[i] = Object.assign({}, tasks[i], {hours: ev.target.value});
    }
    this.changed({tasks: tasks});
  }

  note_changed(i, ev) {
    let tasks = this.props.tasks.concat([]);
    if (tasks.length > 0) {
      tasks[i] = Object.assign({}, tasks[i], {note: ev.target.value});
    }
    this.changed({tasks: tasks});
  }

  render() {
    console.log("in render: this.props")
    console.log(this.props)
    let {date, tasks, errors, dispatch} = this.props
    
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let tasksList = [];
    for(let i = 0; i< this.props.tasks; i++) {
      tasksList.push(<TaskRow ID = {i} jobs={jobs}
        task={tasks[i]}
        onEditJob={(ev) => this.jobCode_changed(i, ev)}
        onEditHour={(ev) => this.hour_changed(i, ev)}
        onEditNote={(ev) => this.note_changed(i, ev)}
        />);
    }

    return(
      <div>
        <h1>New_Timesheet</h1>
        { error_msg }
        <Form.Group controlId="date">
          Date:
          <input type="date" name="date" onChange={(ev) => this.sheet_changed(ev)}/>
        </Form.Group>
        <Form.Group controlId="addTask">
          <Button variant="primary" onClick={() => this.add_task()}>Add Task</Button>
        </Form.Group>
        <Row>
          {tasksList}
        </Row>
        <Form.Group controlId="submit">
          <Button variant="primary" onClick={() => submit_new_sheet(this)}>Submit</Button>
        </Form.Group>
      </div>
    );
  }
}


function TaskRow(props) {

  return (
    <Form.Row>
      <Form.Group as={Col} controlId="formGridCity" onChange={props.onEditJob}>
        <Form.Label>Job Code</Form.Label>
        <Form.Control />
      </Form.Group>
      
      <Form.Group as={Col} controlId="formGridCity" onChange={props.onEditHour}>
        <Form.Label>Hours</Form.Label>
        <Form.Control />
      </Form.Group>
      
      <Form.Group as={Col} controlId="formGridZip" onChange={props.onEditNote}>
        <Form.Label>Note</Form.Label>
        <Form.Control />
      </Form.Group>
    </Form.Row>
    );
}










export default connect(state2props)(SheetsNew);

