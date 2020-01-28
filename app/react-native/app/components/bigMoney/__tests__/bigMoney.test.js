import React from 'react';
import renderer from 'react-test-renderer';

import {BigMoney} from '~/components';

describe('Big Money Component Tests', () => {
  it('should render itself with title and formated value', () => {
    const component = renderer.create(
      <BigMoney title={'Title'} value={3000} />,
    );
    expect(component).toMatchSnapshot();
  });
});
