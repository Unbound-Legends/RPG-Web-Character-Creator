import React from 'react';
import { render } from '@testing-library/react';

import DeleteButton from './delete-button';

describe(' DeleteButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DeleteButton />);
        expect(baseElement).toBeTruthy();
    });
});
