import { useEffect, useState } from 'react';
import {
  DEFAULT_CONTENT,
  fetchSection,
  type SiteContent,
} from './content';

// Module-level cache so multiple components on the same page share one fetch
const cache = new Map<keyof SiteContent, unknown>();
const inflight = new Map<keyof SiteContent, Promise<unknown>>();

export function useContent<K extends keyof SiteContent>(section: K): SiteContent[K] {
  const [value, setValue] = useState<SiteContent[K]>(
    () => (cache.get(section) as SiteContent[K] | undefined) ?? DEFAULT_CONTENT[section],
  );

  useEffect(() => {
    if (cache.has(section)) {
      setValue(cache.get(section) as SiteContent[K]);
      return;
    }
    let cancelled = false;

    const promise = inflight.get(section) ?? fetchSection(section);
    inflight.set(section, promise);

    promise.then((result) => {
      cache.set(section, result);
      inflight.delete(section);
      if (!cancelled) setValue(result as SiteContent[K]);
    });

    return () => {
      cancelled = true;
    };
  }, [section]);

  return value;
}

export function invalidateCache<K extends keyof SiteContent>(section?: K) {
  if (section) cache.delete(section);
  else cache.clear();
}
