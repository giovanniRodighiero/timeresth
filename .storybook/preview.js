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
    backgrounds: {
        default: "light",
        values: [
            {
                name: "dark",
                value: "#262626",
            },
            {
                name: "light",
                value: "#fafaf9",
            },
        ],
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
