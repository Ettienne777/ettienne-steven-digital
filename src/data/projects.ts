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
  image: string
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
    slug: 'lifestyle-cafe',
    index: '01',
    name: 'Lifestyle Café',
    category: 'Restaurant & Café',
    year: '2026',
    tagline: 'Good food. Good company. Good first impression.',
    image: '/work/lifestyle-cafe.jpg',
    palette: { bg: '#F4EFE4', ink: '#171717', accent: '#E8542E' },
    brand: {
      idea: 'A neighbourhood café in Mookgophong that wanted to feel exactly as warm and a little playful online as it does walking through the door.',
      notes: [
        'Hand-styled script wordmark paired with a heavy, confident headline face.',
        'Soft full-bleed colour blooms instead of stock photography — warm, never corporate.',
        'A real, fully transcribed menu across drinks, food and dessert — no screenshot menus.',
      ],
    },
    story:
      'Lifestyle Café needed a site that could do two jobs at once: read as a proper local business online, and still feel like the room itself — checkerboard floors, jewel-tone armchairs, a neon sign against a living wall.',
    challenge:
      'Most café sites either drown the menu in PDF screenshots or feel stiffer than the actual café. Lifestyle Café is full of personality — the site had to carry that through without losing the basics a hungry visitor actually needs: hours, location, menu, a way to get in touch.',
    solution:
      'A retro-diner-meets-art-studio direction with a checkerboard strip used as a recurring structural device between sections. The full menu was typed out by hand across all categories rather than embedded as images, and a continuous-scroll gallery groups the photography by drinks, food and dessert.',
    interactions: [
      'A checkerboard motif that threads through the page as a section divider.',
      'Continuous-scroll gallery sectioned by drinks, food and dessert.',
      'A floating WhatsApp button so a table or order enquiry is one tap away.',
    ],
    services: ['Web Design', 'Web Development', 'Menu Build', 'WhatsApp Integration'],
    metrics: [
      { label: 'Location', value: 'Mookgophong, Limpopo' },
      { label: 'Menu items', value: '100+ transcribed' },
      { label: 'Built in', value: 'Days, not months' },
    ],
  },
  {
    slug: 'a-ha-driving-school',
    index: '02',
    name: 'A-HA Driving School',
    category: 'Driving School',
    year: '2026',
    tagline: "Don't just dream it, drive it.",
    image: '/work/aha-driving.jpg',
    palette: { bg: '#10141C', ink: '#F6F3EE', accent: '#E8542E' },
    brand: {
      idea: 'K53 learner\u2019s and driver\u2019s license training in Mookgopong — a school that needed to feel as trustworthy as it is, fast.',
      notes: [
        'Dark asphalt navy base with cone-orange as the single punch colour.',
        'Number-plate styled pricing cards for a brief that\u2019s genuinely about cars.',
        'An animated car that drives under the headline the moment the page loads.',
      ],
    },
    story:
      'A-HA Driving School was By Ettienne\u2019s first paying client — real lessons, real instructors, real people passing their tests every week, and, until this site, no way for any of that to show up online.',
    challenge:
      'A new client with no existing web presence needed a site that could convert a cold visitor into a booked lesson immediately, on a phone, without a single wasted scroll.',
    solution:
      '"Structurally serious, emotionally playful." Pricing and services sit in clean, number-plate styled cards, while a "wall of passes" testimonial section uses slightly rotated, pinned photo cards with orange "passed!" stamps — proof, not promises.',
    interactions: [
      'An SVG car that drives across the screen under the headline on load.',
      '"Wall of passes" — rotated, pinned student photo cards with a passed stamp.',
      'A floating WhatsApp button that opens straight into booking a lesson.',
    ],
    services: ['Web Design', 'Web Development', 'Local SEO', 'WhatsApp Integration'],
    metrics: [
      { label: 'Location', value: 'Mookgopong & surrounds' },
      { label: 'Status', value: 'First paying client' },
      { label: 'Care plan', value: 'R400/mo ongoing' },
    ],
  },
]

export const getProject = (slug?: string) =>
  projects.find((p) => p.slug === slug)
