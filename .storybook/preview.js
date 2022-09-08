import "../src/styles.css";

import { MemoryRouter, Routes, Route } from "react-router-dom";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    Story => (
        <MemoryRouter initialEntries={["/page"]}>
            <Routes>
                <Route path="/page" element={<Story />}></Route>
            </Routes>
        </MemoryRouter>
    ),
];
