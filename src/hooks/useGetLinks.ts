import { useQuery } from "react-query";
import axios from "axios";
import { ILink } from "type";

const fetchGetLinks = async (): Promise<ILink[]> => {
  const proxy = process.env.NODE_ENV === "development" ? "" : "/api";

  const response = await axios(`${proxy}/links`);
  return response.data;
};

export const useGetLinks = () => {
  return useQuery(["getLinks"], () => fetchGetLinks(), {
    staleTime: 5000,
  });
};

export const useGetLink = (key: string) => {
  const { data, isLoading, isError } = useGetLinks();
  return {
    isLoading,
    isError,
    data: data?.find(({ key: keyId }) => keyId === key),
  };
};
