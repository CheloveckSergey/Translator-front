import { MouseEvent, useEffect, useState } from "react"
import { useInfiniteQuery } from "react-query";
import { Copyable, ShowWarningIf, UsualQuery, WarningOperation } from "../../types";

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
  useWarning,
}