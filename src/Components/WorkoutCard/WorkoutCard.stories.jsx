import React from "react";

import WorkoutCardCmp from "./WorkoutCard";

export default {
    title: "Components/WorkoutCard",
    component: WorkoutCardCmp,
};

const Template = args => <WorkoutCardCmp {...args} />;

export const WorkoutCard = Template.bind({});
WorkoutCard.args = {
    workout: {
        name: "full body",
        rounds: [
            {
                name: "full body",
                exercises: [
                    {
                        name: "squats",
                        work: 20,
                        rest: 10,
                        repeat: 3,
                    },
                    {
                        name: "push ups",
                        work: 25,
                        rest: 15,
                        repeat: 1,
                    },
                    {
                        name: "resistance band rows",
                        work: 25,
                        rest: 15,
                        repeat: 1,
                    },
                ],
                repeat: 3,
                break: 45,
            },
        ],
    },
};
