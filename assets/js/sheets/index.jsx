import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { list_sheets, approve_sheet} from '../ajax';
import SheetRow from './row';



let SheetsList = connect(({sheets}) => ({sheets}))(({sheets}) => {
    if (sheets.size == 0) {
      list_sheets();
	}
	
	
	// let worker = session == null?null:session.user_name;
    let rows = _.map([...sheets], ([_, sheet]) => {
        return <SheetRow 
    	key={sheet.id} 
    	sheet={sheet} 
    	// worker={worker}
    	onClick={approve_sheet}
    	/>;
  });

  return (
    <table className="table table-striped">
	  <thead>
	    <tr>
	      <th>Date</th>
	      <th>Approved</th>
	      {/* <th>Worker</th> */}

	      <th></th>
	    </tr>
	  </thead>
	  <tbody>
	  	{rows}
	  </tbody>
	</table>

  );
});



export default SheetsList;