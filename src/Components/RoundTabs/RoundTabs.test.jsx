import React from "react";
import { vi, screen, render, userEvent } from "../../../tools/testUtils";

import RoundTabs, { AddTab, Tab, ActiveTab } from "./RoundTabs";

const mockRoundTabsProps = {
    tabs: [0, 1, 2],
    activeTabIndex: 1,
    onDelete: vi.fn(),
    onSelect: vi.fn(),
    onAdd: vi.fn(),
};

describe("<AddTab />", () => {
    it("Should render a button with correct aria", () => {
        render(<AddTab onAdd={vi.fn()} />);

        expect(screen.getByLabelText("add round")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Should call the callback on a click event", async () => {
        const spy = vi.fn();
        render(<AddTab onAdd={spy} />);

        await userEvent.click(screen.getByRole("button"));
        expect(spy).toHaveBeenCalled();
    });
});

describe("<Tab />", () => {
    it("Should render a button with proper aria-label and text", () => {
        render(<Tab index={3} onSelect={vi.fn()} />);

        expect(screen.getByLabelText("round number 4")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText("#4")).toBeInTheDocument();
    });

    it("Should call the callback with the index of the tab on a click event", async () => {
        const spy = vi.fn();
        render(<Tab index={3} onSelect={spy} />);

        await userEvent.click(screen.getByRole("button"));
        expect(spy).toHaveBeenCalledWith(3);
    });

    it("Should apply the no-border-left class when the tab is not first or last", () => {
        render(<Tab index={3} onSelect={vi.fn()} />);

        const $btn = screen.getByRole("button");
        expect($btn).toHaveClass("border-l-0");
        expect($btn).not.toHaveClass("rounded-l rounded-r");
    });

    it("Should apply the rounded-border-left class when the tab is the first", () => {
        render(<Tab onSelect={vi.fn()} />);

        const $btn = screen.getByRole("button");
        expect($btn).toHaveClass("rounded-l");
        expect($btn).not.toHaveClass("border-l-0 rounded-r");
    });

    it("Should apply the rounded-border-right class when the tab is the last", () => {
        render(<Tab index={2} isLast onSelect={vi.fn()} />);

        const $btn = screen.getByRole("button");
        expect($btn).toHaveClass("rounded-r border-l-0");
        expect($btn).not.toHaveClass("rounded-l");
    });
});

describe("<ActiveTab />", () => {
    it("Should render a button with correct aria-label and text", () => {
        render(<ActiveTab index={2} onDelete={vi.fn()} />);

        expect(screen.getByText("round #3")).toBeInTheDocument();
        expect(screen.getByLabelText("delete round 3")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Should not display the delete button if the tab is the only one", () => {
        const spy = vi.fn();
        render(<ActiveTab index={0} isLast onDelete={spy} />);

        expect(screen.queryByRole("button")).toBeNull();
    });

    it("Should call the callback with the tab index on the delete event", async () => {
        const spy = vi.fn();
        render(<ActiveTab index={2} onDelete={spy} />);

        await userEvent.click(screen.getByRole("button"));
        expect(spy).toHaveBeenCalledWith(2);
    });

    it("Should not have the rounded-border-left or right class when is not the first or last tab", () => {
        const { container } = render(
            <ActiveTab index={2} onDelete={vi.fn()} />
        );

        expect(container.firstChild.firstChild).not.toHaveClass(
            "rounded-l rounded-r"
        );
    });

    it("Should have the rounded-border-left class when is the first tab", () => {
        const { container } = render(<ActiveTab onDelete={vi.fn()} />);

        expect(container.firstChild.firstChild).toHaveClass("rounded-l");
        expect(container.firstChild.firstChild).not.toHaveClass("rounded-r");
    });

    it("Should have the rounded-border-right class when is the last tab", () => {
        const { container } = render(
            <ActiveTab index={3} isLast onDelete={vi.fn()} />
        );

        expect(container.firstChild.firstChild).toHaveClass("rounded-r");
        expect(container.firstChild.firstChild).not.toHaveClass("rounded-l");
    });
});

describe("<RoundTabs />", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Should render <AddTab /> and no tabs for an empty list", async () => {
        const props = { ...mockRoundTabsProps };
        delete props.tabs;
        delete props.activeTabIndex;
        render(<RoundTabs {...props} />);

        expect(screen.getAllByRole("button")).toHaveLength(1);
        await userEvent.click(screen.getByRole("button"));
        expect(props.onAdd).toHaveBeenCalledTimes(1);
    });

    it("Should render <AddTab />, <Tab /> and <ActiveTab /> for a non empty list", async () => {
        render(<RoundTabs {...mockRoundTabsProps} />);

        expect(screen.getAllByRole("button")).toHaveLength(4);

        await userEvent.click(screen.getByLabelText("round number 1"));
        expect(mockRoundTabsProps.onSelect).toHaveBeenCalledWith(0);

        await userEvent.click(screen.getByLabelText("delete round 2"));
        expect(mockRoundTabsProps.onDelete).toHaveBeenCalledWith(1);
    });
});
