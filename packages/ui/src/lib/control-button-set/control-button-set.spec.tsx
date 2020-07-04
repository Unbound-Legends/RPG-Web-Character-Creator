import React from 'react';
import { render } from '@testing-library/react';

import ControlButtonSet from './control-button-set';

describe(' ControlButtonSet', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ControlButtonSet />);
        expect(baseElement).toBeTruthy();
    });
});
