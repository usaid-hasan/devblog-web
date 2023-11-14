import { useCallback, useRef, useState } from 'react';
import { NetworkStatus } from '@apollo/client';

export default function useFeed(feed, feedName, fetchMore, networkStatus) {
  const [fetchMoreError, setFetchMoreError] = useState(null);

  const infiniteScroll = useCallback(async (entries, observer) => {
    if (entries[0].isIntersecting && feed.hasNextPage) {
      try {
        const fetchedData = await fetchMore({ variables: { cursor: feed.cursor } });
        if (!fetchedData.data[feedName].hasNextPage) observer.disconnect();
      } catch (err) {
        observer.disconnect();
        setFetchMoreError(err);
      }
    }
  }, [feed, feedName, fetchMore]);

  const observerRef = useRef();
  const lastItemRef = useCallback((node) => {
    if (networkStatus === NetworkStatus.loading) return;
    if (networkStatus === NetworkStatus.fetchMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(infiniteScroll, {
      root: null,
      threshold: 0.75,
      rootMargin: '0px 0px 64px 0px',
    });
    if (node) observerRef.current.observe(node);
  }, [infiniteScroll, networkStatus]);

  return { lastItemRef, fetchMoreError };
}
