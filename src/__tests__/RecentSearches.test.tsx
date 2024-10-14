import { render, screen } from "@testing-library/react";
import RecentSearches from "../components/RecentSearches/RecentSearches";
import { RecentSearchPlace } from "../components/RecentSearches/Types/types";


const mockSetPosition = jest.fn();
const mockSetRecentSearches = jest.fn();

const mockSearches: RecentSearchPlace[] = [
    {
        type: "place",
        lngLat: [51.5074, -0.1278],
        displayTitle: "London",
        country: "England",
        city: "London"
    }
];
describe("RecentSearches", () => {
  it("renders without crashing", () => {
    render(<RecentSearches searches={mockSearches} setPosition={mockSetPosition} setRecentSearches={mockSetRecentSearches} />);
    expect(screen.getByText("London")).toBeInTheDocument();
  });
});

