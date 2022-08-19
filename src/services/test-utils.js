import { render } from "@testing-library/react";

const AllTheProviders = ({ children }) => children;

const customRender = (ui, options) => {
    return render(ui, { wrapper: AllTheProviders, ...options })
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
