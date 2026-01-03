export interface Prasang {
  id: string;
  title: string; // e.g., "Prasang 1: Damodardas's dedication"
  content: string; // The story text
}

export interface Vaishnav {
  id: string;
  index: number; // e.g., 1 to 84
  name: string;
  group: '84' | '252';
  bio: string; // Short intro about the Vaishnav
  prasangs: Prasang[];
}

export const VARTA_DATA: Vaishnav[] = [
  {
    id: 'v84_1',
    index: 1,
    name: 'Damodardas Harsani',
    group: '84',
    bio: 'The first and most beloved disciple of Mahaprabhuji.',
    prasangs: [
      {
        id: 'p1',
        title: 'Prasang 1',
        content: 'Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...Once Mahaprabhuji was traveling... (Story content regarding Damodardas\'s seva bhava goes here)...'
      },
      {
        id: 'p2',
        title: 'Prasang 2',
        content: 'On another occasion, regarding the offering of water...'
      }
    ]
  },
  {
    id: 'v84_2',
    index: 2,
    name: 'Krishnadas Meghan',
    group: '84',
    bio: 'A devoted Vaishnav known for his unwavering faith.',
    prasangs: [
      { id: 'p1', title: 'Prasang 1', content: 'Story content...' },
      { id: 'p2', title: 'Prasang 2', content: 'Story content...' },
      { id: 'p3', title: 'Prasang 3', content: 'Story content...' },
      { id: 'p4', title: 'Prasang 4', content: 'Story content...' },
    ]
  },
  {
    id: 'v252_1',
    index: 1,
    name: 'Example 252 Vaishnav',
    group: '252',
    bio: 'A devotee from the 252 collection.',
    prasangs: [
      { id: 'p1', title: 'Prasang 1', content: 'Story content...' }
    ]
  }
];