import { Chart } from "react-google-charts";
import useUsersCount from "../../../Hooks/useUsersCount";
import Loader from "../../../shared/Loader/Loader";
import { Container } from "@mui/material";



const UsersChart = () => {
    const {usersCountLoading,usersCount} = useUsersCount()
    if(usersCountLoading){
        return <Loader />
    }
  console.log(usersCount);
   const data = [
        ["Element", "Users", { role: "style" }],
        ["All Users",usersCount?.allUsers,  "#b87333"], // RGB value
        ["Normal User",usersCount?.normalUsers,  "silver"], // English color name
        ["Premium User",usersCount?.premiumUsers, "gold"], // English color name
      ];
      
    return (
        <Container>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
        </Container>
    );
};

export default UsersChart;