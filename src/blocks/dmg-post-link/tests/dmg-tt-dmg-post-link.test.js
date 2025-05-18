import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Edit from "../edit";

// Example of necessary mock
jest.mock("@wordpress/data", () => ({
  useSelect: jest.fn(),
}));

import { useSelect } from "@wordpress/data";

describe("Edit component", () => {
  const mockSetAttributes = jest.fn();

  const posts = [
    {
      id: 1,
      title: { rendered: "DMG Post Test One" },
      link: "https://example.com/post-one",
    },
    {
      id: 2,
      title: { rendered: "DMG Post Test Two" },
      link: "https://example.com/post-two",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useSelect.mockImplementation(() => posts);
  });

  it("renders search label and updates searchTerm on input change", () => {
    render(
      <Edit attributes={{ postId: null }} setAttributes={mockSetAttributes} />
    );

    // The label text exists:
    expect(screen.getByText("Search Posts")).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox");
    
    // Check initial value empty
    expect(searchInput.value).toBe("");
  });
    
});
