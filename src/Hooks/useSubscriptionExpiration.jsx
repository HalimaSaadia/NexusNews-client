import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const useSubscriptionExpiration = () => {
    const axiosSecure = useAxiosSecure()
    const {user,loading} = useContext(AuthContext)
    const {isPending:subscriptionLoading,data:subscriptionExpiration} = useQuery({
        queryKey:["subscriptionExpiration"],
        enabled:!loading,
        queryFn: async()=> {
            const result = await axiosSecure.get(`/check-premiumTakenExpiration/${user?.email}`)
            return result.data
        }
    })
    return subscriptionExpiration
};

export default useSubscriptionExpiration;