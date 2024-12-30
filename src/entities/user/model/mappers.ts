import { CurUser } from "./types/curUser";
import { PotentialFriendDto, FriendDto, IncomeRequestUserDto, OutcomeRequestUserDto, ResAuthDto, UserDto } from "./dto";
import { Friend, IncomeRequestUser, OutcomeRequestUser, PotentialFriend, User } from ".";

export function mapUserDto(dto: UserDto): User {
  const user = new User(dto.id, dto.login, dto.isFriend, dto.isSentRequest, dto.avatar, dto.wordsNumber);
  return user;
}

export function mapFindFriendDto(findFriendDto: PotentialFriendDto): PotentialFriend {
  const user = new PotentialFriend(findFriendDto.id, findFriendDto.login);
  return user;
}

export function mapFriendDto(friendDto: FriendDto): Friend {
  const user = new Friend(friendDto.id, friendDto.login);
  return user;
}

export function mapIncomeRequest(dto: IncomeRequestUserDto): IncomeRequestUser {
  const user = new IncomeRequestUser(dto.id, dto.login, dto.status);
  return user
}

export function mapOutcomeRequest(dto: OutcomeRequestUserDto): OutcomeRequestUser {
  const user = new OutcomeRequestUser(dto.id, dto.login, dto.status);
  return user
}

export function mapCurUser(dto: ResAuthDto) {
  const user = new CurUser(dto.id, dto.login, dto.accessToken, dto.avatar);
  return user;
}