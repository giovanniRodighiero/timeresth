import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";

const AllTheProviders = ({ children }) => (
    <MemoryRouter initialEntries={["/"]}>
        <Routes>
            <Route path="/" element={<div>{children}</div>}></Route>
        </Routes>
    </MemoryRouter>
);

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

const portalRoot = document.createElement("div");
portalRoot.setAttribute("id", "modal-root");
document.body.appendChild(portalRoot);

// re-export everything
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// override render method
export { customRender as render };

// vitest main object
export { vi };
