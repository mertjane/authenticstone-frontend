export interface MegaMenuItem {
  title: string;
  link: string | null;
  children?: MegaMenuItem[];
}
