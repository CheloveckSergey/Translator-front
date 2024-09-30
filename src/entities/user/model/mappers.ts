import { FindFriendDto, FriendDto, IncomeRequestUserDto, OutcomeRequestUserDto, UserDto } from "./dto";
import { FindFriend } from "./findFriend";
import { Friend } from "./friend";
import { IncomeRequestUser } from "./incomeRequest";
import { OutcomeRequestUser } from "./outcomeRequest";
import { User } from "./user";

export function mapUserDto(dto: UserDto): User {
  const user = new User(dto.id, dto.login, dto.isFriend, dto.isSentRequest);
  return user;
}

export function mapFindFriendDto(findFriendDto: FindFriendDto): FindFriend {
  const user = new FindFriend(findFriendDto.id, findFriendDto.login);
  return user;
}

export function mapFriendDto(friendDto: FriendDto): Friend {
  const user = new Friend(friendDto.id, friendDto.login);
  return user;
}

export function mapIncomeRequest(dto: IncomeRequestUserDto): IncomeRequestUser {
  const user = new IncomeRequestUser(dto.id, dto.login);
  if (dto.status === 'rejected') {
    user.setIsRejected(true);
  }
  return user
}

export function mapOutcomeRequest(dto: OutcomeRequestUserDto): OutcomeRequestUser {
  const user = new OutcomeRequestUser(dto.id, dto.login);
  if (dto.status === 'rejected') {
    user.setIsRejected(true);
  }
  return user
}