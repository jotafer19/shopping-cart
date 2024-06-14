import { vi, describe, it, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import CardContainer from "../components/card-container/CardContainer"
import userEvent from "@testing-library/user-event";

vi.mock('../components/item-card/Card', () => ({
    default: ({ item }) => (
        <div data-testId="card">
            <img src={item.image} />
            <div>{item.title}</div>
            <div>{item.rating.rate}</div>
            <div>{item.count}</div>
        </div>
    ),
}));

const data = [
    { id: 1, title: "foo", image: "#", rating: { rate: 3.1 }, count: 1, price: 10, category: "electronics" },
    { id: 2, title: "bar", image: "#", rating: { rate: 4.0 }, count: 5, price: 20, category: "jewelery" }
]

describe("Test CardContainer component", () => {
    it("render component", () => {
        const { container } = render(<CardContainer data={data} />)

        expect(container).toMatchSnapshot()
    })

    it("render category buttons and select options", () => {
        render(<CardContainer data={data} />)

        expect(screen.getByRole("button", { name: "All Products"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Men's Clothing"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Jewelery"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Electronics"})).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Women's Clothing"})).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "Recommended"})).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "Alphabetical (A-Z)"})).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "Alphabetical (Z-A)"})).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "Price: low to high"})).toBeInTheDocument()
        expect(screen.getByRole("option", { name: "Price: high to low"})).toBeInTheDocument()
    })

    it("check category button click", async () => {
        const user = userEvent.setup()

        render(<CardContainer data={data} />)

        const allProducts = screen.getByRole("button", { name: "All Products"})
        const menProducts = screen.getByRole("button", { name: "Men's Clothing"})
        const jewelery = screen.getByRole("button", { name: "Jewelery"})

        await user.click(jewelery);
        expect(screen.getAllByTestId("card").length).toBe(1)

        await user.click(menProducts)
        expect(screen.queryByTestId("card")).toBeFalsy()

        await user.click(allProducts)
        expect(screen.getAllByTestId("card").length).toBe(2)
    })

    it("change product sort", async () => {
        const user = userEvent.setup()

        render(<CardContainer data={data} />)

        const select = screen.getByRole("combobox")

        await user.selectOptions(select, "low-high")

        expect(select).toHaveValue("low-high")
    })
})