import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the History table. See pages/History.jsx. */
const SymptomItem = (props) => {
  let status;
  let statusStyle;
  if (props.symptom.testPos || props.symptom.illness || props.symptom.exposure) {
    status = 'Please Stay Home. DO NOT report to campus or attend UH in-person events or activities.';
    statusStyle = { color: 'red' };
  } else {
    status = 'You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions.';
    statusStyle = { color: 'green' };
  }
  return (
    <Table.Row>
      <Table.Cell>{props.symptom.date.toLocaleString()}</Table.Cell>
      <Table.Cell style = {statusStyle}>{status}</Table.Cell>
      <Table.Cell>
        <Link to={`/edit/${props.symptom._id}`}>Edit</Link>
      </Table.Cell>
    </Table.Row>
  );
};

// Require a document to be passed to this component.
SymptomItem.propTypes = {
  symptom: PropTypes.shape({
    date: PropTypes.date,
    testPos: PropTypes.boolean,
    illness: PropTypes.boolean,
    exposure: PropTypes.boolean,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SymptomItem);
