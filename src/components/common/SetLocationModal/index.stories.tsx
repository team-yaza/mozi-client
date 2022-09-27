import React from 'react';
import SetLocationModal from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Common/SetLocationModal',
  component: SetLocationModal,
} as ComponentMeta<typeof SetLocationModal>;

const Template: ComponentStory<typeof SetLocationModal> = (args) => <SetLocationModal {...args} />;

export const Default = Template.bind({});
