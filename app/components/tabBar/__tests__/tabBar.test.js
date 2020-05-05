import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';

import {TabBar} from '~/components';

configure({adapter: new Adapter()});

describe('Tab Bar Component Tests', () => {
  const mockNavigation = {
    state: {
      routes: [{routeName: 'Main'}],
      index: 0,
    },
  };

  it('should render itself', () => {
    const component = renderer.create(<TabBar navigation={mockNavigation} />);
    expect(component).toMatchSnapshot();
  });

  it('should call onTabPress with pressed route on clicking in tab bar button', () => {
    let pressedRoute;

    const onTabBarPressCallback = jest.fn(route => {
      pressedRoute = route;
    });

    const wrapper = shallow(
      <TabBar navigation={mockNavigation} onTabPress={onTabBarPressCallback} />,
    );

    wrapper
      .find({testID: 'tab-bar-button'})
      .first()
      .props()
      .onPress();

    expect(onTabBarPressCallback).toBeCalled();
    expect(pressedRoute).toEqual({route: {routeName: 'Main'}});
  });
});
