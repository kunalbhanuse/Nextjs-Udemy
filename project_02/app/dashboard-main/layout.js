export default function DashboardMainLayout ({feed,stats}) {
return(
    <div style={{display:"flex",gap:"20px"}}>
        <div className="bg-blue-400 flex-3">{feed}</div>
         <div className="bg-amber-300 flex-2 ">{stats}</div>
        
     </div>
)
}