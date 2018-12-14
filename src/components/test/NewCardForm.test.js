import React from 'react';
import NewCardForm from '../NewCardForm';
import { shallow } from 'enzyme';

describe('NewCardForm', () => {
  test('that it matches an existing snapshot', () => {

    const wrapper = shallow( <NewCardForm text="text" emoji="emoji"/>);

    expect(wrapper).toMatchSnapshot();
  });
});
