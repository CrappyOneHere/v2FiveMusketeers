import { useNavigate } from "react-router-dom";
function Dispatch () {
    const nav = useNavigate()
    return (
        <>
            <div className="d-flex justify-content-between">
                <h1 className="text-white mt-3 mb-5 pb-5 ms-5" onClick={()=>{nav('/viewOrders')}}>←</h1>
                <h1 className="text-white dispatch-heading mt-3">Dispatch</h1>
            </div>
            <a href="http://hifive-despatch-advice-t09a.ap-southeast-2.elasticbeanstalk.com/index.html" className="click-here">Click here!</a>
        </>
    )
}

export default Dispatch;