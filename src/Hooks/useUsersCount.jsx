import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUsersCount = () => {
  const axiosPublic = useAxiosPublic();
  const { isLoading: usersCountLoading, data: usersCount } = useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const result = await axiosPublic.get("/usersCount");
      return result.data;
    },
  });

  return { usersCountLoading, usersCount };
};

export default useUsersCount;
