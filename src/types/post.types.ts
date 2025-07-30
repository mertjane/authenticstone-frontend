export interface BlogPosts {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: string;
  og_image: {
    width: number;
    height: number;
    url: string;
    type: string;
  }[];
}