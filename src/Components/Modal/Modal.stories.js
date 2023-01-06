import React from "react";

import ModalCmpt from "./Modal";

export default {
    title: "Components/Modal/BaseModal",
    component: ModalCmpt,
};

const Template = args => <ModalCmpt {...args} />;

export const BaseModal = Template.bind({});
BaseModal.args = {
    isVisible: true,
    children: "modal contents",
};
