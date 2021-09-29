import React from 'react';
import { Grid, Loader, Header, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, BoolField, DateField, ErrorsField, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Symptoms } from '../../api/symptom/Symptom';

const bridge = new SimpleSchema2Bridge(Symptoms.schema);

/** Renders the Page for editing a single document. */
class EditSymptom extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { date, testPos, illness, exposure, _id } = data;
    Symptoms.collection.update(_id, { $set: { date, testPos, illness, exposure } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else if (testPos || illness || exposure) {
        swal('Stop', 'Please Stay Home. DO NOT report to campus or attend UH in-person events or activities.', 'error');
      } else {
        swal('Clear', 'You may report to campus / Anyone in Quarantine MUST adhere to location restrictions.', 'success');
      }
    });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Daily Symptoms Check</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
          <Grid container>
            <Grid.Row>
              <Grid.Column width={11}>
                <h4>Have you tested positive for COVID-19 and are on home isolation?</h4>
              </Grid.Column>
              <Grid.Column floated='right'>
                <BoolField
                  name='testPos'
                  appearance="checkbox"
                  label='Yes'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={10}>
                <h4>Check for Symptoms of Illness: If you have any symptoms of illness, do not come to campus or the
                    workplace. Do you currently have any of the following symptoms that are new, worsening, and not
                    attributable to a pre-existing condition?</h4>
                <ul>
                  <li>Fever greater than 100.4 °F or feeling feverish (chills, sweating)</li>
                  <li>Cough</li>
                  <li>Shortness of breath/difficulty breathing</li>
                  <li>Sore throat</li>
                  <li>Unexplained muscle/body aches</li>
                  <li>Nausea/vomiting or diarrhea</li>
                  <li>Loss of senses of taste or smell</li>
                  <li>Runny or congested nose</li>
                  <li>Headache</li>
                  <li> Skin rash</li>
                  <li>Chest pain or pressure</li>
                </ul>
              </Grid.Column>
              <Grid.Column floated='right'>
                <BoolField
                  name='illness'
                  appearance="checkbox"
                  label='Yes'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={11}>
                <h4>Check for Recent COVID-19 Exposure</h4>
                <ul>
                  <li>Have you traveled out of the state and are currently under quarantine orders by the Department
                      of Health or your medical care provider ?
                  </li>
                  <li>Are you unvaccinated and have been in close contact (less than 6 feet for more than 15 minutes,
                      cumulatively, over a 24-hour period) with anyone who has an active, diagnosed case of COVID-19?
                      Note: Healthcare students/personnel wearing appropriate PPE at ALL TIMES while caring for a
                      patient with COVID-19 would NOT be considered a close contact
                  </li>
                  <li>Has the Department of Health told you that you have been in contact with a person with COVID-19
                      AND you are UNvaccinated?
                  </li>
                </ul>
              </Grid.Column>
              <Grid.Column floated='right'>
                <BoolField
                  name='exposure'
                  appearance="checkbox"
                  label='Yes'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <DateField name='date'/>
          <SubmitField value='Submit'/>
          <ErrorsField/>
        </AutoForm>
      </Container>
    );
  }
}

// Require the presence of a Symptom document in the props object. Uniforms adds 'model' to the props, which we use.
EditSymptom.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Symptom documents.
  const subscription = Meteor.subscribe(Symptoms.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Symptoms.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditSymptom);
