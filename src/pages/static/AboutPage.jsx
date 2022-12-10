import React from 'react';
import {
  Col,
  Container, Image, Row
} from 'react-bootstrap';

export const AboutPage = () => {
  return (
    <Container>
      <h1>About</h1>
      <Row>
        <Col>
          <p>
            Almond Travel is a beginner friendly travel planning application 
            specifically designed for first time travelers to the United States.
            Currently, the process of going on a trip involves multiple steps,
            all of which require different apps and websites.
            Flights must be booked on one platform, hotels on another,
            and information about restaurants and attactions involves
            painstakingly research across multiple web sources.
            Almond Travel aims to simplify this process by providing a single
            platform for all of these needs. In addition to travel planning,
            other features include forums for users to post and interact with
            other users heading to similiar locations, articles about the
            United States immigration and citizenship processes, and tips for
            traveling there.
          </p>
        </Col>
      </Row>
      <Row xs={1} xl={2}>
        <Col>
          <Image
            src="https://ece.engin.umich.edu/wp-content/uploads/sites/4/2019/08/north-campus-768x512.jpg"
            fluid
          />
        </Col>
        <Col>
          <p>Almond Travel originally started as a capstone project by
            The Almonds Dev Team (5 CS students) for the University of
            Michigan's Human-Centered Software Design and Development course
            aka EECS 497. 
          </p>
          <p>
            The emphasis of the project was on the design process, and the
            team was tasked with considering a target audience that they
            weren't familiar with, in order to strengthen their design
            abilities and challenge themselves to be more accomodating of
            different people and different perspectives. Since all the members
            of the team are United States residents who don't frequently travel,
            they decided that a travel website that targets users who are 
            visiting the United States (potential for the first time) would
            meet this requirement and be a very good learning experience.
          </p>
          <p>
            Although the initial project was functional for the final demo
            in Winter 2022, it required mocked-up data for flights and hotels,
            a back-end on Heruoku that would shut-down after being left idle
            (in which later became no longer an option due the elimination
            of the free tier plans), and multiple parts of the project felt
            incomplete and/or unstable. A team member, Steven Nguyen (xosnos),
            decided he wanted to continue working on the project during the
            Fall 2022 semester as part of his independent study (EECS 499).
            His goals were to refine the main feature of the application so that
            users can realistically plan their trips with ease and to
            migrate the back-end to Firebase for long-term stability.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>

          <p>
            Future plans for this application include adding more features to
            the forums, adding more articles, and improve the overall experience
            for users. As of now, the application is still in development and is
            not yet ready for public use.
          </p>
          <p>
            If you have any questions or comments, please feel free to contact
            us through the link below.
          </p>
        </Col>
      </Row>
    </Container>
  );
}