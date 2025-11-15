export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  category: string;
  audioUrl?: string;
  videoUrl?: string;
  summary: string;
  coverImage: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
};

export type Ministry = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type Donation = {
  id: string;
  name: string;
  amount: number;
  date: string;
  campaign: string;
};
