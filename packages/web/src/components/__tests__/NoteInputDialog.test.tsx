import { render, screen, fireEvent } from '@testing-library/react';
import { NoteInputDialog } from '../NoteInputDialog';
import { Country } from '../../types/country';

const mockCountry: Country = {
  name: {
    common: 'United States',
    official: 'United States of America',
    nativeName: {},
  },
  tld: ['.us'],
  cca2: 'US',
  ccn3: '840',
  cioc: 'USA',
  independent: true,
  status: 'officially-assigned',
  unMember: true,
  currencies: {
    USD: {
      name: 'United States dollar',
      symbol: '$',
    },
  },
  idd: {
    root: '+1',
    suffixes: ['201', '202', '203'],
  },
  capital: ['Washington, D.C.'],
  altSpellings: ['US', 'USA', 'United States of America'],
  region: 'Americas',
  subregion: 'North America',
  languages: {
    eng: 'English',
  },
  latlng: [38, -97],
  landlocked: false,
  borders: ['CAN', 'MEX'],
  area: 9629091,
  demonyms: {
    eng: {
      f: 'American',
      m: 'American',
    },
  },
  flag: '🇺🇸',
  maps: {
    googleMaps: 'https://goo.gl/maps/e8M246zY4BSjkjAv6',
    openStreetMaps: 'https://www.openstreetmap.org/relation/148838',
  },
  population: 331002651,
  gini: {
    '2018': 41.4,
  },
  fifa: 'USA',
  car: {
    signs: ['USA'],
    side: 'right',
  },
  timezones: [
    'UTC-12:00',
    'UTC-11:00',
    'UTC-10:00',
    'UTC-09:00',
    'UTC-08:00',
    'UTC-07:00',
    'UTC-06:00',
    'UTC-05:00',
    'UTC-04:00',
    'UTC+10:00',
    'UTC+12:00',
  ],
  continents: ['North America'],
  flags: {
    png: 'https://flagcdn.com/w320/us.png',
    svg: 'https://flagcdn.com/us.svg',
    alt: 'The flag of the United States of America',
  },
  coatOfArms: {
    png: 'https://mainfacts.com/media/images/coats_of_arms/us.png',
    svg: 'https://mainfacts.com/media/images/coats_of_arms/us.svg',
  },
  startOfWeek: 'sunday',
  capitalInfo: {
    latlng: [38.89, -77.05],
  },
  postalCode: {
    format: '#####-####',
    regex: '^(\\d{9})$',
  },
};

describe('NoteInputDialog', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with country name', () => {
    render(<NoteInputDialog country={mockCountry} onSave={mockOnSave} onCancel={mockOnCancel} />);

    expect(screen.getByText('Add United States to favorites')).toBeInTheDocument();
    expect(screen.getByLabelText('Add a note (optional)')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Why do you want to favorite this country?')
    ).toBeInTheDocument();
  });

  it('handles note input changes', () => {
    render(<NoteInputDialog country={mockCountry} onSave={mockOnSave} onCancel={mockOnCancel} />);

    const textarea = screen.getByLabelText('Add a note (optional)');
    fireEvent.change(textarea, { target: { value: 'Test note' } });

    expect(textarea).toHaveValue('Test note');
  });

  it('calls onSave with note when check button is clicked', () => {
    render(<NoteInputDialog country={mockCountry} onSave={mockOnSave} onCancel={mockOnCancel} />);

    const textarea = screen.getByLabelText('Add a note (optional)');
    fireEvent.change(textarea, { target: { value: 'Test note' } });

    const checkButton = screen.getByTestId('CheckIcon');
    fireEvent.click(checkButton);

    expect(mockOnSave).toHaveBeenCalledWith('Test note');
  });

  it('calls onCancel when close button is clicked', () => {
    render(<NoteInputDialog country={mockCountry} onSave={mockOnSave} onCancel={mockOnCancel} />);

    const closeButton = screen.getByTestId('CloseIcon');
    fireEvent.click(closeButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('calls onSave with empty string when no note is entered', () => {
    render(<NoteInputDialog country={mockCountry} onSave={mockOnSave} onCancel={mockOnCancel} />);

    const checkButton = screen.getByTestId('CheckIcon');
    fireEvent.click(checkButton);

    expect(mockOnSave).toHaveBeenCalledWith('');
  });
});
