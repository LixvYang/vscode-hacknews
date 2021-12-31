export interface ITopStoriesTarget {
  by?:          string;
  descendants?: number;
  id?:          number;
  kids?:        number[];
  score?:       number;
  time?:        number;
  title?:       string;
  type?:        string;
  url?:         string;
  read?:        boolean;
}
