import React from 'react';
import {render} from 'react-dom';
import App from './App';
import Footer from './components/Footer';

// import { render, screen } from '@testing-library/react';
// import App from './App';
// import { act } from 'react';
// import ReactDOMClient from 'react-dom/client';
// import ReactDOM from 'react-dom';
// import { render, screen } from 'react-dom'
window.React = React

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
const mockRender = jest.fn();

const MockFooter = ({}) => {
    return (
        <Router>
            <Footer />
        </Router>
    )
}

test('Footer displays in app', async () => {
    // 
    // const containeRRR = document.createElement('div');
    // document.body.appendChild(containeRRR);
    // await act(async (containeRRR) => {
    //     ReactDOMClient.createRoot(containeRRR).render(<MockFooter />);
    // });

    render(        <MockFooter />    );
    const div = screen.findByRole('div');
    console.log(div)
    const footerElement = screen.getByText(/2025 Trade Me Limited/);
    expect(div).not.toBeInTheDocument();    
});

// it('should render footer', async () => {
//     render(
//         <MockFooter />
//     );
//     const footerElement = screen.getByText(/2025 Trade Me Limited/);
//     expect(footerElement).toBeInTheDocument();
// })

// it('can render an App tag', async () => {
//     const containeRRR = document.createElement('div');
//     document.body.appendChild(containeRRR);
//     await act((containeRRR) => {
//         ReactDOMClient.createRoot(containeRRR).render(<App />);
//     });
//     const Header = containeRRR.querySelector('Header');
//     const Footer = containeRRR.querySelector('Footer');
//     expect(mockRender).toHaveBeenCalled();
//     expect(Header).toContain('Nav');
//     expect(Footer).toBe('Footer');
//     expect(/TradeMe/).toBeInTheDocument();
// });


















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




// jest.mock("react-dom/client", () => ({
//     createRoot: jest.fn().mockImplementation(() => ({
//         render: mockRender,
//     }))
// }));