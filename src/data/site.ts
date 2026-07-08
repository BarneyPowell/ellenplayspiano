export const site = {
  name: "Ellen Plays Piano",
  tagline: "Piano tuition for all ages",
  email: import.meta.env.WEBSITE_EMAIL ?? "hello@ellenplayspiano.com",
  location: "Home studio in London N14",
  year: 2026,
  url: (import.meta.env.WEBSITE_URL ?? "https://ellenplayspiano.com") as string,
  socialImage: "/assets/images/ellen-landscape.jpg",
} as const;

export const seo = {
  title: "Piano Teacher & Tuition in Enfield | Ellen Plays Piano",
  description:
    "Classical piano lessons and piano tuition for children and adults in Enfield, London N14 and online. ABRSM and Trinity preparation. 30 years' experience.",
  locale: "en_GB",
} as const;

export const socialLinks = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/ellen_plays_piano",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@EllenPlaysPiano",
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@ellenplaysthepiano",
  },
] as const;

export const serviceAreas = [
  "Enfield",
  "London N14",
  "Southgate",
  "Winchmore Hill",
  "Palmers Green",
  "Oakwood",
  "North London",
] as const;

const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": absoluteUrl("#business"),
  name: site.name,
  url: site.url,
  image: absoluteUrl(site.socialImage),
  email: site.email,
  description: seo.description,
  priceRange: "£40 per hour",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    postalCode: "N14",
    addressCountry: "GB",
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": "Place",
    name: area,
  })),
  sameAs: socialLinks.map((link) => link.url),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "lesson enquiries",
    email: site.email,
    areaServed: "GB",
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Piano tuition",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Children's piano lessons",
          serviceType: "Classical piano lessons for children",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adult piano lessons",
          serviceType: "Classical piano lessons for adults",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ABRSM and Trinity exam preparation",
          serviceType: "Piano exam preparation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Remote piano tuition",
          serviceType: "Online piano lessons",
        },
      },
    ],
  },
  knowsAbout: [
    "Classical piano",
    "Piano tuition",
    "Children's piano lessons",
    "Adult piano lessons",
    "ABRSM piano exams",
    "Trinity piano exams",
    "Online piano lessons",
  ],
} as const;

export const hero = {
  label: "Piano tuition in Enfield & online",
  heading: ["The art of learning to", "play"],
  // "play" is rendered in italic gold — split deliberately
  subtext:
    "Classical piano lessons from a calm home studio in London N14, rooted in thirty years of musical experience, patient guidance, and the quiet joy of discovery.",
  cta: { label: "Book a Trial Lesson", href: "#contact" },
} as const;

export const about = {
  heading: "About Ellen",
  lead: "Thirty years at the piano — as performer, student, and teacher. A deep belief that musical education is for everyone, at every stage of life.",
  columns: [
    "As a piano teacher, my work is grounded in the classical tradition — careful technique, structured progression, and a genuine respect for the discipline that makes real musicianship possible. I prepare pupils for ABRSM and Trinity examinations, but exams are only part of the picture.",
    "What I truly care about is helping each person — whether they're seven or seventy — develop a lasting, personal relationship with music. From my home studio in London N14, I teach pupils from Enfield, Southgate, Winchmore Hill, Palmers Green and nearby North London. Some pupils learn remotely from further afield, including the US.",
  ],
} as const;

export interface Lesson {
  audience: string;
  name: string;
  description: string;
  duration: string;
}

export const lessonsLead = "Programmes shaped around where you are, where you'd like to go, and whether lessons are in person or online.";

export const lessons: Lesson[] = [
  {
    audience: "Ages 7-11",
    name: "Building Foundations",
    description:
      "Developing technique, communication and imagination. Working confidently towards graded examinations, with lessons paced carefully around the child in front of me.",
    duration: "30 minutes",
  },
  {
    audience: "Ages 11-16",
    name: "Young Musicians",
    description:
      "Expanding repertoire and deepening interpretation. The learner will start to appreciate the rewards of serious, dedicated practice. Lessons take place on my beautifully regulated Kemble upright piano at my home studio in London N14, close to Enfield and Southgate.",
    duration: "45 minutes",
  },
  {
    audience: "Adults",
    name: "A Fresh Start — or a Return",
    description:
      "Whether you're picking up the piano for the first time or rediscovering it after years away, lessons are shaped entirely around you — your pace, your goals, your music. Remote piano tuition is available where it suits the pupil.",
    duration: "45-60 minutes",
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

// Pull quote removed — placeholder testimonial pending real one from Ellen.

export const contact = {
  heading: "Get in touch",
  lead: "I'd love to hear from you. Whether you're enquiring for a child or for yourself, local to Enfield and London N14 or looking for online lessons, send me a message and I'll reply within a day or two to arrange an initial conversation.",
} as const;

export interface TrustItem {
  label: string;
  icon: "shield" | "clock" | "music" | "pin";
}

export const trustItems: TrustItem[] = [
  { label: "Enhanced DBS checked", icon: "shield" },
  { label: "30 years' experience", icon: "clock" },
  { label: "ABRSM & Trinity preparation", icon: "music" },
  { label: "London N14, near Enfield", icon: "pin" },
];
