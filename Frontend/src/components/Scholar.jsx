
function App({Scholar}) {
    return (
        <div className="scholarship-list">
           <p>{Scholar.name}</p>
           <p>{Scholar.description}</p>
           <p>{Scholar.amount}</p>
           <p>{Scholar.deadline}</p> 
        </div>
    );

}