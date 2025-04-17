import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

global.React = React; // this also works for other globally available libraries
