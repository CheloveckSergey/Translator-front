import { MouseEvent, useEffect, useState } from "react"
import { Copyable, ShowWarningIf, UsualQuery, WarningOperation } from "../../types";
import { InfiniteData, UseInfiniteQueryResult, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

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

  // const [entities, setEntities] = useState<Entity[]>([]);

  const result = useInfiniteQuery({
    queryKey: [queryKey], //какой то бред
    queryFn: async ({ pageParam = query.offset ?? 0 }) => {
      const data = await apiFunction({ 
        ...query,
        offset: pageParam,
      });
      
      // setEntities(old => [...old, ...data.map(mapDto)]);

      return data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    select: (data) => {
      return data.pages.flat().map(mapDto);
    }
  });

  // function updateState() {
  //   const newEntities = entities.map(entity => entity.getCopy());
  //   setEntities(newEntities); 
  // }

  return {
    ...result,
    data: result.data || [],
  }
}

function useMyInfineQuery2<
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
  const result = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = query.offset ?? 0 }) => {
      const data = await apiFunction({ 
        ...query,
        offset: pageParam,
      });
      return data.map(mapDto)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    select: (data) => {
      return data.pages.flat();
    }
  });

  return {
    ...result,
    data: result.data || [],
  }
}

function useMyInfineQuery3<
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
  queryKey: string[],
}) {
  const result = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = query.offset ?? 0 }) => {
      const data = await apiFunction({ 
        ...query,
        offset: pageParam,
      });
      return data.map(mapDto)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    select: (data) => {
      return data.pages.flat();
    },
  });

  const queryClient = useQueryClient();

  // function updateState() {
  //   const newEntities = result.data?.map(entity => entity.getCopy());
  //   queryClient.setQueryData(queryKey, (old: Entity[]) => {
  //     return old?.map(entity => entity.getCopy())
  //   }); 
  // }

  function updateState() {
    queryClient.setQueryData(queryKey, (old: InfiniteData<Entity[]>) => {
      console.log(1);
      console.log(old);
      const newPages = old.pages.map(page => {
        return page.map(entity => entity.getCopy())
      });
      const newData: InfiniteData<Entity[]> = {
        pageParams: old.pageParams,
        pages: newPages,
      }
      console.log(newData);
      return newData
    }) 
  }

  return {
    ...result,
    data: result.data || [],
    updateState,
  }
}

function useWarning() {
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [operation, setOperation] = useState<WarningOperation>();
  const [warnings, setWarnings] = useState<string[]>([]);

  function showWarning(operation: () => void, texts: string[]) {
    setOperation({
      operation,
    });
    setWarnings(texts);
    setIsWarning(true);
  }

  const showWarningIf: ShowWarningIf = (
    conditionText: {
      condition: boolean,
      text: string,
    } | {
      condition: boolean,
      text: string,
    }[],
    operation: () => void, 
  ) => {
    if (Array.isArray(conditionText)) {
      const texts: string[] = [];
      for (let condition of conditionText) {
        if (condition.condition) {
          texts.push(condition.text);
        }
      }
      if (texts.length) {
        showWarning(operation, texts);
      } else {
        operation();
      }
    } else {
      if (conditionText.condition) {
        showWarning(operation, [conditionText.text]);
      } else {
        operation();
      }
    }
  }
  
  function closeWarning() {
    setIsWarning(false);
    setOperation(undefined);
    setWarnings([]);
  }

  return {
    isWarning,
    operation,
    warnings,
    showWarning,
    showWarningIf,
    closeWarning,
  }
}

export const SharedHooks = {
  useClickOutside,
  useMyInfineQuery,
  useMyInfineQuery2,
  useMyInfineQuery3,
  useWarning,
}