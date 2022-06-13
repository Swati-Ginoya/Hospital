import logo from './logo.svg';
import './App.css';
import Header from './component/header/Header';
import Home from './container/home/Home';
import Department from './container/department/Department';
import Doctor from './container/doctor/Doctor';
import About from './container/about/About';
import Contact from './container/contact/Contact';
import Footer from './component/footer/Footer';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path={"/"} exact component={Home}></Route>
        <Route path={"/Department"} exact component={Department}></Route>
        <Route path={"/Doctor"} exact component={Doctor}></Route>
        <Route path={"/About"} exact component={About}></Route>
        <Route path={"/Contact"} exact component={Contact}></Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
