import React from "react";
import classNames from "classnames";
import { Check } from "react-feather";

interface TickBoxProps {
    /* tickbox is checked */
    checked?: boolean;
}

function TickBox({ checked = false }: TickBoxProps) {
    const styles = React.useMemo(
        () =>
            classNames(
                "h-6 w-12 rounded border-2 border-dark flex justify-center items-center",
                {
                    "bg-dark": checked,
                }
            ),
        [checked]
    );

    return (
        <div
            className={styles}
            role="checkbox"
            aria-checked={checked}
            aria-label="tick-box"
        >
            {checked && <Check color="white" aria-label="checked icon" />}
        </div>
    );
}

export default TickBox;
