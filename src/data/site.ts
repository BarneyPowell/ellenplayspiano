export const site = {
  name: "Ellen Plays Piano",
  tagline: "Piano tuition for all ages",
  email: "hello@ellenplayspiano.com",
  location: "Home studio in London N14",
  year: 2026,
} as const;

export const hero = {
  label: "Piano tuition for all ages",
  heading: ["The art of learning to", "play"],
  // "play" is rendered in italic gold — split deliberately
  subtext:
    "Classical piano lessons rooted in thirty years of musical experience, patient guidance, and the quiet joy of discovery — for children and adults alike.",
  cta: { label: "Book a Consultation", href: "#contact" },
} as const;

export const about = {
  heading: "About Ellen",
  lead: "Thirty years at the piano — as performer, student, and teacher. A deep belief that musical education is for everyone, at every stage of life.",
  columns: [
    "My teaching is grounded in the classical tradition — careful technique, structured progression, and a genuine respect for the discipline that makes real musicianship possible. I prepare pupils for ABRSM and Trinity examinations with consistently strong results, but exams are only part of the picture.",
    "What I truly care about is helping each person — whether they're five or fifty-five — develop a lasting, personal relationship with music. One that brings confidence, calm, creative satisfaction, and the quiet pride of mastering something beautiful.",
  ],
} as const;

export interface Lesson {
  audience: string;
  name: string;
  description: string;
  duration: string;
}

export const lessons: Lesson[] = [
  {
    audience: "Ages 5–7",
    name: "First Steps",
    description:
      "A playful, gentle introduction. Building rhythm, hand position, and a love of music from the very first note.",
    duration: "20 minutes",
  },
  {
    audience: "Ages 7–11",
    name: "Building Foundations",
    description:
      "Developing fluency, sight-reading, and expression. Working confidently towards graded examinations.",
    duration: "30 minutes",
  },
  {
    audience: "Ages 11–16",
    name: "Young Musicians",
    description:
      "Ambitious repertoire, nuanced interpretation, and the poise that comes from dedicated, serious practice.",
    duration: "45 minutes",
  },
  {
    audience: "Adults",
    name: "A Fresh Start — or a Return",
    description:
      "Whether you're picking up the piano for the first time or rediscovering it after years away, lessons are shaped entirely around you — your pace, your goals, your music.",
    duration: "45–60 minutes",
  },
];

export const lessonsRateNote = "All lessons are £40 per hour, pro-rated for shorter sessions.";

export interface PhilosophyItem {
  heading: string;
  body: string;
}

export const philosophy: PhilosophyItem[] = [
  {
    heading: "Patience over pressure",
    body: "Real progress comes from consistent, calm practice — never from rushing. I meet each pupil exactly where they are.",
  },
  {
    heading: "Structure gives freedom",
    body: "A solid technical foundation doesn't constrain creativity — it enables it. Discipline opens doors that enthusiasm alone cannot.",
  },
  {
    heading: "The whole person",
    body: "Piano teaches focus, resilience, and the deep satisfaction of craft. These gifts last far beyond the instrument itself.",
  },
  {
    heading: "Beauty matters",
    body: "I choose repertoire with care. Even at the earliest stages, every pupil deserves to play music that is genuinely beautiful.",
  },
];

export const pullQuote = {
  text: "She doesn't just teach piano — she teaches you how to love the process of learning something difficult and beautiful.",
  attribution: "Parent of a Grade 4 pupil",
} as const;

export const contact = {
  heading: "Get in touch",
  lead: "I'd love to hear from you. Whether you're enquiring for a child or for yourself, send me a message and I'll reply within a day or two to arrange an initial conversation.",
} as const;

export interface TrustItem {
  label: string;
  icon: "shield" | "clock" | "music" | "pin";
}

export const trustItems: TrustItem[] = [
  { label: "Enhanced CRB checked", icon: "shield" },
  { label: "30 years' experience", icon: "clock" },
  { label: "ABRSM & Trinity preparation", icon: "music" },
  { label: "Home studio in London N14", icon: "pin" },
];
