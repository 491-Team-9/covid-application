import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import { AutoForm, TextField, DateField, ErrorsField, SubmitField, SelectField } from 'uniforms-semantic';
import { HTMLFieldProps, connectField } from 'uniforms';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
// import { Symptoms } from '../../api/symptom/Symptom';
import { Vaccines } from '../../api/vaccine/Vaccine';
import ImageField from '../components/ImageComponent';

const vaccines = ['Pfizer-BioNTech COVID-19', 'Moderna COVID-19', 'Janssen COVID-19 (Johnson & Johnson)', 'AstraZeneca-AZD1222',
  'Sinopharm BIBP-SARS-CoV-2', 'Sinovac-SARS-CoV-2', 'Gamelya-Sputnik V', 'CanSinoBio', 'Vector - EpiVacCorona',
  'Zhifei Longcom - Recombinant Novel', 'IMBCAMS -SARS-CoV-2', 'Novavax'];

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  patientNumber: String,
  vaccineName: { type: String, allowedValues: vaccines },
  firstLotNum: String,
  firstDate: Date,
  firstSite: String,
  secondLotNum: String,
  secondDate: Date,
  secondSite: String,
  picture: {
    type: 'string',
    uniforms: { component: ImageField }
  }
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class VaccineCard extends React.Component {

  // On submit, insert the data.
  async submit(data, formRef) {
    const { firstName, lastName, patientNumber, vaccineName, firstLotNum, firstDate, firstSite,
      secondLotNum, secondDate, secondSite, picture } = data;
    //get picture as binary blob 
    let blob = await fetch(picture).then(r => r.blob());
    var reader = new FileReader();
    //turn blob into base64 encoded string and send to backend
    reader.onloadend = () => {
      var base64data = reader.result;                
      const owner = Meteor.user().username;
      Vaccines.collection.insert({ firstName, lastName, patientNumber, vaccineName, firstLotNum, firstDate, firstSite,
        secondLotNum, secondDate, secondSite, owner, picture: base64data },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          let result = swal('Success', 'Please wait for confirmation before reporting to campus', 'success');
          formRef.reset();
        }
      });
    }
    reader.readAsDataURL(blob);
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Container>
        <Header as="h1" textAlign="left">Edit Vaccine Registry</Header>
        <AutoForm ref={ref => {
          fRef = ref;
        }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
          <Grid container>
            <Grid.Row columns="equal">
              <Grid.Column>
                <h4>First Name</h4>
                <TextField name="firstName" placeholder="First Name" label={false}/>
              </Grid.Column>
              <Grid.Column>
                <h4>Last Name</h4>
                <TextField name="lastName" placeholder="Last Name" label={false}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <h4>Patient Number (medical record or IIS record number)</h4>
                <TextField name="patientNumber" placeholder="Patient Number" label={false}/>
              </Grid.Column>
              <Grid.Column>
                <h4>Vaccine Name</h4>
                <SelectField name="vaccineName" label={false}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <h2>1st Dose</h2>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <h4>Manufacturer Lot Number</h4>
                <TextField name="firstLotNum" placeholder="Manufacturer Lot Number" label={false}/>
              </Grid.Column>
              <Grid.Column>
                <h4>Date</h4>
                <DateField name='firstDate' label={false}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <h4>Healthcare Professional or Clinic Site</h4>
                <TextField name="firstSite" placeholder="Healthcare Professional or Clinic Site" label={false}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <h2>2nd Dose</h2>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <h4>Manufacturer Lot Number</h4>
                <TextField name="secondLotNum" placeholder="Manufacturer Lot Number" label={false}/>
              </Grid.Column>
              <Grid.Column>
                <h4>Date</h4>
                <DateField name='secondDate' label={false}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <h4>Healthcare Professional or Clinic Site</h4>
                <TextField name="secondSite" placeholder="Healthcare Professional or Clinic Site" label={false}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <h2>Vaccine Card</h2>
            </Grid.Row>
            <Grid.Row>
              <ImageField name="picture"/>
            </Grid.Row>
            <SubmitField value='Submit'/>
          </Grid>
          <ErrorsField/>
        </AutoForm>
      </Container>
    );
  }
}

export default VaccineCard;
