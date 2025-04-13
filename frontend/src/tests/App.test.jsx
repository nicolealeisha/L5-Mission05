import { render, screen, expect } from '@testing-library/react'
import App from '../App';

// test("<App/> renders successfully", () => {
test('HeartBeat', async () => {
    expect(true).toBeTruthy();

    expect(!!process.env.SERVER_URL).toBeTruthy();
    expect(!!process.env.PORT).toBeTruthy();
    expect(!!process.env.PORT_ALT).toBeTruthy();
    expect(!!process.env.ENVIRONMENT).toBeTruthy();

});


// it.todo("Test if the App component renders successfully");
// render(<App/>);
// const element = screen.getByText(/Router/i);
// expect(element).toBeInTheDocument();
// })

// test("<Router/> renders successfully", () => {
// it.todo("Test if the App component renders successfully");

// render(<Router />);
// const element = screen.getByText(/Router/i);
// expect(element).toBeInTheDocument();
// })

// test("<Route path='/404'/> renders 404 Error page successfully", () => {
// it.todo("Test if the App component renders successfully");

// render(<Route path='/404' />);
// const element = screen.getByText(/Page Not Found/i);
// expect(element).toBeInTheDocument();
// })

