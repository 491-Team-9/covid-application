import React from 'react';
import { Grid, Card, Button, Icon, List } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
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
            <Card>
              <Card.Content>
                <Card.Header>
                Vaccination Card Submission - In Progress
                  <Button color="red" floated='right' href=''><Icon name="warning sign"/>Info Required</Button>
                </Card.Header>
                <Card.Description>
                  To speed up the check-in process, you can submit vaccination card to be approved quickly.
                  <br/><br/>
                  <Button href='' color="blue">Submit Vaccination Card</Button>
                </Card.Description>
              </Card.Content>
            </Card>
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

export default Home;
