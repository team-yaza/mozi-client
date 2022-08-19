import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, { ButtonProps } from '.';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
