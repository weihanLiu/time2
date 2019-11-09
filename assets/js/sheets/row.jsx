import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import store from '../store';

export default function SheetRow(props) {
	let sheet = props.sheet;
	let url = "/sheets/" + sheet.id;
	let session = store.getState().session;
	let is_manager = session.manager_id == null?true:false
	let apvBtn = (!is_manager || sheet.approve)? (<p></p>) : (
		<Button variant="primary" onClick={() => props.onClick(sheet.id)}>
            Approve Timesheet</Button>);
	return (  
		<tr>
		  <td>{sheet.date}</td>
		  <td>{sheet.approved ? "Approved" : "Not Approved"}</td>
		  {/* <td>{sheet.worker.name}</td> */}

		  <td>
		    <span>
			    <a href={url}>Show Sheet</a>
		    </span>
		  </td>
		  <td>
			  
		  	{apvBtn}
		  </td>
		</tr>
	);
}