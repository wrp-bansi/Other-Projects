function Header() {

    return (
        <>
            <div className="heroimg mb-5">
                <div className="video-background-overlay" />
                <nav className="navbar navbar-expand-lg py-4">
                    <div className="container">
                        <a href="*" className="navbar-brand ps-1">
                            <b className="navlogo"><span className="text-light navlogo">AUTO</span>ROAD</b>
                        </a>
                        <button
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            className="navbar-toggler">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div id="navbarSupportedContent" className="collapse navbar-collapse">
                            <ul className="navbar-nav ms-auto  ">
                                <li className="nav-item active navtext ">
                                    <a href="*" className="nav-link text-warning me-4">
                                        Home <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item navtext">
                                    <a href="*" className="nav-link text-light me-4">
                                        About
                                    </a>
                                </li>
                                <li className="nav-item navtext">
                                    <a href="*" className="nav-link text-light me-4">
                                        Pricing
                                    </a>
                                </li>
                                <li className="nav-item navtext">
                                    <a href="*" className="nav-link text-light me-4">
                                        Our Car
                                    </a>
                                </li>
                                <li className="nav-item navtext">
                                    <a href="*" className="nav-link text-light me-4">
                                        MCG
                                    </a>
                                </li>
                                <li className="nav-item navtext">
                                    <a href="*" className="nav-link text-light me-4">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="video-background-content">
                    <section className="py-md-20 py-12 mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 ">
                                    <div className="mb-4 mb-xl-0 text-center text-md-start">
                                        <h1 className="mb-4 ls-sm herotext-title mt-3">
                                            Now <br></br>It's easy for you rent a car
                                        </h1>
                                        <p className="mb-4 herotext-paregraph mb-5">
                                        A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts
                                        </p>
                                        <a
                                            href="https://www.youtube.com/watch?v=JRzWRZahOVU"
                                            className="hero-btn">
                                            <i class="fa-solid fa-play"></i>
                                        </a><span className="hr-lines"></span><span className="herotext-paregraph ms-5">En this tutorial, we are </span>
                                    </div>
                                </div>
                                <div className="offset-xl-1 col-xl-5 col-lg-6 col-md-12 ">
                                    <div className="card smooth-shadow-md formcard" style={{ zIndex: 1 }}>
                                        <div className="card-body px-4 py-4 pb-5">
                                            <div className="mb-4 ">
                                                <h2 className="pt-3 pb-0 lh-1 formtextheadig">Make your trip</h2>
                                            </div>
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="PICKUP-UP LOCATION" className="form-label formtext">
                                                        PICKUP-UP LOCATION
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="text"
                                                        className="form-control opacity-50"
                                                        name="PICKUP-UP LOCATION"
                                                        placeholder="city,staste,airpory etc.. "
                                                        required="" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor=" DROP-OF LOCATION" className="form-label formtext">
                                                        DROP-OF LOCATION
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="text"
                                                        className="form-control opacity-50"
                                                        name=" DROP-OF LOCATION"
                                                        placeholder="city,staste,airpory etc.. "
                                                        required="" />
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col">
                                                        <label htmlFor=" PICK-UP DATE" className="form-label formtext">
                                                            PICK-UP DATE
                                                        </label>
                                                        <input type="text" className="form-control opacity-50" placeholder="date" />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="DROP-UP DATE" className="form-label formtext">
                                                            DROP-UP DATE
                                                        </label>
                                                        <input type="text" className="form-control opacity-50" placeholder="date" />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="PICKUP-UP TIME" className="form-label formtext">
                                                        PICKUP-UP TIME
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="text"
                                                        className="form-control opacity-50"
                                                        name="PICKUP-UP TIME"
                                                        placeholder="time"
                                                        required="" />
                                                </div>
                                                <div className="d-grid">
                                                    <button type="submit" className=" btn-color">
                                                        Search  Vehical
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>


    )
}

export default Header