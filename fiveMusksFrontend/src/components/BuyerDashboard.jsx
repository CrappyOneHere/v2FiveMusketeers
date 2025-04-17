import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function BuyerDashboard (props) {
    const [localDashboardMsg, setLocalDashboardMsg] = useState(props.dashboardMsg)

    useEffect(() => {
       setLocalDashboardMsg(props.dashboardMsg)
    }, [props.dashboardMsg])

    return (
        <div className="flex-ratio">
            <div className="flex-ratio-col1">
            <Sidebar setEmail={props.setEmail}
                     setName={props.setName}
                     email={props.email}
                     setUserRole={props.setUserRole}
                     userRole={props.userRole}/>
            </div>

            <div className="push-to-center">
                <h1 className="text-white h-50 v-center">{localDashboardMsg}</h1>
            </div>
        </div>
    )
}
export default BuyerDashboard;
