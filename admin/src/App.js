import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Inventory from './pages/Inventory';
import Coupons from './pages/Coupons';

function App() {
  return (
    <Router>
      <div className="admin-container">
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/coupons" element={<Coupons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
