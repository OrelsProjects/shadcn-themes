import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyCode from "@/components/bottom-navbar/copy-code";
import { describe, vi } from "vitest";
import StoreProvider from "@/providers/StoreProvider";

// Mock clipboard API
const mockClipboard = {
  writeText: vi.fn(),
};
Object.assign(navigator, {
  clipboard: mockClipboard,
});

// Mock EventTracker
vi.mock("@/eventTracker", () => ({
  EventTracker: {
    track: vi.fn(),
  },
}));

// Mock usePalette hook
vi.mock("@/hooks/usePalette", () => ({
  usePalette: () => ({
    addCopyCode: vi.fn(),
  }),
}));

describe("CopyCode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the copy button", () => {
    render(
      <StoreProvider>
        <CopyCode />
      </StoreProvider>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText(/Copy code/i)).toBeInTheDocument();
  });

  it("opens dialog when clicking copy button", async () => {
    render(
      <StoreProvider>
        <CopyCode />
      </StoreProvider>,
    );

    // Click the copy button
    const button = screen.getByText(/Copy code/i);
    fireEvent.click(button);

    // Check if dialog is visible
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Theme/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Copy and paste the following code into your CSS file./i,
      ),
    ).toBeInTheDocument();
  });

  it("copies code when clicking copy button in dialog", async () => {
    render(
      <StoreProvider>
        <CopyCode />
      </StoreProvider>,
    );

    // Open dialog
    fireEvent.click(screen.getByText(/Copy code/i));

    // Click the copy button inside dialog
    const copyButton = screen.getByRole("copy-code-button");
    fireEvent.click(copyButton);

    // Verify clipboard API was called
    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalled();
    });

    // Verify tooltip appears
    expect(await screen.getByRole("tooltip-code-copied")).toBeInTheDocument();
  });

  it("displays syntax highlighted code", async () => {
    render(
      <StoreProvider>
        <CopyCode />
      </StoreProvider>,
    );

    // Open dialog
    fireEvent.click(screen.getByText(/Copy code/i));

    // Verify syntax highlighter is present
    const syntaxHighlighter = screen.getByRole("copy-code-syntax-highlighter");
    expect(syntaxHighlighter).toBeInTheDocument();
  });

  it("tracks copy events", async () => {
    const { EventTracker } = await import("@/eventTracker");

    render(
      <StoreProvider>
        <CopyCode />
      </StoreProvider>,
    );

    // Open dialog and copy
    fireEvent.click(screen.getByText(/Copy code/i));
    fireEvent.click(screen.getByText(/^Copy$/));

    // Verify event tracking
    expect(EventTracker.track).toHaveBeenCalledWith("Open copy button clicked");
    expect(EventTracker.track).toHaveBeenCalledWith(
      "Copied CSS code",
      expect.any(Object),
    );
  });
});
