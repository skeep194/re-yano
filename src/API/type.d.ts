interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
  topRanks: T;
  user: T;
  userStats: T;
  userRank: T;
  userGames: T;
}

interface Season {
  seasonID: number;
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  isCurrent: number;
}

interface UserRank {
  userNum: number;
  nickname: string;
  rank: number;
  mmr: number;
}

interface UserNickname {
  userNum: number;
  nickname: string;
}

interface UserStat {
  seasonId: number;
  userNum: number;
  matchingMode: number;
  matchingTeamMode: number;
  mmr: number;
  nickname: string;
  rank: number;
  rankSize: number;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  totalDeaths: number;
  escapeCount: number;
  rankPercent: number;
  averageRank: number;
  averageKills: number;
  averageAssistants: number;
  averageHunts: number;
  top1: number;
  top2: number;
  top3: number;
  top5: number;
  top7: number;
  characterStats: CharacterStat[];
}

interface CharacterStat {
  characterCode: number;
  totalGames: number;
  usages: number;
  maxKillings: number;
  top3: number;
  wins: number;
  win3Rate: number;
  averageRank: number;
}

interface UserOneRank {
  userNum: number;
  serverCode: number;
  mmr: number;
  serverRank: number;
  nickname: number;
  rank: number;
}

interface UserGame {
  userNum: number;
  nickname: string;
  gameId: number;
  seasonId: number;
  matchingMode: number;
  matchingTeamMode: number;
  characterNum: number;
  skinCode: number;
  characterLevel: number;
  gameRank: number;
  playerKill: number;
  playerAssistant: number;
  monsterKill: number;
  bestWeapon: number;
  bestWeaponLevel: number;
  masteryLevel: Record<number, number>;
  equipment: Record<number, number>;
  equipmentGrade: Record<number, number>;
  versionMajor: number;
  versionMinor: number;
  language: string;
  skillLevelInfo: Record<number, number>;
  skillOrderInfo: Record<number, number>;
  serverName: string;
  maxHp: number;
  maxSp: number;
  attackPower: number;
  defense: number;
  hpRegen: number;
  spRegen: number;
  attackSpeed: number;
  moveSpeed: number;
  outOfCombatMoveSpeed: number;
  sightRange: number;
  attackRange: number;
  criticalStrikeChance: number;
  criticalStrikeDamage: number;
  coolDownReduction: number;
  lifeSteal: number;
  normalLifeSteal: number;
  skillLifeSteal: number;
  amplifierToMonster: number;
  trapDamage: number;
  bonusCoin: number;
  gainExp: number;
  baseExp: number;
  bonusExp: number;
  startDtm: string;
  duration: number;
  mmrBefore: number;
  mmrGain: number;
  mmrAfter: number;
  playTime: number;
  watchTime: number;
  totalTime: number;
  survivableTime: number;
  botAdded: number;
  botRemain: number;
  restrictedAreaAccelerated: number;
  safeAreas: number;
  teamNumber: number;
  preMade: number;
  eventMissionResult: Record<string, any>;
  gainedNormalMmrKFactor: number;
  victory: number;
  craftUncommon: number;
  craftRare: number;
  craftEpic: number;
  craftLegend: number;
  damageToPlayer: number;
  damageToPlayer_trap: number;
  damageToPlayer_basic: number;
  damageToPlayer_skill: number;
  damageToPlayer_itemSkill: number;
  damageToPlayer_direct: number;
  damageToPlayer_uniqueSkill: number;
  damageFromPlayer: number;
  damageFromPlayer_trap: number;
  damageFromPlayer_basic: number;
  damageFromPlayer_skill: number;
  damageFromPlayer_itemSkill: number;
  damageFromPlayer_direct: number;
  damageFromPlayer_uniqueSkill: number;
  damageToMonster: number;
  damageToMonster_trap: number;
  damageToMonster_basic: number;
  damageToMonster_skill: number;
  damageToMonster_itemSkill: number;
  damageToMonster_direct: number;
  damageToMonster_uniqueSkill: number;
  damageFromMonster: number;
  damageToPlayer_Shield: number;
  damageOffsetedByShield_Player: number;
  damageOffsetedByShield_Monster: number;
  killMonsters: Record<number, number>;
  healAmount: number;
  teamRecover: number;
  protectAbsorb: number;
  addSurveillanceCamera: number;
  addTelephotoCamera: number;
  removeSurveillanceCamera: number;
  removeTelephotoCamera: number;
  useHyperLoop: number;
  useSecurityConsole: number;
  giveUp: number;
  teamSpectator: number;
  routeIdOfStart: number;
  routeSlotId: number;
  placeOfStart: string;
  mmrAvg: number;
  matchSize: number;
  teamKill: number;
  totalFieldKill: number;
  accountLevel: number;
  killerUserNum: number;
  killer: string;
  killDetail: string;
  causeOfDeath: string;
  placeOfDeath: string;
  killerCharacter: string;
  killerWeapon: string;
  killerUserNum2: number;
  killer2: string;
  killDetail2: string;
  causeOfDeath2: string;
  placeOfDeath2: string;
  killerCharacter2: string;
  killerWeapon2: string;
  killerUserNum3: number;
  fishingCount: number;
  useEmoticonCount: number;
  expireDtm: string;
  traitFirstCore: number;
  traitFirstSub: number[];
  traitSecondSub: number[];
  airSupplyOpenCount: number[];
  foodCraftCount: number[];
  beverageCraftCount: number[];
  rankPoint: number;
  totalTurbineTakeOver: number;
  usedNormalHealPack: number;
  usedReinforcedHealPack: number;
  usedNormalShieldPack: number;
  usedReinforceShieldPack: number;
  totalVFCredits: number[];
  activelyGainedCredits: number;
  usedVFCredits: number[];
  sumUsedVFCredits: number;
  craftMythic: number;
  playerDeaths: number;
  killGamma: boolean;
  scoredPoint: number[];
  killDetails: string;
  deathDetails: string;
  killsPhaseOne: number;
  killsPhaseTwo: number;
  killsPhaseThree: number;
  deathsPhaseOne: number;
  deathsPhaseTwo: number;
  deathsPhaseThree: number;
  usedPairLoop: number;
  ccTimeToPlayer: number;
  creditSource: Record<string, number>;
  boughtInfusion: string;
  itemTransferredConsole: number[];
  itemTransferredDrone: number[];
  escapeState: number;
  totalDoubleKill: number;
  totalTripleKill: number;
  totalQuadraKill: number;
  totalExtraKill: number;
  tacticalSkillGroup: number;
  tacticalSkillLevel: number;
  totalGainVFCredit: number;
  killPlayerGainVFCredit: number;
  teamElimination: number;
  skillAmp: number;
  tacticalSkillUseCount: number;
  creditRevivalCount: number;
  creditRevivedOthersCount: number;
  viewContribution: number;
  useReconDrone: number;
  useEmpDrone: number;
  exceptPreMadeTeam: boolean;
  terminateCount: number;
  clutchCount: number;
  unknownKill: number;
  mainWeather: number;
  subWeather: number;
  activeInstallation: Record<number, number>;
  getBuffCubeRed: number;
  sumGetBuffCube: number;
}
