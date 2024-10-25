import { useParams } from "react-router-dom";

export function useUrlUserId(): number {
  const { userId: _userId } = useParams();
  const userId = Number(_userId);
  return userId
}