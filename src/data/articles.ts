import { localBusinessSchema, site } from "./site";

export interface ArticleData {
  slug: string;
  title: string;
  label: string;
  description: string;
  standfirst: string;
  audience: string;
  readTime: string;
  body: string[];
  researchLink?: {
    paragraphIndex: number;
    text: string;
    url: string;
  };
}

export const articles: ArticleData[] = [
  {
    slug: "/articles/piano-and-adhd/",
    title: "Piano and ADHD: why music can be a great fit",
    label: "For parents",
    description:
      "A thoughtful note from Ellen on why piano lessons can suit many children with ADHD, and how patient, flexible teaching can help them feel successful.",
    standfirst:
      "Children with ADHD are often full of creativity, imagination and energy. Many are naturally musical, and with the right support they can flourish at the piano.",
    audience: "Children's piano lessons",
    readTime: "3 minute read",
    body: [
      "Learning piano gives children a chance to channel their focus, build confidence and experience the satisfaction of steady progress. It can also help develop listening skills, coordination, memory and perseverance. For many children, music becomes a positive outlet where their enthusiasm and originality are real strengths.",
      "A good teacher will often need to be flexible and think creatively. Short activities, movement, improvisation, games, composition and varied practice tasks can all help keep lessons engaging and successful. Just as important is a warm, positive relationship between teacher and pupil, so the child feels safe, understood and encouraged.",
      "Parents also play a vital role. Regular practice between lessons helps children make progress and see how their effort turns into improvement over time. That sense of achievement can be incredibly motivating.",
      "A small body of research has explored whether music training may support attention and inhibitory control in children with ADHD, although every child is different and music is not a treatment in itself. The goal is enjoyment and progress, not perfection. When children feel successful and supported, they are more likely to stay motivated and keep growing.",
      "With patience, encouragement and the right teaching style, piano can be a wonderful experience for children with ADHD — one that nurtures both musical skill and self-belief.",
    ],
    researchLink: {
      paragraphIndex: 3,
      text: "A small body of research",
      url: "https://doi.org/10.5334/jeps.582",
    },
  },
];

export const featuredArticle = articles[0];

export const articleSchemaFor = (article: ArticleData) => {
  const url = new URL(article.slug, site.url).toString();

  return [
    localBusinessSchema,
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.description,
      url,
      image: new URL(site.socialImage, site.url).toString(),
      author: {
        "@type": "Person",
        name: "Ellen",
      },
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
      about: ["Piano lessons", "ADHD", "Children's music education"],
      mainEntityOfPage: url,
    },
  ];
};
