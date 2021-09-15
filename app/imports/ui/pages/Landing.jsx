import React from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing' textAlign='center'>
        <Grid.Column width={5}>
          <Card.Group itemsPerRow={1}>
            <Card>
              <Card.Content>
                <Card.Header>
                    Welcome to ProtectUH
                </Card.Header>
                <Card.Description>
                    To help keep our campus safe, we are asking students, faculty, staff, and visitors to take a daily
                    questionnaire.
                  <br/><br/><Button href='#/home' color="blue">Continue</Button>
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
