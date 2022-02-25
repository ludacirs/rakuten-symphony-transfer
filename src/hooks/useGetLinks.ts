import { useQuery } from "react-query";
import axios from "axios";
import { ILink } from "type";

const fetchGetLinks = async (): Promise<ILink[]> => {
  const response = await axios(`/api/links`);
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
