import { expect, it, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "../components/item-card/Card";
import { createContext, useContext } from "react";
import userEvent from "@testing-library/user-event";

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useOutletContext: () => useContext(MockOutletContext),
  }));

const MockOutletContext = createContext();

function MockOutletContextProvider({ children, value }) {
    return (
      <MockOutletContext.Provider value={value}>
        {children}
      </MockOutletContext.Provider>
    );
  }

const item = { id: 1, name: "foo", image: "#", rating: { rate: 3.1 }, count: 1, price: 10 };

const onClick = vi.fn();

describe("test Card component", () => {
  it("test render", () => {
    const { container } = render(
      <MockOutletContextProvider value={[[], () => {}]}>
        <Card item={item} handleMessageContainer={onClick} />
      </MockOutletContextProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render buttons to change item count and add to cart", () => {
    render (
        <MockOutletContextProvider value={[[], () => {}]}>
            <Card item={item} handleMessageContainer={onClick} />
        </MockOutletContextProvider>
    )

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument()
  })

  it("more item button should increment item count", async () => {
    const user = userEvent.setup()

    render (
        <MockOutletContextProvider value={[[], () => {}]}>
            <Card item={item} handleMessageContainer={onClick} />
        </MockOutletContextProvider>
    )

    const button = screen.getByRole("button", { name: "+" });
    const countDisplay = screen.getByTestId("item-count")
    expect(countDisplay.textContent).toBe("1")

    await user.click(button)
    
    expect(countDisplay.textContent).toBe("2")
  })

  it("less item button should decrease item count", async () => {
    const user = userEvent.setup()

    render (
      <MockOutletContextProvider value={[[], () => {}]}>
        <Card item={item} handleMessageContainer={onClick} />
      </MockOutletContextProvider> 
    )

    const moreButton = screen.getByRole("button", { name: "+" });
    const lessButton = screen.getByRole("button", { name: "-" });
    const countDisplay = screen.getByTestId("item-count")

    await user.click(moreButton)
    expect(countDisplay.textContent).toBe("2")

    await user.click(lessButton)

    expect(countDisplay.textContent).toBe("1")
  })

  it("should call the onClick function when clicked", async () => {
    const user = userEvent.setup()

    render (
      <MockOutletContextProvider value={[[], () => {}]}>
        <Card item={item} handleMessageContainer={onClick} />
      </MockOutletContextProvider> 
    )

    const button = screen.getByRole("button", { name: "Add to cart" });

    await user.click(button);

    expect(onClick).toHaveBeenCalled()
  })
});
