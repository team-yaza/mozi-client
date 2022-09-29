import React from 'react';
import AlertModal from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Common/AlertModal',
  component: AlertModal,
} as ComponentMeta<typeof AlertModal>;

const Template: ComponentStory<typeof AlertModal> = (args) => <AlertModal {...args} />;

export const Default = Template.bind({});
