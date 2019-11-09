import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Alert } from 'react-bootstrap';
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
      redirect:null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_SHEET',
      data: data,
    });
  }

  sheet_changed(ev) {
    let input = ev.target;
    let date = input.value;
    this.changed({date: date});
  }

  render() {
    let {file, desc, errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return(
      <div>
        <h1>New_Timesheet</h1>
        { error_msg }
        <Form.Group controlId="date">
          Date:
          <input type="date" name="date" onChange={(ev) => this.sheet_changed(ev)}
          />
        </Form.Group>
        <Form.Group controlId="submit">
          <Button variant="primary" onClick={submit_new_sheet}>Submit</Button>
        </Form.Group>
      </div>
    );
  }
}
export default connect(state2props)(SheetsNew);

