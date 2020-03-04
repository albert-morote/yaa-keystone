import React from 'react';

import { Container } from '@arch-ui/layout';
import { Title } from '@arch-ui/typography';

const Static1 = () => (
    <Container>
        <Title as="h1" margin="both">
            Static Page 1
        </Title>
        <p>This is a custom static page in Admin UI.</p>
        <p>
            It demonstrates the ability to change the default dashboard and render a custom page instead.
        </p>
    </Container>
);

export default Static1;