import { ComponentStory, ComponentMeta } from '@storybook/react';
import SideBar from '.';

export default {
  title: 'Common/Sidebar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;

export const Basic2 = Template.bind({});
