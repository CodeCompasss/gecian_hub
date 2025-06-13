// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock lucide-react icons to avoid ES module issues
jest.mock("lucide-react", () => ({
  ChevronLeft: jest.fn(({ className, ...props }) => (
    <svg className={className} data-testid="chevron-left-icon" {...props}>
      <path d="chevron-left" />
    </svg>
  )),
  ChevronRight: jest.fn(({ className, ...props }) => (
    <svg className={className} data-testid="chevron-right-icon" {...props}>
      <path d="chevron-right" />
    </svg>
  )),
  // Add other icons you use
  Calendar: jest.fn(({ className, ...props }) => (
    <svg className={className} data-testid="calendar-icon" {...props}>
      <path d="calendar" />
    </svg>
  )),
  Clock: jest.fn(({ className, ...props }) => (
    <svg className={className} data-testid="clock-icon" {...props}>
      <path d="clock" />
    </svg>
  )),
  // Mock any other lucide icons you use in your project
}));
