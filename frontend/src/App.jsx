import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalContext';

import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';

function App() {
  return (

    <GlobalProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Lista delle Task</NavLink>
          <NavLink to="/add">Aggiungi Task</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>

  );
}

export default App;
