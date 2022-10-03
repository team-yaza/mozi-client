import React from 'react';
import CalendarModal from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Common/CalendarModal',
  component: CalendarModal,
} as ComponentMeta<typeof CalendarModal>;

const Template: ComponentStory<typeof CalendarModal> = (args) => <CalendarModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  date: new Date(),
};
