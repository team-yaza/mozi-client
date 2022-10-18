/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { Container, LogoContainer } from './styles';

const Profile: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <Image src="/assets/svgs/mozi.svg" width={40} height={40} />
      </LogoContainer>
    </Container>
  );
};

export default Profile;
