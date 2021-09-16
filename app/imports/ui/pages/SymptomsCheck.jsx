import React from 'react';
import { Grid, Header, Container, Loader } from 'semantic-ui-react';
import { AutoForm, SubmitField, BoolField, DateField, ErrorsField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Symptoms } from '../../api/symptom/Symptom';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  testPos: {
    type: Boolean,
    optional:true
  },
  illness: {
    type: Boolean,
    optional:true
  },
  exposure: {
    type: Boolean,
    optional:true
  },
  date: Date,
});


const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SymptomsCheck extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    console.log(data);
    const { testPos, illness, exposure, date } = data;
    const owner = Meteor.user().username;
    Symptoms.collection.insert({ testPos, illness, exposure, date, owner },
      (error, result) => {
        if (error) {
          console.error(err);
        }
        let sick = testPos || illness || exposure;
        if (sick) {
          swal('Stay Home', 'Please DO NOT report to campus. DO NOT attend UH in-person events or activities.');
        } else {
          swal('Success', 'You may report to campus and adhere to location restrictions.', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Container>
        <Header as="h2" textAlign="center">Daily Symptoms Check</Header>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <Grid container>
            <Grid.Row>
              <Grid.Column width={11}>
                <h4>Have you tested positive for COVID-19 and are on home isolation?</h4>
              </Grid.Column>
              <Grid.Column floated='right'>
                <BoolField
                  name='testPos'
                  appearance="checkbox"
                  appearance="toggle"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={10}>
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
              </Grid.Column>
              <Grid.Column floated='right'>
                <BoolField
                  name='illness'
                  appearance="checkbox"
                  appearance="toggle"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={11}>
                <h4>Check for Recent COVID-19 Exposure</h4>
                <ul>
                  <li>Have you traveled out of the state and are currently under quarantine orders by the Department of Health or your medical care provider ?</li>
                  <li>Are you unvaccinated and have been in close contact (less than 6 feet for more than 15 minutes, cumulatively, over a 24-hour period) with anyone who has an active, diagnosed case of COVID-19?  Note: Healthcare students/personnel wearing appropriate PPE at ALL TIMES while caring for a patient with COVID-19 would NOT be considered a close contact</li>
                  <li>Has the Department of Health told you that you have been in contact with a person with COVID-19 AND you are UNvaccinated?</li>
                </ul>
              </Grid.Column>
              <Grid.Column floated='right'>
                <BoolField
                   name='exposure'
                   appearance="checkbox"
                   appearance="toggle"
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

export default SymptomsCheck;
