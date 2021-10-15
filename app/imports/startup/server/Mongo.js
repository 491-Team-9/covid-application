import { Meteor } from 'meteor/meteor';
import { Symptoms } from '../../api/symptom/Symptom';
import { Vaccines } from '../../api/vaccine/Vaccine';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addSymptoms(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Symptoms.collection.insert(data);
}

function addVaccines(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vaccines.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Symptoms.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addSymptoms(data));
  }
}

if (Vaccines.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addVaccines(data));
  }
}
