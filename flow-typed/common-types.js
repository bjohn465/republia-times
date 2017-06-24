import type MorningScreen from '../morning-screen'

declare type Day = number

declare type GovernmentName = 'Republia' | 'Democria'

declare type Screen = MorningScreen

declare type GameState = {|
  day: Day,
  governmentName: GovernmentName,
  isSoundOn: boolean,
  loyalty: number,
  readers: number,
  screen: Screen
|}
