import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, { ButtonProps } from '.';
import styled from 'styled-components';

export default {
  component: Button,
  title: 'components/Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  size: 'large',
  onClick: action('clicked'),
  children: 'Large Button',
  color: 'primary',
};

export function Size() {
  return (
    <Container>
      <Button size="small" color="primary">
        Small
      </Button>
      <Button size="medium" color="primary">
        Medium
      </Button>
      <Button size="large" color="primary">
        Large
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  & + & {
    margin-top: 0.5rem;
  }
`;
