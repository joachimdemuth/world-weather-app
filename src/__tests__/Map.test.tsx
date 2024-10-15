import { render, screen } from '@testing-library/react';
import Map from '../components/Map/Map';

describe('Map', () => {
    it('renders without crashing', () => {
        render(<Map coords={[12.5, 55.65]} setCoords={() => {}} setSearchResult={() => {}} />);
    });
});
