import React from 'react';
import ReactDOM from 'react-dom';

export default function SheetItem(props) {
	let sheet = props.sheet;
	let path = "/sheets/" + sheet.id;
	let btn = (props.worker || sheet.approve)? (<p></p>) : (
		<Button variant="primary" onClick={() => props.onClick(sheet.id)}>
            Approve Timesheet</Button>);
	return (  
		<tr>
		  <td>sheet.date</td>
		  <td>sheet.approve</td>
		  <td>sheet.worker.name</td>

		  <td>
		    <span>
			    <a href={path}>Show Sheet</a>
		    </span>
		  </td>
		  <td>
		  	{btn}
		  </td>
		</tr>
	);
}