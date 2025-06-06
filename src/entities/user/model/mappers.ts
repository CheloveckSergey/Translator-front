import { CurUser } from "./types/curUser";
import { FindFriendDto, FriendDto, IncomeRequestUserDto, OutcomeRequestUserDto, ResAuthDto, AvatarUserDto } from "./dto";
import { AvatarUser, Friend, IncomeRequestUser, OutcomeRequestUser, PotentialFriend, User } from ".";

export function mapAvatarUserDto(dto: AvatarUserDto): AvatarUser {
  const user = new AvatarUser(dto.id, dto.login, dto.isFriend, dto.isSentRequest, dto.avatar, dto.wordsNumber);
  return user;
}

export function mapFindFriendDto(dto: FindFriendDto): PotentialFriend {
  const user = new PotentialFriend(dto.id, dto.login, dto.avatar, dto.wordsNumber,);
  return user;
}

export function mapFriendDto(dto: FriendDto): Friend {
  const user = new Friend(dto.id, dto.login, dto.avatar, dto.wordsNumber);
  return user;
}

export function mapIncomeRequest(dto: IncomeRequestUserDto): IncomeRequestUser {
  const user = new IncomeRequestUser(dto.id, dto.login, dto.status, dto.avatar, dto.wordsNumber);
  return user
}

export function mapOutcomeRequest(dto: OutcomeRequestUserDto): OutcomeRequestUser {
  const user = new OutcomeRequestUser(dto.id, dto.login, dto.status, dto.avatar, dto.wordsNumber);
  return user
}

export function mapCurUser(dto: ResAuthDto) {
  const user = new CurUser(dto.id, dto.login, dto.accessToken, dto.avatar);
  return user;
}