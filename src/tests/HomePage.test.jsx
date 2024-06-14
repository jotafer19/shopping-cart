import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage"
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Homepage component", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                </Routes>
            </MemoryRouter>
        ) 
    })
    
    it("Renders homepage", () => {
        const { container } = render(<MemoryRouter><HomePage /></MemoryRouter>);

        expect(container).toMatchSnapshot()
    })

    it("Check slideshow is in the document", () => {
        const buttons = screen.getAllByRole("button", {name: "Go to the shop"})
        expect(buttons.length).toBeGreaterThan(0)
        expect(screen.getAllByAltText("Home banner").length).toBeGreaterThan(0)
    })

    it("Go to shop page", async () => {
        const user = userEvent.setup()

        const buttons = screen.getAllByRole("button", {name: "Go to the shop"})

        await user.click(buttons[0])

        setTimeout(() => {
            expect(screen.getByRole("button", { name: "All products" })).toBeInTheDocument()
        }, 1000)
    })
})