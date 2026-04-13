export type Project = {
  id: number;
  title: string;
  slug: string;
  githubUrl: string;
  demoUrl: string | null;
  imageUrl: string | null;
  contributors: string | null;
  publishedAt: Date | null;
  promotionId: number;
  adaProjectId: number;
  promotionName?: string;
  adaProjectName?: string;
};
