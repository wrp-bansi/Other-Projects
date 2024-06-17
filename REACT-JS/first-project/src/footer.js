import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import logo from './images/logo.png';


function Footer() {
  return (
    <>




      <footer class="text-center text-lg-start bg-body-tertiary mt-5 ">

        {/* <section class="d-flex justify-content-center justify-content-lg-between p-4">






        </section> */}

        <section class="fback p-5">
          <div class="container text-center text-md-start">

            <div class="row mt-3 text-light ftext">

              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 ">

                <img src={logo} alt="logo" ></img>
                <p> 32, rajeshpark hhhhh south west  cicle australiya 43567</p>
                <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
                <p>
                  <i class="fas fa-envelope me-3"></i>
                  info@example.com
                </p>
                <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
                

                <div>
                  <a href="*" class="me-3 text-reset ficon">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="*" class="me-3 text-reset ficon">

                    <i class="fa-brands fa-twitter"></i>


                  </a>
                  <a href="*" class="me-3 text-reset ficon">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="*" class="me-3 text-reset ficon">
                    <i class="fa-brands fa-google-plus-g"></i>
                  </a>

                </div>

              </div>

              <div class="col-md-2 col-lg-2 col-xl-2 mt-5">

                <h6 class="text-uppercase fw-bold ">
                  Services
                </h6>
                <p className="fl mb-4"></p>
                <p>
                  <a href="#!" class="text-reset">Angular</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">React</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Vue</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Laravel</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Laravel</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Laravel</a>
                </p>
              </div>

              <div class="col-md-3 col-lg-2 col-xl-2 mt-5">

                <h6 class="text-uppercase fw-bold">
                  Useful links
                </h6>
                <p className="fl mb-4"></p>
                <p>
                  <a href="#!" class="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Help</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Help</a>
                </p>
                <p>
                  <a href="#!" class="text-reset">Help</a>
                </p>
              </div>

              <div class="col-md-4 col-lg-3 col-xl-3  mt-5">
                <h6 class="text-uppercase fw-bold ">
                  Products
                </h6>
                <p className="fl mb-4"></p>

                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
                <div class="col-md-12">

                  <div data-mdb-input-init class="form-outline mb-4 ">
                  <div data-mdb-input-init class="form-outline mb-4">
              <input type="email" id="form5Example24" class="form-control" width={100}/>
              
            </div>


                  </div>
                  <button type="button" class="btn btn-danger mb-1  px-5 py-2">Sumbit Now</button>
                </div>

              </div>

            </div>

          </div>
          <i class="fa-solid fa-sailboat  fbicon"></i>





        </section>
       


        <div class="text-center p-4 bg-dark text-light">
          © 2021 Copyright:
          <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>

       

      </footer>

    </>
  )
}

export default Footer
  ;