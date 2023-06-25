import { render } from "@testing-library/react"
import { Star } from "./Star"

test("render star component",()=> {
    const {getByText} = render(<Star />);
    const h1 = getByText(/cool Star/i);
    expect(h1).toHaveTextContent("Cool Star");
})