import './App.css';
import Blog from './components/blog';
import About from './components/comman/about/about';
import Commansection from './components/comman/comaan-section/comman';
import Footer from './components/comman/footer/footer';
import Header from './components/comman/header/header';
import Teammeber from './components/comman/team-member-section/teammember';
import Imagesectio from './components/imagesection';
import Servicessection from './components/service-section';
import Services from './components/services';
import Workwesite from './components/workwebsite';

function App() {
  return (
    <>
      < Header />
      <Services />
      <Commansection />
      <Servicessection />
      <Imagesectio />
      <Workwesite />
      <Teammeber />
      <About />
      <Blog />
      <Footer />
    </>

  );
}

export default App;
