import './App.css';
import Footer from './components/comman/footer/footer';
import Navbar from './components/comman/navbar/navbar';
import Teammember from './components/comman/team-member/teammember';
import Course from './components/corse/course';
import Form from './components/form/form';
import Hero from './components/hero/herosec';
import Services from './components/services/services';


function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Course />
      <Teammember />
      <Form />
      <Footer />
    </>
  );
}

export default App;
