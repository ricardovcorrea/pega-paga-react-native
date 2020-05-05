import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';

import {BaseScreen} from '~/components';

configure({adapter: new Adapter()});

describe('BaseScreen Component Tests', () => {
  it('should render itself and children', () => {
    expect(
      renderer.create(
        <BaseScreen>
          <Text>Body</Text>
        </BaseScreen>,
      ),
    ).toMatchSnapshot();
  });
});
