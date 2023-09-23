import { custom_fetch } from "@/lib/custom-fetch";
import { GetAllArticlesApiResponse } from "@/types/api";
import { useInfiniteQuery } from "react-query";

export const useGetLikedArticles = (id: string) => {
  const res = useInfiniteQuery({
    queryKey: ["articles", "liked", id],
    queryFn: async ({ pageParam = 0 }) => {
      const res: GetAllArticlesApiResponse = await custom_fetch(
        `/api/users/${id}/like-history?pageIndex=${pageParam}&pageSize=12`,
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null;

      if (typeof lastPage.pageIndex !== "number") return;

      if (!lastPage.hasNextPage) return;

      return lastPage.pageIndex + 1;
    },
  });

  return res;
};
