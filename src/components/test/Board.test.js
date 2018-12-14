import React from 'react';
import Board from '../Board';
import { shallow } from 'enzyme';

describe('Board', () => {
  test('that it matches an existing snapshot', () => {

    const wrapper = shallow( <Board url="url" boardName="boardName"/>);

    expect(wrapper).toMatchSnapshot();
  });
});
