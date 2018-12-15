import React from 'react';
import Board from '../Board';
import { shallow } from 'enzyme';

describe('Board', () => {
  test('that it matches an existing snapshot', () => {

    const wrapper = shallow( <Board cardsUrl="cardsURL" boardsUrl="boardsURL" boardName="boardName"/>);

    expect(wrapper).toMatchSnapshot();
  });
});
