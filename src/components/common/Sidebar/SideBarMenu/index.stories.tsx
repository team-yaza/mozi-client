import React from 'react';
import Temp from './temp';
import { ComponentMeta, Story } from '@storybook/react';
import { INBOX } from '@/components/common/Figure';

export default {
  title: 'Common/SideBarMenu',
  component: Temp,
} as ComponentMeta<typeof Temp>;

const Template: Story<any> = (args) => <Temp {...args} />;

// const Template: Story<SideBarProps> = (args) => (
//   <div style={{ position: 'relative' }}>
//     <SideBar {...args} />
//   </div>
// );

export const Default = Template.bind({});

Default.args = {
  icon: <INBOX focused />,
  name: 'Inbox',
  count: 0,
};
