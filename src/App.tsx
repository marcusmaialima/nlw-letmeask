import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AuthContextProvider } from '@context/auth/AuthContextProvider';

import { Home } from '@pages/Home/Home';
import { NewRoom } from '@pages/NewRoom/NewRoom';
import { Room } from '@pages/Room/Room';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
