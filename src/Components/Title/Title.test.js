import React from "react";
import { render } from "../../../tools/test-utils";

import Title from "./Title";

describe("<Title />", () => {
    it('Should render default tag and color', () => {
        const { getByRole } = render(<Title>title of the page</Title>);

        const $title = getByRole('heading', { level: 1 });
        expect($title).toBeInTheDocument();
        expect($title).toHaveTextContent('title of the page');
        expect($title).toHaveClass('text-dark');
    });

    it.each([
        ['text-main', 'main'],
        ['text-white', 'white']
    ])('Should apply class .%s for color %s.', (expected, color) => {
        const { getByText } = render(<Title color={color}>title of the page</Title>);

        expect(getByText('title of the page')).toHaveClass(expected);
    });

    it.each([
        [1, 'h1'],
        [2, 'h2'],
        [3, 'h3'],
        [4, 'h4'],
        [5, 'h5'],
        [6, 'h6'],
    ])('Should create tag heading of level %s for prop %s.', (expected, tag) => {
        const { getByRole } = render(<Title tag={tag}>title of the page</Title>);

        expect(getByRole('heading', { level: expected })).toBeInTheDocument();
    });
});