import { Meta, Story } from '@storybook/react';

import SideBar, { SideBarProps } from '.';

export default {
  component: SideBar,
  title: 'Common/SideBar',
} as Meta;

const Template: Story<SideBarProps> = (args) => <SideBar {...args} />;

export const Primary = Template.bind({});
