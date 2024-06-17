import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import logo from './images/logo.png';






function Heger() {
  return (
    <>


      






      

<nav className="navi navhidden"></nav>
<nav className="navbar navbar-expand-lg navi  ">
        <div className="container-fluid container navbar-nav ms-auto mb-2 mb-lg-0" >
          <a className="navbar-brand mb-4 " href="*">
          <i class="fa-solid fa-location-dot lter"></i>&nbsp;&nbsp;
          <p class="lter">121,King Street,Melbornus &nbsp;&nbsp; | &nbsp;&nbsp;</p>&nbsp;
         <i class="fa-solid fa-location-arrow lter"></i>&nbsp;&nbsp;
            <p class="lter">example@.gmail.com &nbsp;</p>
          </a>
          <div className="navcentrtl">
            <i class="fab fa-facebook-f lter icn"></i>
            <i class="fa-brands fa-twitter lter icn"></i>
            <i class="fa-brands fa-linkedin-in lter icn"></i>
            <i class="fa-brands fa-google-plus-g lter icn"></i>
            <p class="lter"> &nbsp;| &nbsp;&nbsp; <i class="fa-solid fa-globe lter"></i>&nbsp;&nbsp;English &nbsp;</p>
            <div class="dropdown">
  <i class="fa-solid fa-chevron-down text-light mb-4"  data-bs-toggle="dropdown" aria-expanded="false"></i>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="*">English</a></li>
    <li><a class="dropdown-item" href="*">Hindi</a></li>
    <li><a class="dropdown-item" href="*">Gujarati</a></li>
    <li><a class="dropdown-item" href="*">Marathi</a></li>
    
  </ul>
</div>
           </div>
            </div>
      </nav>


     



<nav className="navbar navbar-expand-lg navcolor">
        <div className="container-fluid container " >
          <a className="navbar-brand" href="*">
            <img src={logo} alt="logo" width={120} height={75}></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold">
            <div class="dropdown-nav">
            <li className="nav-item">
                <a className="nav-link" href="*">
                  Home +
                </a>
              </li>
  <div class="dropdown-content-nav">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>&nbsp;
              <li className="nav-item">
                <a className="nav-link" href="*">
                  About 
                </a>
              </li>&nbsp;
              <div class="dropdown-nav">
            <li className="nav-item">
                <a className="nav-link" href="*">
                  Home +
                </a>
              </li>
  <div class="dropdown-content-nav">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>&nbsp;
<div class="dropdown-nav">
            <li className="nav-item">
                <a className="nav-link" href="*">
                  Page +
                </a>
              </li>
  <div class="dropdown-content-nav">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>&nbsp;
<div class="dropdown-nav">
            <li className="nav-item">
                <a className="nav-link" href="*">
                  Service +
                </a>
              </li>
  <div class="dropdown-content-nav">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>&nbsp;
<div class="dropdown-nav">
            <li className="nav-item">
                <a className="nav-link" href="*">
                  Project +
                </a>
              </li>
  <div class="dropdown-content-nav">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>&nbsp;
<div class="dropdown-nav">
            <li className="nav-item">
                <a className="nav-link" href="*">
                  News +
                </a>
              </li>
  <div class="dropdown-content-nav">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>&nbsp;


            </ul>
            <i class="fa-solid fa-magnifying-glass ni"></i>
            <i class="fa-solid fa-align-center ni"></i>
          </div>
        </div>
      </nav>




    </>
  )
}

export default Heger;