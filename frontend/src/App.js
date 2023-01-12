import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import { AppRouter } from "./components/Router/AppRouter";
import Bar from "./components/ui/Bar";
import {check} from "./http/userAPI";

const App = observer(() => {

  const {user} = useContext(Context);

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    })
  },[user]);

  return (
    <BrowserRouter>
      <Bar/>
      <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
