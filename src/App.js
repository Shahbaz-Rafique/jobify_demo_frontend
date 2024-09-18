import './App.css';
import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpPage from './Components/Authentication/Signup';
import SignIn from './Components/Authentication/SignIn';

import JobListingPage from './Components/Jobs/list';
import JobPostingForm from './Components/Jobs/Jobs';
import AddJobPage from './Components/Jobs/postJob';

import Companies from './Components/Companies';
import AddCompanyPage from './Components/Companies/addCompany';

import Admins from './Components/Superadmin/admins';
import AddAdminPage from './Components/Superadmin/addAdmin';

import Dashboard from './Components/Admin/dashboard';
import SuperAdminDashboard from './Components/Superadmin/dashboard';

// Import PrivateRoute component
import PrivateRoute from './Components/Authentication/privateRoute';

function App() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/" component={SignIn} />
        <Route exact path="/job-listing" component={JobListingPage} />

        {/* Protected Routes */}
        <PrivateRoute exact path="/jobs" component={JobPostingForm} />
        <PrivateRoute exact path="/post-job" component={AddJobPage} />

        <PrivateRoute exact path="/companies" component={Companies} />
        <PrivateRoute exact path="/add-company" component={AddCompanyPage} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/superdashboard" component={SuperAdminDashboard} />

        <PrivateRoute exact path="/manage-admins" component={Admins} />
        <PrivateRoute exact path="/add-admin" component={AddAdminPage} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
