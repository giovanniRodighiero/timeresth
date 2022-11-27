import React from "react";

import PlayPauseButtonCmp from "./PlayPauseButton";

export default {
    title: "Components/ExerciseExecution/PlayPauseButton",
    component: PlayPauseButtonCmp,
};

const Template = args => <PlayPauseButtonCmp {...args} />;
export const PlayPauseButton = Template.bind({});
PlayPauseButton.args = {
    isPlaying: false,
};
