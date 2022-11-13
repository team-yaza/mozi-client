import React from 'react';
import CalendarModal from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/CalendarModal',
  component: CalendarModal,
} as ComponentMeta<typeof CalendarModal>;

const Template: ComponentStory<typeof CalendarModal> = (args) => (
  <>
    <h1>modal를 open 상태로 바꿔보세요.</h1>
    <div id="modal-root"></div>
    <CalendarModal {...args} />
  </>
);

export const Default = Template.bind({});

Default.args = {
  date: new Date(),
  todo: {
    id: '1',
    title: 'test',
    index: 1,
    done: false,
    createdAt: new Date(),
    alarmed: false,
  },
  type: 'alarm',
  isCalendarModalOpen: false,
};
