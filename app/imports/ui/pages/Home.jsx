import React from 'react';
import { Grid, Card, Button, Icon, List, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vaccines } from '../../api/vaccine/Vaccine';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Grid verticalAlign='middle' textAlign='left' container>

        <Grid.Column width={12}>
          <Card.Group itemsPerRow={1}>
            <Card href='#/daily-check'>
              <Card.Content>
                <Card.Header>
                  <Icon name="info circle"/>Daily Check-In
                </Card.Header>
                <Card.Description>
                  Aloha, don&apos;t hesitate to spend a minute to do the daily check-in. Stay safe and healthy!
                </Card.Description>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>
                Daily health check-in
                  <Button href='#/history' color="blue" floated='right'><Icon name='history'/>View Check-In History</Button>
                </Card.Header>
                <Card.Description>
                Help keep our campus safe by completing your daily health check in!
                  <br/>
                  <List bulleted>
                    <List.Item>Check your symptoms.</List.Item>
                    <List.Item>Keep track of your symptoms every day.</List.Item>
                  </List>
                  <br/>
                  <Button href='#/daily-check' color="blue"><Icon name='heart'/>Check Your Symptoms</Button>
                </Card.Description>
              </Card.Content>
            </Card>
            { this.props.vaccines.length > 0 ?
              <Card>
                <Card.Content>
                  <Card.Header>
                Vaccination Card Submission
                    <Button color="green" floated='right' href=''><Icon name="check"/>Valid</Button>
                  </Card.Header>
                </Card.Content>
              </Card>
              :
              <Card>
                <Card.Content>
                  <Card.Header>
                Vaccination Card Submission
                    <Button color="red" floated='right' href=''><Icon name="warning sign"/>Info Required</Button>
                  </Card.Header>
                  <Card.Description>
                  To speed up the check-in process, you can submit vaccination card to be approved quickly.
                    <br/><br/>
                    <Button href='#/addcard' color="blue">Submit Vaccination Card</Button>
                  </Card.Description>
                </Card.Content>
              </Card> }
            { this.props.vaccines.length > 0 &&
                  <Card>
                    <Card.Content>
                      <Card.Header>
                    Uploaded Vaccine Card
                      </Card.Header>
                    </Card.Content>
                    <Card.Description>
                      <img className="ui medium rounded image" src={ this.props.vaccines[0].picture } alt="vaccine card"/>
                    </Card.Description>
                  </Card>
            }
            <Card>
              <Card.Content>
                <Card.Header>
                  Test Result Submission - In Progress
                  <Button color="red" floated='right' href=''><Icon name="warning sign"/>Info Required</Button>
                </Card.Header>
                <Card.Description>
                To speed up the check-in process, you can submit test result to be approved quickly.
                  <br/><br/>
                  <Button href='' color="blue">Submit a Test Result</Button>
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>

        <Grid.Column width={4}>
          <Card>
            <Card.Content>
              <Card.Header>
              Get COVID-19 Testing
              </Card.Header>
              <Card.Description>
                <List>
                  <List.Item href="https://www.clinicallabs.com/appt/uhtest/" target='_blank'>UH Provided COVID Testing</List.Item>
                  <List.Item href="https://oahucitypass.lumisight.com/" target='_blank'> Other COVID Testing Programs</List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
              Resources
              </Card.Header>
              <Card.Description>
                <List>
                  <List.Item href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" target='_blank'>CDC Guidance</List.Item>
                  <List.Item href="https://health.hawaii.gov/coronavirusdisease2019/" target='_blank'>Hawai&apos;i Guidance</List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>
              Status
              </Card.Header>
              <Card.Description>
                Please complete the safety requirements before going to campus.
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>

      </Grid>
    );
  }
}

Home.propTypes = {
  vaccines: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vaccine documents.
  const subscription = Meteor.subscribe(Vaccines.userPublicationName);
  // Get the Vaccine documents
  const ready = subscription.ready();
  const vaccines = Vaccines.collection.find({}).fetch();
  return {
    vaccines,
    ready,
  };
})(Home);
