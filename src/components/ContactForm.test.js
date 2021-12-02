import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
    //Arrange
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    //Arrange
    render(<ContactForm/>)

    //Act
    const header = screen.queryByText(/contact form/i);

    //Assert
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/contact form/i)
;});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    // 1. Find the firstName field
    const firstName = screen.getByLabelText(/first name/i);
    //Could also do const firstName = screen.getByPlaceholderText('Edd');
    // 2. Type in a first name
    userEvent.type(firstName, "Amy");
    const firstNameErrors = screen.queryByText(/error: firstName must have at least 5 characters/i);

    //Assert
    expect(firstNameErrors).toBeInTheDocument();
    expect(firstNameErrors).toBeTruthy();
    expect(firstNameErrors).toHaveTextContent(/error: firstName must have at least 5 characters/i);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    // 1. Find the button
    const button = screen.getByRole("button");
    // Click the button
    userEvent.click(button);

    //Errors
    const fNError = screen.queryByText(/error: firstName must have at least 5 characters/i);
    const lNError = screen.queryByText(/error: lastName is a required field/i);
    const emailError = screen.queryByText(/error: email must be a valid email address/i);

    //Assert
    //fNError
    expect(fNError).toBeInTheDocument();
    expect(fNError).toBeTruthy();
    expect(fNError).not.toBeFalsy();

    //lnError
    expect(lNError).toBeInTheDocument();
    expect(lNError).toBeTruthy();
    expect(lNError).not.toBeFalsy();

    //emailError
    expect(emailError).toBeInTheDocument();
    expect(emailError).toBeTruthy();
    expect(emailError).not.toBeFalsy();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    // 1. Find the firstName field
    const firstName = screen.getByLabelText(/first name/i);
    // 2. Type in a first name
    userEvent.type(firstName, "Hannah");
    // 3. Find the lastName field
    const lastName = screen.getByLabelText(/last name/i);
    // 4. Type in a last name
    userEvent.type(lastName, "Brog");
    // 5. Find the button
    const button = screen.getByRole("button");
    // 6. Click the button
    userEvent.click(button);

    const emailError = screen.queryByText(/error: email must be a valid email address/i);

    //Assert
    expect(emailError).toBeInTheDocument();
    expect(emailError).toBeTruthy();
    expect(emailError).not.toBeFalsy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    // 1. Find the email field
    const email = screen.getByLabelText(/email/i)
    // 2. Type in an email
    userEvent.type(email, "hello");

    //Errors
    const emailError = screen.queryByText(/error: email must be a valid email address/i);

    //Assert
    expect(emailError).toBeInTheDocument();
    expect(emailError).toBeTruthy();
    expect(emailError).not.toBeFalsy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    // 5. Find the button
    const button = screen.getByRole("button");
    // Click the button
    userEvent.click(button);

    //Errors
    const lNError = screen.queryByText(/error: lastName is a required field/i);

    //Assert
    expect(lNError).toBeInTheDocument();
    expect(lNError).toBeTruthy();
    expect(lNError).not.toBeFalsy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    // 1. Find the firstName field
    const firstName = screen.getByLabelText(/first name/i);
    // 2. Type in a first name
    userEvent.type(firstName, "Hannah");
    // 3. Find the lastName field
    const lastName = screen.getByLabelText(/last name/i);
    // 4. Type in a last name
    userEvent.type(lastName, "Brog");
    // 5. Find the email field
    const email = screen.getByLabelText(/email/i)
    // 6. Type in an email
    userEvent.type(email, "han@gmail.com");
    // 7. Find the button
    const button = screen.getByRole("button");
    // 8. Click the button
    userEvent.click(button);

    await waitFor(() => {
        const fN = screen.queryByText("Hannah");
        const lN = screen.queryByText("Brog");
        const eM = screen.queryByText("han@gmail.com");
        const message = screen.queryByText("hello there");

        //Assert
        //fN
        expect(fN).toBeInTheDocument();
        expect(fN).toBeTruthy();
        expect(fN).not.toBeFalsy();

        //lN
        expect(lN).toBeInTheDocument();
        expect(lN).toBeTruthy();
        expect(lN).not.toBeFalsy();

        //eM
        expect(eM).toBeInTheDocument();
        expect(eM).toBeTruthy();
        expect(eM).not.toBeFalsy();

        //message
        expect(message).not.toBeInTheDocument();
        // expect(message).not.toBeTruthy();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    //Arrange
    render(<ContactForm/>)

    //Act
    // 1. Find the firstName field
    const firstName = screen.getByLabelText(/first name/i);
    // 2. Type in a first name
    userEvent.type(firstName, "Hannah");
    // 3. Find the lastName field
    const lastName = screen.getByLabelText(/last name/i);
    // 4. Type in a last name
    userEvent.type(lastName, "Brog");
    // 5. Find the email field
    const email = screen.getByLabelText(/email/i)
    // 6. Type in an email
    userEvent.type(email, "han@gmail.com");
    // 7. Find the button
    const button = screen.getByRole("button");
    // 8. Click the button
    userEvent.click(button);

    await waitFor(() => {
        const fN = screen.queryByText("Hannah");
        const lN = screen.queryByText("Brog");
        const eM = screen.queryByText("han@gmail.com");
        const message = screen.queryByText("hello there");

        //Assert
        //fN
        expect(fN).toBeInTheDocument();
        expect(fN).toBeTruthy();
        expect(fN).not.toBeFalsy();

        //lN
        expect(lN).toBeInTheDocument();
        expect(lN).toBeTruthy();
        expect(lN).not.toBeFalsy();

        //eM
        expect(eM).toBeInTheDocument();
        expect(eM).toBeTruthy();
        expect(eM).not.toBeFalsy();

        //message
        expect(message).not.toBeInTheDocument();
        expect(message).not.toBeTruthy();
    })
})