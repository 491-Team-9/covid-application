import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class SymptomsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SymptomsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      testPos: {
        type: Boolean,
        defaultValue: false,
      },
      illness: {
        type: Boolean,
        defaultValue: false,
      },
      exposure: {
        type: Boolean,
        defaultValue: false,
      },
      owner: String,
      date: {
        type: Date,
        defaultValue: new Date(),
      },
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
export const Symptoms = new SymptomsCollection();
