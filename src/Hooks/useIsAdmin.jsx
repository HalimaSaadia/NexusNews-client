import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useUserState = () => {
    const {user,loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {isPending:adminLoading, data,refetch:premiumTakenRefetch} = useQuery({
        queryKey:["isAdmin","isPremiumTaken"],
        enabled: !loading,
        queryFn: async()=> {
            const result = await axiosSecure.get(`/check-admin-isPremium/${user?.email}`)
            return result?.data
        }
    })
    return {isAdmin:data?.role,adminLoading,isPremiumTaken:data?.isPremiumTaken,premiumTakenRefetch}
};

export default useUserState;