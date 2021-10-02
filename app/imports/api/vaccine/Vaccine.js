import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const vaccines = ['Pfizer-BioNTech COVID-19', 'Moderna COVID-19', 'Janssen COVID-19 (Johnson & Johnson)', 'AstraZeneca-AZD1222',
  'Sinopharm BIBP-SARS-CoV-2', 'Sinovac-SARS-CoV-2', 'Gamelya-Sputnik V', 'CanSinoBio', 'Vector - EpiVacCorona',
  'Zhifei Longcom - Recombinant Novel', 'IMBCAMS -SARS-CoV-2', 'Novavax'];

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class VaccinesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VaccinesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
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
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Vaccines = new VaccinesCollection();
