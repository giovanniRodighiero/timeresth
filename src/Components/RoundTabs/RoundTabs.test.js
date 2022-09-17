import React from "react";
import { render, userEvent } from "../../../tools/test-utils";

import RoundTabs, { AddTab, Tab, ActiveTab } from "./RoundTabs";

const mockRoundTabsProps = {
    tabs: [0, 1, 2],
    activeTabIndex: 1,
    onDelete: jest.fn(),
    onSelect: jest.fn(),
    onAdd: jest.fn(),
};

describe("<AddTab />", () => {
    it("Should render a button with correct aria", () => {
        const { getByLabelText, getByRole } = render(
            <AddTab onAdd={jest.fn()} />
        );

        expect(getByLabelText("add round")).toBeInTheDocument();
        expect(getByRole("button")).toBeInTheDocument();
    });

    it("Should call the callback on a click event", async () => {
        const spy = jest.fn();
        const { getByRole } = render(<AddTab onAdd={spy} />);
        await userEvent.click(getByRole("button"));
        expect(spy).toHaveBeenCalled();
    });
});

describe("<Tab />", () => {
    it("Should render a button with proper aria-label and text", () => {
        const { getByLabelText, getByRole, getByText } = render(
            <Tab index={3} onSelect={jest.fn()} />
        );

        expect(getByLabelText("round number 4")).toBeInTheDocument();
        expect(getByRole("button")).toBeInTheDocument();
        expect(getByText("#4")).toBeInTheDocument();
    });

    it("Should call the callback with the index of the tab on a click event", async () => {
        const spy = jest.fn();
        const { getByRole } = render(<Tab index={3} onSelect={spy} />);

        await userEvent.click(getByRole("button"));
        expect(spy).toHaveBeenCalledWith(3);
    });

    it("Should apply the no-border-left class when the tab is not first or last", () => {
        const { getByRole } = render(<Tab index={3} onSelect={jest.fn()} />);

        const $btn = getByRole("button");
        expect($btn).toHaveClass("border-l-0");
        expect($btn).not.toHaveClass("rounded-l rounded-r");
    });

    it("Should apply the rounded-border-left class when the tab is the first", () => {
        const { getByRole } = render(<Tab onSelect={jest.fn()} />);

        const $btn = getByRole("button");
        expect($btn).toHaveClass("rounded-l");
        expect($btn).not.toHaveClass("border-l-0 rounded-r");
    });

    it("Should apply the rounded-border-right class when the tab is the last", () => {
        const { getByRole } = render(
            <Tab index={2} isLast onSelect={jest.fn()} />
        );

        const $btn = getByRole("button");
        expect($btn).toHaveClass("rounded-r border-l-0");
        expect($btn).not.toHaveClass("rounded-l");
    });
});

describe("<ActiveTab />", () => {
    it("Should render a button with correct aria-label and text", () => {
        const { getByText, getByLabelText, getByRole } = render(
            <ActiveTab index={2} onDelete={jest.fn()} />
        );

        expect(getByText("round #3")).toBeInTheDocument();
        expect(getByLabelText("delete round 3")).toBeInTheDocument();
        expect(getByRole("button")).toBeInTheDocument();
    });

    it("Should call the callback with the tab index on the delete event", async () => {
        const spy = jest.fn();
        const { getByRole } = render(<ActiveTab index={2} onDelete={spy} />);

        await userEvent.click(getByRole("button"));
        expect(spy).toHaveBeenCalledWith(2);
    });

    it("Should not have the rounded-border-left or right class when is not the first or last tab", () => {
        const { container } = render(
            <ActiveTab index={2} onDelete={jest.fn()} />
        );

        expect(container.firstChild.firstChild).not.toHaveClass(
            "rounded-l rounded-r"
        );
    });

    it("Should have the rounded-border-left class when is the first tab", () => {
        const { container } = render(<ActiveTab onDelete={jest.fn()} />);

        expect(container.firstChild.firstChild).toHaveClass("rounded-l");
        expect(container.firstChild.firstChild).not.toHaveClass("rounded-r");
    });

    it("Should have the rounded-border-right class when is the last tab", () => {
        const { container } = render(
            <ActiveTab index={3} isLast onDelete={jest.fn()} />
        );

        expect(container.firstChild.firstChild).toHaveClass("rounded-r");
        expect(container.firstChild.firstChild).not.toHaveClass("rounded-l");
    });
});

describe("<RoundTabs />", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    it("Should render <AddTab /> and no tabs for an empty list", async () => {
        const props = { ...mockRoundTabsProps };
        delete props.tabs;
        delete props.activeTabIndex;
        const { getAllByRole, getByRole } = render(<RoundTabs {...props} />);

        expect(getAllByRole("button")).toHaveLength(1);
        await userEvent.click(getByRole("button"));
        expect(props.onAdd).toHaveBeenCalledTimes(1);
    });

    it("Should render <AddTab />, <Tab /> and <ActiveTab /> for a non empty list", async () => {
        const { getAllByRole, getByLabelText } = render(
            <RoundTabs {...mockRoundTabsProps} />
        );

        expect(getAllByRole("button")).toHaveLength(4);

        await userEvent.click(getByLabelText("round number 1"));
        expect(mockRoundTabsProps.onSelect).toHaveBeenCalledWith(0);

        await userEvent.click(getByLabelText("delete round 2"));
        expect(mockRoundTabsProps.onDelete).toHaveBeenCalledWith(1);
    });
});
