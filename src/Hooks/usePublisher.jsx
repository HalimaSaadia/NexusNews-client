import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePublisher = () => {
    const axiosSecure = useAxiosSecure()
    const {isPending,data=[]} = useQuery({
        queryKey:['publisher'],
        queryFn: async () => {
            const result = await axiosSecure.get("/publisher")
            return result.data
        }
    })
    if(isPending){
        return
    }
    return data
};

export default usePublisher;