import React from 'react'

const Profile = ()=>{
  //this.username = "john doe";
    return (
      
        <div>
          
            
            <div style={{
              display:"flex",
              justifyContent:"space-around",
              margin:"18px 0px",
              borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                    src="https://images.unsplash.com/photo-1502590464431-3b66d77494d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    />
                </div>
                <div>
                    <h3>john doe</h3>
                    <div style={{display:"flex",justifyContent:"space-between",width:"120%"}}>
                      <h5>About Me</h5>
                      <h5>Groups</h5>
                      <h5>Messages</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile