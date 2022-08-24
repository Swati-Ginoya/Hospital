import './App.css';
import Header from './component/header/Header';
import Home from './container/home/Home';
import Auth from './container/auth/Auth';
import Department from './container/department/Department';
import Doctor from './container/doctor/Doctor';
import About from './container/about/About';
import Contact from './container/contact/Contact';
import Medicine from './container/medicine/Medicine';
import BookAppointment from './container/appointment/BookAppointment';
import ListAppointment from './container/appointment/ListAppointment';
import Footer from './component/footer/Footer';
import Form from './container/form/Form';
import { Route, Switch } from 'react-router-dom';
import PublicRoute from './route/PublicRoute';
import PrivateRoute from './route/PrivateRoute';
import MedicineForm from './container/medicine-form/MedicineForm';
import ThemeProvider from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <ThemeProvider>
      <Header />
      <Switch>
        <PublicRoute path={"/"} exact component={Home}></PublicRoute>
        <PublicRoute path={"/Auth"} restricted={true} exact component={Auth}></PublicRoute>
        <PublicRoute path={"/Department"} exact component={Department}></PublicRoute>
        <PrivateRoute path={"/Doctor"} exact component={Doctor}></PrivateRoute>
        <PublicRoute path={"/About"} exact component={About}></PublicRoute>
        <PublicRoute path={"/Contact"} exact component={Contact}></PublicRoute>
        <PrivateRoute path={"/Medicine"} exact component={Medicine}></PrivateRoute>
        <PrivateRoute path={"/BookAppointment"} exact component={BookAppointment}></PrivateRoute>
        <PrivateRoute path={"/ListAppointment"} exact component={ListAppointment}></PrivateRoute>
        <Route path={"/MedicineForm"} exact component={MedicineForm}></Route>
        <PublicRoute path={"/Form"} exact component={Form}></PublicRoute>
      </Switch>
      <Footer />
      </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
