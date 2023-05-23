import { useEffect, useState } from "react";
import auth from "../../services/auth.js";

function Home(props) {
  const user = props.user;
  const [info, setInfo] = useState(null);
  console.log(info);
  useEffect(() => {
    if (user) {
        auth.getInfo(user)
        .then((newInfo) => {
            setInfo(newInfo);
        })
    }
  }, [user]);
  
  return <div>Home</div>;
}

export default Home;
