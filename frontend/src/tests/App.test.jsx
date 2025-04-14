import { act } from 'react';
import ReactDOMClient from 'react-dom/client';
import App from '../App';
const mockRender = jest.fn();

jest.mock("react-dom/client", () => ({
    createRoot: jest.fn().mockImplementation(() => ({
        render: mockRender,
    }))
}));

it('can render an App tag', async () => {
    const containeRRR = document.createElement('div');
    document.body.appendChild(containeRRR);

    // ✅ Render the component inside act().
    await act((containeRRR) => {
        ReactDOMClient.createRoot(containeRRR).render(<App />);
    });

    const Header = containeRRR.querySelector('Header');
    const Footer = containeRRR.querySelector('Footer');
    expect(mockRender).toHaveBeenCalled();
    expect(Header).toContain('Nav');
    expect(Footer).toBe('Footer');
    expect(/TradeMe/).toBeInTheDocument();

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

