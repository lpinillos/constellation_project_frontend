import { render, screen } from '@testing-library/react';
import Signin from '../app/(auth)/signin/page';

jest.mock('../components/forms/LoginForm', () => jest.fn(() => <div>LoginForm Component</div>));

describe('Signin Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the title "Constellation"', () => {
    render(<Signin />);
    expect(screen.getByText('Constellation')).toBeInTheDocument();
  });

  it('should render the subtitle "Sign in."', () => {
    render(<Signin />);
    expect(screen.getByText('Sign in.')).toBeInTheDocument();
  });

  it('should render the description text', () => {
    render(<Signin />);
    expect(screen.getByText('Fill in your credentials to access your account.')).toBeInTheDocument();
  });

  it('should render the LoginForm component', () => {
    render(<Signin />);
    expect(screen.getByText('LoginForm Component')).toBeInTheDocument();
  });

  it('should render the Card component with correct max-width and full width', () => {
    render(<Signin />);
    const card = screen.getAllByRole('paragraph'); 
    expect(card[0]).toHaveClass('text-sm text-muted-foreground');
  });
  
});
