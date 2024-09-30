import { useSearchParams } from "react-router-dom";

type UsersSearchType = 'findFriends' | 'friends' | 'incomeRequests' | 'outcomeRequests';

const useUsersSearchType = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let searchType: UsersSearchType | null = null;

  const type = searchParams.get('type');

  if (type === 'findFriends' || type === 'friends' || type === 'incomeRequests' || type === 'outcomeRequests') {
    searchType = type;
  }

  function setSearchType(type: UsersSearchType) {
    setSearchParams(searchParams => {
      searchParams.set('type', type);
      return searchParams
    })
  }

  return {
    searchType,
    setSearchType
  }
}

export const UsersPageLib = {
  useUsersSearchType,
}