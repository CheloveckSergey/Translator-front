import { FC } from "react";
import './styles.scss';
import { UsersPageLib } from "../../lib";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";

export const Menu: FC = () => {

  const { searchType, setSearchType } = UsersPageLib.useUsersSearchType();

  return (
    <div className="users-menu">
      <SharedBlocks.MenuPoint 
        body="Friends"
        active={searchType === 'friends'}
        onClick={() => setSearchType('friends')}
        className="point"
      />
      <SharedBlocks.MenuPoint 
        body="Find friends"
        active={searchType === 'findFriends'}
        onClick={() => setSearchType('findFriends')}
        className="point"
      />
      <SharedBlocks.MenuPoint 
        body="Requests"
        active={searchType === 'outcomeRequests' || searchType === 'incomeRequests'}
        onClick={() => setSearchType('incomeRequests')}
        className="point"
      />
    </div>
  )
}