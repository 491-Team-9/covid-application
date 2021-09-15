import React from 'react';
import { Grid, Header, Radio } from 'semantic-ui-react';
import { AutoForm } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Symptoms } from '../../api/symptom/Symptom';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  testPos: Boolean,
  illness: Boolean,
  exposure: Boolean,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SymptomsCheck extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { testPos, illness, exposure } = data;
    const owner = Meteor.user().username;
    Symptoms.collection.insert({ testPos, illness, exposure, owner },
      (sick = !testPos || !illness || !exposure) => {
        if (sick) {
          swal('Stay Home', error.message, 'Please DO NOT report to campus. DO NOT attend UH in-person events or activities.');
        } else {
          swal('Success', 'You may report to campus and adhere to location restrictions.', 'success');
          formRef.reset();
        }
      });
  }

  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Header as="h2" textAlign="center">Daily Symptoms Check</Header>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Grid.Column>
          <Grid.Row>
            <h4>Have you tested positive for COVID-19 and are on home isolation?</h4>
          </Grid.Row>
          <Grid.Row>
            <h4>Check for Symptoms of Illness:  If you have any symptoms of illness, do not come to campus or the workplace.  Do you currently have any of the following symptoms that are new, worsening, and not attributable to a pre-existing condition?</h4>
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
          </Grid.Row>
          <Grid.Row>
            <h4>Check for Recent COVID-19 Exposure</h4>
            <ul>
              <li>Have you traveled out of the state and are currently under quarantine orders by the Department of Health or your medical care provider ?</li>
              <li>Are you unvaccinated and have been in close contact (less than 6 feet for more than 15 minutes, cumulatively, over a 24-hour period) with anyone who has an active, diagnosed case of COVID-19?  Note: Healthcare students/personnel wearing appropriate PPE at ALL TIMES while caring for a patient with COVID-19 would NOT be considered a close contact</li>
              <li>Has the Department of Health told you that you have been in contact with a person with COVID-19 AND you are UNvaccinated?</li>
            </ul>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            <Radio
              label='Yes'
              name='testPos'
              value='true'
              checked={this.state.value === 'true'}
              onChange={this.handleChange}
            />
            <Radio
              label='No'
              name='testPos'
              value='false'
              checked={this.state.value === 'false'}
              onChange={this.handleChange}
            />
          </Grid.Row>
          <Grid.Row>
            <Radio
              label='Yes'
              name='illness'
              value='true'
              checked={this.state.value === 'true'}
              onChange={this.handleChange}
            />
            <Radio
              label='No'
              name='illness'
              value='false'
              checked={this.state.value === 'false'}
              onChange={this.handleChange}
            />
          </Grid.Row>
          <Grid.Row>
            <Radio
              label='Yes'
              name='exposure'
              value='true'
              checked={this.state.value === 'true'}
              onChange={this.handleChange}
            />
            <Radio
              label='No'
              name='exposure'
              value='false'
              checked={this.state.value === 'false'}
              onChange={this.handleChange}
            />
          </Grid.Row>
        </Grid.Column>
        </AutoForm>
      </Grid>
    );
  }
}

export default SymptomsCheck;