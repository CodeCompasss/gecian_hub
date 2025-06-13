import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResponsiveDashboard from "@/components/home/ResponsiveDashboard";

describe("ResponsiveDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<ResponsiveDashboard />);
    expect(screen.getByTestId("quick-actions")).toBeInTheDocument();
    expect(screen.getByTestId("timetable-block")).toBeInTheDocument();
  });

  it("has correct layout structure", () => {
    const { container } = render(<ResponsiveDashboard />);

    // Check main container classes
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeInTheDocument();

    // Check max-width container
    const maxWidthContainer = container.querySelector(".max-w-7xl");
    expect(maxWidthContainer).toBeInTheDocument();

    // Check flex container for md screens
    const flexContainer = container.querySelector(".md\\:flex");
    expect(flexContainer).toBeInTheDocument();
  });

  it("applies responsive classes correctly", () => {
    const { container } = render(<ResponsiveDashboard />);

    // Check section has responsive height classes
    const section = container.querySelector("section");
    expect(section).toHaveClass(
      "h-[64vh]",
      "sm:h-[55vh]",
      "md:h-full",
      "md:w-1/2",
    );
  });

  it("renders both child components", () => {
    render(<ResponsiveDashboard />);

    // Verify both components are rendered
    expect(screen.getByTestId("quick-actions")).toBeInTheDocument();
    expect(screen.getByTestId("timetable-block")).toBeInTheDocument();
  });

  it("has proper semantic HTML structure", () => {
    const { container } = render(<ResponsiveDashboard />);

    // Check for semantic elements
    const main = container.querySelector("main");
    const section = container.querySelector("section");

    expect(main).toBeInTheDocument();
    expect(section).toBeInTheDocument();
  });
});
