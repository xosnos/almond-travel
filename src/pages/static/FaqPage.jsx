import React from 'react';
import {
  Container
} from 'react-bootstrap';

export const FaqPage = () => {
  return (
    <Container>
      <h1>Frequently Asked Questions</h1>
      <h2>How do I use my account?</h2>
      <p>
        First, either log in to your existing account or sign up
        to create account by clicking the link in the navigation
        bar at the top of the screen. After doing this, you will
        be able to book hotels and flights, use our checklist
        and forums features, and view your account information.
      </p>
      <h2>How do I book a flight only?</h2>
      <p>
        The main purpose of this application is to guide you in
        booking an entire trip to the United States. This is the
        main difference between this application and other flight
        booking applications. To book a flight, you must first
        create a trip. To do this, click the "New Trip" link in
        the navigation bar or the Create New Trip card on the
        home page. It's recommended you follow through all the
        steps in the trip creation process, but you can skip
        the hotel booking step if you only want to book a flight.
      </p>
      <h2>Will I be making any payments through the app?</h2>
      <p>
        No. We do not handle any payments. We only provide you
        with links to the websites of our partners, where you can
        complete your bookings and make your payments. We do not
        keep track of your credit card information.
      </p>
      <h2>What data do you keep track of?</h2>
      <p>
        We only keep track of the data you provide us, including
        your email address, inputs you provide in the trip creation
        process, and any posts/responses you make in the forums.
        We do not keep track of your password, and we do not sell
        your data to third parties.
      </p>
    </Container>
  );
}