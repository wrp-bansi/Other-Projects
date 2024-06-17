import Footer from "@/Components/common/Footer/footer";
import Header from "@/Components/common/Header/header";
import NavbarHeader from "@/Components/common/Navbar/navbar";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap').then(() => {

    });
}, []);

  return(
    <>
    <Header />
    <div className="container">
      <NavbarHeader />
    <Component {...pageProps} />

    </div>
    <Footer />
    </>
  )

}
