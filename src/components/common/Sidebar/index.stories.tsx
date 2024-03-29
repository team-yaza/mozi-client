import { Meta, Story } from '@storybook/react';

import SideBar, { SideBarProps } from '.';

export default {
  component: SideBar,
  title: 'components/SideBar',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<SideBarProps> = (args) => (
  <div style={{ position: 'relative' }}>
    <SideBar {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  statistics: {
    inbox: 0,
    map: 0,
    logbook: 0,
    trash: 0,
    upcoming: 0,
  },
};
