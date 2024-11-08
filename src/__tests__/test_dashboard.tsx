import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(general)/dashboard/page';
import CardDashboard from '@/components/ui/dashboard-cards';
import { DashboardCarousel } from '@/components/ui/dashboard-carousel';
import DashboardTable from '@/components/ui/dashboard-table';

// Mock de componentes
jest.mock('../components/ui/dashboard-cards', () => jest.fn(() => <div>CardDashboard Component</div>));
jest.mock('../components/ui/dashboard-carousel', () => ({
  DashboardCarousel: jest.fn(() => <div>DashboardCarousel Component</div>)
}));
jest.mock('../components/ui/dashboard-table', () => jest.fn(() => <div>DashboardTable Component</div>));

describe('DashboardPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the main title "Dashboard"', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render the "Last courses" subtitle', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Last courses')).toBeInTheDocument();
  });

  it('should render the "Last activities" subtitle', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Last activities')).toBeInTheDocument();
  });

  it('should render the CardDashboard component', () => {
    render(<DashboardPage />);
    expect(screen.getByText('CardDashboard Component')).toBeInTheDocument();
  });

  it('should render the DashboardCarousel component', () => {
    render(<DashboardPage />);
    expect(screen.getByText('DashboardCarousel Component')).toBeInTheDocument();
  });

  it('should render the DashboardTable component', () => {
    render(<DashboardPage />);
    expect(screen.getByText('DashboardTable Component')).toBeInTheDocument();
  });
});
