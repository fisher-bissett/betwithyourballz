export interface Bet {
  favorite?: String;
  over?: String;
  under?: String;
  underdog?: String;
  userId: String;
  weekNumber: number;
}

export interface SelectOption {
  label: String;
  name: String;
  stat: String;
}
