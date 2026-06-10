export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  slug: string
  index: string
  name: string
  category: string
  year: string
  tagline: string
  palette: { bg: string; ink: string; accent: string }
  brand: { idea: string; notes: string[] }
  story: string
  challenge: string
  solution: string
  interactions: string[]
  services: string[]
  metrics: ProjectMetric[]
}

export const projects: Project[] = [
  {
    slug: 'verdant-atelier',
    index: '01',
    name: 'Verdant Atelier',
    category: 'Architecture & Interiors',
    year: '2025',
    tagline: 'Where structure learns to breathe.',
    palette: { bg: '#243126', ink: '#F6F3EE', accent: '#70826B' },
    brand: {
      idea: 'A studio that treats living space as a slow, growing thing — architecture that ages like a garden.',
      notes: [
        'Identity built on negative space and a single hairline grid.',
        'Wordmark set in a high-contrast didone, letter-spaced like a gallery plaque.',
        'Photography replaced by light studies and material close-ups.',
      ],
    },
    story:
      'Verdant Atelier is an imagined architecture and interior practice working at the seam between the built and the grown. The brand had to feel rooted yet weightless — old money calm, never loud.',
    challenge:
      'Architecture portfolios drown their work in dense galleries and technical jargon. Verdant needed the opposite: a site that moves at the pace of a walk through a finished building, letting each space arrive on its own.',
    solution:
      'A vertical promenade. Projects unfold as full-height chapters, materials revealed through scroll-linked light. The interface recedes so the spaces can speak, with a living grid that quietly reorganises as you move.',
    interactions: [
      'Scroll-linked daylight that rakes across each interior as you descend.',
      'A hairline plan-grid that redraws itself between projects.',
      'Material swatches that bloom to full-bleed on hover.',
    ],
    services: ['Brand Identity', 'Art Direction', 'Experience Design', 'Web Development'],
    metrics: [
      { label: 'Concept', value: 'Living Architecture' },
      { label: 'Surfaces', value: 'Stone / Oak / Glass' },
      { label: 'Pacing', value: 'Promenade' },
    ],
  },
  {
    slug: 'solenne-parfums',
    index: '02',
    name: 'Solenne Parfums',
    category: 'Luxury Fragrance',
    year: '2025',
    tagline: 'A scent you can almost see.',
    palette: { bg: '#E9E6E1', ink: '#171717', accent: '#70826B' },
    brand: {
      idea: 'A fragrance house that bottles a single, fleeting moment of light — the hour before dusk.',
      notes: [
        'A wordmark that thins as it rises, like a note evaporating.',
        'Palette drawn from skin, amber glass and dried botanicals.',
        'Motion modelled on diffusion — everything drifts, nothing snaps.',
      ],
    },
    story:
      'Solenne is an invented maison built around olfactory storytelling. The brief: translate something invisible — scent — into an experience the eye can follow.',
    challenge:
      'Fragrance is the hardest thing to sell on a screen. You cannot smell a website. The work had to evoke a feeling of diffusion, warmth and intimacy without a single literal product shot dominating the page.',
    solution:
      'Each fragrance becomes a colour-field that breathes and bleeds as you scroll, paired with editorial notes written like prose poetry. A cursor-reactive haze follows the reader, so the page itself feels scented.',
    interactions: [
      'A volumetric haze that warms and drifts toward the cursor.',
      'Scent notes that fade in by accord — top, heart, base — on scroll.',
      'Bottle silhouettes that refract the colour-field behind them.',
    ],
    services: ['Brand World', 'Creative Direction', 'Motion Design', 'Web Development'],
    metrics: [
      { label: 'Concept', value: 'The Hour Before Dusk' },
      { label: 'Accords', value: 'Amber / Iris / Salt' },
      { label: 'Mood', value: 'Intimate' },
    ],
  },
  {
    slug: 'north-and-stone',
    index: '03',
    name: 'North & Stone',
    category: 'Property Development',
    year: '2025',
    tagline: 'Permanence, made to feel inevitable.',
    palette: { bg: '#D9D5CE', ink: '#171717', accent: '#243126' },
    brand: {
      idea: 'A developer of landmark residences whose work is meant to outlast its makers — quiet monuments.',
      notes: [
        'A monumental, near-architectural wordmark carved from one weight.',
        'Layouts built on heavy margins and a single decisive column.',
        'Imagery implied through masking and material texture, not stock photos.',
      ],
    },
    story:
      'North & Stone is a conceptual property developer of considered, generational homes. The identity needed the gravity of stone with none of the coldness.',
    challenge:
      'Property sites compete on amenities and lists. North & Stone sells conviction — the sense that a place was always meant to exist. The site had to feel like standing in front of a finished building, not browsing a brochure.',
    solution:
      'A cinematic monolith. The site opens on a single declarative statement, then reveals developments as masked monuments that assemble from fragments as you scroll. Numbers are treated as inscriptions, not data points.',
    interactions: [
      'Developments that assemble from sliced fragments on entry.',
      'Inscription-style figures that count up as they settle.',
      'A parallax horizon that steadies as each project locks into place.',
    ],
    services: ['Brand Identity', 'Experience Design', 'Web Development', 'Creative Direction'],
    metrics: [
      { label: 'Concept', value: 'Quiet Monuments' },
      { label: 'Material', value: 'Limestone / Bronze' },
      { label: 'Tone', value: 'Inevitable' },
    ],
  },
]

export const getProject = (slug?: string) =>
  projects.find((p) => p.slug === slug)
