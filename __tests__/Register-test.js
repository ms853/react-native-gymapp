import 'react-native';
import React from 'react';
import Register from '../src/components/auth/Register';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Register />
  );
});
