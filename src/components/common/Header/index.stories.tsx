import { Meta, Story } from '@storybook/react';

import Header from '.';

export default {
  component: Header,
  title: 'components/Header',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Default = Template.bind({});
