import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopNavbar from "@/components/topNavbar";

// Mock iconsax-react
jest.mock("iconsax-react", () => ({
  User: jest.fn(({ size, color, variant, ...props }) => (
    <svg
      data-testid="user-icon"
      width={size}
      height={size}
      fill={color}
      data-variant={variant}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )),
}));

describe("TopNavbar Component", () => {
  const defaultProps = {
    userName: "John Doe",
    semester: 5,
    department: "Computer Science",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear console warnings
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
  });

  describe("Rendering Tests", () => {
    it("renders without crashing", () => {
      render(<TopNavbar {...defaultProps} />);
      expect(screen.getByText("Hello,")).toBeInTheDocument();
    });

    it("displays user name correctly", () => {
      render(<TopNavbar {...defaultProps} />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toHaveClass("font-bold");
    });

    it("displays semester and department correctly", () => {
      render(<TopNavbar {...defaultProps} />);
      expect(screen.getByText("S5, Computer Science")).toBeInTheDocument();
    });

    it("renders user profile button", () => {
      render(<TopNavbar {...defaultProps} />);
      const profileButton = screen.getByRole("button", {
        name: /open user profile/i,
      });
      expect(profileButton).toBeInTheDocument();
      expect(profileButton).toHaveAttribute("title", "User Profile");
    });

    it("renders user icon with correct properties", () => {
      render(<TopNavbar {...defaultProps} />);
      const userIcon = screen.getByTestId("user-icon");
      expect(userIcon).toBeInTheDocument();
      expect(userIcon).toHaveAttribute("width", "28");
      expect(userIcon).toHaveAttribute("height", "28");
      expect(userIcon).toHaveAttribute("fill", "white");
      expect(userIcon).toHaveAttribute("data-variant", "Linear");
    });
  });

  describe("Props Handling Tests", () => {
    it('shows "Guest" when userName is empty string', () => {
      render(<TopNavbar {...defaultProps} userName="" />);
      expect(screen.getByText(/Guest/)).toBeInTheDocument();
    });

    it('shows "Guest" when userName is null', () => {
      render(<TopNavbar {...defaultProps} userName={null} />);
      expect(screen.getByText(/Guest/)).toBeInTheDocument();
    });

    it("handles missing semester", () => {
      render(<TopNavbar {...defaultProps} semester={null} />);
      expect(screen.getByText("Computer Science")).toBeInTheDocument();
      expect(screen.queryByText(/S\d+/)).not.toBeInTheDocument();
    });

    it("handles zero semester correctly", () => {
      render(<TopNavbar {...defaultProps} semester={0} />);
      expect(screen.queryByText(/S0/)).not.toBeInTheDocument();
      expect(screen.getByText("Computer Science")).toBeInTheDocument();
    });

    it("displays different semester numbers correctly", () => {
      const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

      semesters.forEach((sem) => {
        const { unmount } = render(
          <TopNavbar {...defaultProps} semester={sem} />,
        );
        expect(
          screen.getByText(`S${sem}, Computer Science`),
        ).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Interaction Tests", () => {
    it("calls console.warn when profile button is clicked", () => {
      const consoleSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      render(<TopNavbar {...defaultProps} />);
      const profileButton = screen.getByRole("button", {
        name: /open user profile/i,
      });

      fireEvent.click(profileButton);

      expect(consoleSpy).toHaveBeenCalledWith("Profile Clicked");
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it("button has correct hover states via CSS classes", () => {
      render(<TopNavbar {...defaultProps} />);
      const profileButton = screen.getByRole("button", {
        name: /open user profile/i,
      });

      expect(profileButton).toHaveClass(
        "transition-colors",
        "hover:bg-purple-300",
        "dark:hover:bg-purple-700",
      );
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper accessibility attributes", () => {
      render(<TopNavbar {...defaultProps} />);
      const profileButton = screen.getByRole("button", {
        name: /open user profile/i,
      });

      expect(profileButton).toHaveAttribute("aria-label", "Open user profile");
      expect(profileButton).toHaveAttribute("title", "User Profile");
      expect(profileButton).toHaveAttribute("type", "button");
    });

    it("has proper semantic structure", () => {
      const { container } = render(<TopNavbar {...defaultProps} />);

      // Check for proper button element
      const button = container.querySelector('button[type="button"]');
      expect(button).toBeInTheDocument();

      // Check for text hierarchy
      const userNameElement = screen.getByText("John Doe");
      expect(userNameElement.closest("p")).toHaveClass("text-2xl");
    });
  });

  describe("CSS Classes and Styling Tests", () => {
    it("applies correct container classes", () => {
      const { container } = render(<TopNavbar {...defaultProps} />);

      const headerContainer = container.firstChild;
      expect(headerContainer).toHaveClass(
        "flex",
        "items-center",
        "justify-between",
        "px-4",
        "py-7",
        "bg-gradient-to-b",
      );
    });

    it("applies correct user info classes", () => {
      render(<TopNavbar {...defaultProps} />);

      const userName = screen.getByText("John Doe");
      expect(userName.closest("p")).toHaveClass("text-2xl", "text-foreground");

      const userDetails = screen.getByText("S5, Computer Science");
      expect(userDetails).toHaveClass("text-md", "text-foreground");
    });

    it("applies correct button classes", () => {
      render(<TopNavbar {...defaultProps} />);
      const profileButton = screen.getByRole("button", {
        name: /open user profile/i,
      });

      expect(profileButton).toHaveClass(
        "flex",
        "size-10",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-gray-600",
        "transition-colors",
      );
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles very long user names", () => {
      const longName =
        "This is a very long user name that might cause layout issues";
      render(<TopNavbar {...defaultProps} userName={longName} />);

      const userNameElement = screen.getByText(longName);
      expect(userNameElement.closest("p")).toHaveClass("truncate");
    });

    it("handles very long department names", () => {
      const longDept = "Very Long Department Name That Might Overflow";
      render(<TopNavbar {...defaultProps} department={longDept} />);

      const deptElement = screen.getByText(`S5, ${longDept}`);
      expect(deptElement).toHaveClass("truncate");
    });

    it("handles extreme semester numbers", () => {
      render(<TopNavbar {...defaultProps} semester={-1} />);
      expect(screen.queryByText(/S-1/)).not.toBeInTheDocument();
    });

    it("handles undefined props", () => {
      render(
        <TopNavbar
          userName={undefined}
          semester={undefined}
          department={undefined}
        />,
      );
      expect(screen.getByText("Guest")).toBeInTheDocument();
    });
  });

  describe("Component Integration Tests", () => {
    it("maintains layout structure with different prop combinations", () => {
      const testCases = [
        { userName: "Alice", semester: 1, department: "ECE" },
        { userName: "Bob", semester: null, department: "ME" },
        { userName: "", semester: 3, department: "" },
        { userName: "Charlie", semester: 8, department: "Civil Engineering" },
      ];

      testCases.forEach((props) => {
        const { unmount } = render(<TopNavbar {...props} />);

        // Should always have the main structure
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("user-icon")).toBeInTheDocument();

        unmount();
      });
    });

    it("works with different CSS custom properties", () => {
      const { container } = render(<TopNavbar {...defaultProps} />);

      // Check that CSS custom properties are used
      const headerDiv = container.querySelector(".bg-gradient-to-b");
      expect(headerDiv).toHaveClass("to-[var(--main)]");
      expect(headerDiv).toHaveClass("shadow-[0_8px_20px_10px_var(--main)]");
    });
  });

  describe("Performance Tests", () => {
    it("renders quickly with minimal re-renders", () => {
      const startTime = performance.now();

      render(<TopNavbar {...defaultProps} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within 50ms
      expect(renderTime).toBeLessThan(50);
    });

    it("handles multiple rapid clicks without issues", () => {
      const consoleSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      render(<TopNavbar {...defaultProps} />);
      const profileButton = screen.getByRole("button", {
        name: /open user profile/i,
      });

      // Simulate rapid clicks
      for (let i = 0; i < 5; i++) {
        fireEvent.click(profileButton);
      }

      expect(consoleSpy).toHaveBeenCalledTimes(5);
    });
  });
});
