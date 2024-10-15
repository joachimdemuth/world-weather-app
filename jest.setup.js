import 'jest-environment-jsdom'

if (typeof window !== 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

// Mock TextDecoder and TextEncoder
class TextDecoderMock {
  decode() {
    return '';
  }
}

class TextEncoderMock {
  encode() {
    return new Uint8Array();
  }
}

global.TextDecoder = TextDecoderMock;
global.TextEncoder = TextEncoderMock;

// Mock mapboxgl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
  })),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
