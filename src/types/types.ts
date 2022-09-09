export interface NflApi {
  sports: Sport[];
}

export interface Sport {
  id: string;
  uid: string;
  name: string;
  slug: string;
  leagues: League[];
}

export interface League {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  shortName: string;
  slug: string;
  isTournament: boolean;
  events: Event[];
  smartdates: Smartdate[];
}

export interface Event {
  gamecastAvailable: boolean;
  playByPlayAvailable: boolean;
  commentaryAvailable: boolean;
  recent: boolean;
  id: string;
  competitionId: string;
  uid: string;
  date: Date;
  timeValid: boolean;
  name: string;
  shortName: string;
  location: string;
  season: number;
  seasonStartDate: Date;
  seasonEndDate: Date;
  seasonType: string;
  seasonTypeHasGroups: boolean;
  group: Group;
  week: number;
  weekText: WeekText;
  period: number;
  clock: Clock;
  status: Stat;
  summary: string;
  fullStatus: FullStatus;
  link: string;
  links: Link[];
  onWatch: boolean;
  broadcasts: Broadcast[];
  broadcast: string;
  odds: Odds;
  competitors: Competitor[];
  appLinks: Link[];
}

export interface Link {
  language: Language;
  rel: Rel[];
  href: string;
  text: Text;
  shortText?: ShortText;
  isExternal: boolean;
  isPremium: boolean;
}

export enum Language {
  EnUS = "en-US"
}

export enum Rel {
  App = "app",
  Desktop = "desktop",
  Event = "event",
  Sportscenter = "sportscenter",
  Summary = "summary",
  Watchespn = "watchespn"
}

export enum ShortText {
  Summary = "Summary",
  WatchESPN = "WatchESPN"
}

export enum Text {
  Gamecast = "Gamecast",
  WatchESPN = "WatchESPN"
}

export interface Broadcast {
  type: BroadcastType;
  station: string;
  slug: string;
  priority: number;
  lang: Lang;
  region: Region;
  typeId: number;
  isNational: boolean;
  broadcasterId: number;
  broadcastId: number;
  name: string;
  shortName: string;
  callLetters: string;
}

export enum Lang {
  En = "en"
}

export enum Region {
  Us = "us"
}

export enum BroadcastType {
  Tv = "TV"
}

export enum Clock {
  The000 = "0:00",
  The1500 = "15:00"
}

export interface Competitor {
  id: string;
  uid: string;
  type: CompetitorType;
  order: number;
  homeAway: HomeAway;
  score: string;
  record: Record;
  logo: string;
  logoDark: string;
  winner: boolean;
  displayName: string;
  name: string;
  abbreviation: string;
  location: string;
  color: string;
  alternateColor: string;
  group: string;
  competitionIdPrevious: string;
  competitionIdNext: string;
}

export enum HomeAway {
  Away = "away",
  Home = "home"
}

export enum Record {
  The00 = "0-0"
}

export enum CompetitorType {
  Team = "team"
}

export interface FullStatus {
  clock: number;
  displayClock: Clock;
  period: number;
  type: TypeClass;
}

export interface TypeClass {
  id: string;
  name: TypeName;
  state: Stat;
  completed: boolean;
  description: Description;
  detail: string;
  shortDetail: string;
}

export enum Description {
  Scheduled = "Scheduled"
}

export enum TypeName {
  StatusScheduled = "STATUS_SCHEDULED"
}

export enum Stat {
  Pre = "pre"
}

export interface Group {
  groupId: string;
  name: GroupName;
  abbreviation: Abbreviation;
  shortName: ShortName;
}

export enum Abbreviation {
  Reg = "reg"
}

export enum GroupName {
  RegularSeason = "Regular Season"
}

export enum ShortName {
  Reg = "REG"
}

export interface Odds {
  provider: Provider;
  details: string;
  overUnder: number;
  spread: number;
  overOdds: number;
  underOdds: number;
  awayTeamOdds: TeamOdds;
  homeTeamOdds: TeamOdds;
  links: any[];
  moneylineWinner: boolean;
  spreadWinner: boolean;
  home: Away;
  away: Away;
}

export interface Away {
  moneyLine: number;
}

export interface TeamOdds {
  favorite: boolean;
  underdog: boolean;
  moneyLine: number;
  spreadOdds: number;
  team: Team;
}

export interface Team {
  id: string;
  abbreviation: string;
}

export interface Provider {
  id: string;
  name: ProviderName;
  priority: number;
}

export enum ProviderName {
  CaesarsSportsbookNewJersey = "Caesars Sportsbook (New Jersey)"
}

export enum WeekText {
  Week1 = "Week 1"
}

export interface Smartdate {
  label: string;
  seasontype: number;
  week: number;
  season: number;
}
