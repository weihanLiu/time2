import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_sheets } from '../ajax';
import SheetItem from './card';

let SheetsList = connect(({sheets}) => ({sheets}))(({sheets}) => {
    if (sheets.size == 0) {
      list_sheets();
    }
    let cards = _.map([...sheets], ([_, sheet]) => {
        return <SheetItem 
    	key={sheet.id} 
    	sheet={sheet} 
    	worker={is_worker}
    	onClick={approve_sheet}
    	/>;
  });

  return (
    <table className="table table-striped">
	  <thead>
	    <tr>
	      <th>Date</th>
	      <th>Approved</th>
	      <th>Worker</th>

	      <th></th>
	    </tr>
	  </thead>
	  <tbody>
	  	{cards}
	  </tbody>
	</table>

  );
});



export default SheetsList;