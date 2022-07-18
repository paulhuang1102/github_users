export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  site_admin: boolean;
  number_of_items: number;
};

export interface GithubUserDetail extends GithubUser {
  name: string;
  bio: string;
  location: string | null;
  blog: string;
}
