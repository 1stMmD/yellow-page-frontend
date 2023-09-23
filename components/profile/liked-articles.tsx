"use client";

import { useGetLikedArticles } from "@/hooks/use-get-liked-articles";
import ArticleList from "../articles/articles-list";

const LikedArticles = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetLikedArticles(id);

  console.log(JSON.stringify(data, null, 2));

  return (
    <ArticleList
      data={data}
      fetchNextPage={() => {
        fetchNextPage();
      }}
      hasNextPage={!!hasNextPage}
      isError={isError}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
    />
  );
};

export default LikedArticles;
