import React from 'react';
import SideBarMenu, { SideBarMenuProps } from './index';
import { ComponentMeta, Story } from '@storybook/react';
import { INBOX } from '@/components/common/Figure';

export default {
  title: 'Common/SideBarMenu',
  component: SideBarMenu,
} as ComponentMeta<typeof SideBarMenu>;

const Template: Story<SideBarMenuProps> = (args) => (
  <div style={{ position: 'relative' }}>
    <SideBarMenu {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  icon: <INBOX />,
  name: 'Inbox',
  count: 0,
};
