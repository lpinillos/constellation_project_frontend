import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Courses from '@/app/(general)/courses/page';
import { useCurrentUser } from '../hooks/auth/useCurrentUser';
import { getUserCourses } from '../services/userService';

// Mock de dependencias
jest.mock('../hooks/auth/useCurrentUser');
jest.mock('../services/userService', () => ({
  getUserCourses: jest.fn(),
}));

describe('Courses Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render "No courses available" message if there are no courses', async () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ user: { user_id: '123', role: 'student' } });
    (getUserCourses as jest.Mock).mockResolvedValue([]);

    render(<Courses />);

    await waitFor(() => {
      expect(screen.getByText('No courses available 😭')).toBeInTheDocument();
    });
  });

  it('should render courses if there are courses available', async () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ user: { user_id: '123', role: 'student' } });
    const mockCourses = [{ id: '1', name: 'Course 1' }, { id: '2', name: 'Course 2' }];
    (getUserCourses as jest.Mock).mockResolvedValue(mockCourses);

    render(<Courses />);

    await waitFor(() => {
      expect(screen.getByText('Course 1')).toBeInTheDocument();
      expect(screen.getByText('Course 2')).toBeInTheDocument();
    });
  });

  it('should filter courses based on search term', async () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ user: { user_id: '123', role: 'student' } });
    const mockCourses = [{ id: '1', name: 'Course 1' }, { id: '2', name: 'Advanced Course' }];
    (getUserCourses as jest.Mock).mockResolvedValue(mockCourses);

    render(<Courses />);

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Search course'), { target: { value: 'Advanced' } });
    });

    await waitFor(() => {
      expect(screen.queryByText('Course 1')).not.toBeInTheDocument();
      expect(screen.getByText('Advanced Course')).toBeInTheDocument();
    });
  });

  it('should show "Add Course" button for professors', async () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ user: { user_id: '123', role: 'teacher' } });
    (getUserCourses as jest.Mock).mockResolvedValue([]);

    render(<Courses />);

    await waitFor(() => {
      expect(screen.getByText('Add Course')).toBeInTheDocument();
    });
  });

  it('should toggle CreateCourseForm on "Add Course" button click', async () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ user: { user_id: '123', role: 'teacher' } });
    (getUserCourses as jest.Mock).mockResolvedValue([]);

    render(<Courses />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add Course'));
      expect(screen.getByText('Create Course')).toBeInTheDocument();
    });
  });

});
