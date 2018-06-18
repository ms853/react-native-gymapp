import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import Home from '../src/components/main/Home';

it('renders correctly', () => {
  const tree = renderer.create(
    <Home />
  );
});
