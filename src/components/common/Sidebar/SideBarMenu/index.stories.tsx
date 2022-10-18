import React from 'react';
import Temp, { TempProps } from './temp';
import { ComponentMeta, Story } from '@storybook/react';
import { INBOX } from '@/components/common/Figure';

export default {
  title: 'Common/SideBarMenu',
  component: Temp,
} as ComponentMeta<typeof Temp>;

const Template: Story<TempProps> = (args) => (
  <div style={{ position: 'relative' }}>
    <Temp {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  icon: <INBOX focused />,
  name: 'Inbox',
  count: 0,
};
