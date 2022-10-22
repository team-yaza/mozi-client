import { ComponentMeta, ComponentStory } from '@storybook/react';
import Profile from '.';

export default {
  component: Profile,
  title: 'components/Profile',
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;

export const Default = Template.bind({});
