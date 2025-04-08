import { render, screen, expect } from '@testing-library/react'
import App from '../App';

test("<App/> renders successfully", () => {
    render(<App/>);
    const element = screen.getByText(/Router/i);
    expect(element).toBeInTheDocument();
})

test("<Router/> renders successfully", () => {
    render(<Router/>);
    const element = screen.getByText(/Router/i);
    expect(element).toBeInTheDocument();
})

test("<Route path='/404'/> renders 404 Error page successfully", () => {
    render(<Route path='/404'/>);
    const element = screen.getByText(/Page Not Found/i);
    expect(element).toBeInTheDocument();
})

