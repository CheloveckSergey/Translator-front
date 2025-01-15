import { MouseEvent, useEffect, useState } from "react"
import { useInfiniteQuery } from "react-query";
import { Copyable, UsualQuery } from "../../types";

function useClickOutside<T extends HTMLElement>(ref: React.MutableRefObject<T> | null, callback: () => void) {
  const handleClick = (e: globalThis.MouseEvent) => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);
}

function useMyInfineQuery<
  Entity extends Copyable<Entity>,
  Query extends UsualQuery,
  Dto,
>({
  query,
  apiFunction,
  mapDto,
  queryKey,
} : {
  query: Query,
  apiFunction: (query: Query) => Promise<Dto[]>,
  mapDto: (dto: Dto) => Entity,
  queryKey?: (string | number)[] | undefined,
}) {

  const [entities, setEntities] = useState<Entity[]>([]);

  const data = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam = query.offset ?? 0 }) => {
      return apiFunction({ 
        ...query,
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    onSuccess: (data) => {
      let entities: Entity[] = [];
      for (let page of data.pages) {
        const curEntities = page.map(mapDto);
        entities = [...entities, ...curEntities];
      }
      setEntities(entities);
    }
  });

  function updateState() {
    const newEntities = entities.map(entity => entity.getCopy());
    setEntities(newEntities); 
  }

  return {
    entities,
    updateState,
    ...data,
  }
}

export const SharedHooks = {
  useClickOutside,
  useMyInfineQuery,
}