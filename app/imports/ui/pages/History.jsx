import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Symptoms } from '../../api/symptom/Symptom';
import SymptomItem from '../components/SymptomItem';

/** Renders a table containing all of the Symptom documents. Use <SymptomItem> to render each row. */
class History extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Check In History</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.symptoms.map((symptom) => <SymptomItem key={symptom._id} symptom={symptom} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Symptom documents in the props.
History.propTypes = {
  symptoms: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Symptom documents.
  const subscription = Meteor.subscribe(Symptoms.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Symptom documents
  const symptoms = Symptoms.collection.find({}).fetch();
  return {
    symptoms,
    ready,
  };
})(History);
