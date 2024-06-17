function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start bg-dark  text-light">
                <div className="container ">
                    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                        <div>
                            <a href="*" className="me-4 text-reset">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="*" className="me-4 text-reset">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="*" className="me-4 text-reset">
                                <i className="fab fa-google" />
                            </a>
                            <a href="*" className="me-4 text-reset">
                                <i className="fab fa-instagram" />
                            </a>
                            <a href="*" className="me-4 text-reset">
                                <i className="fab fa-linkedin" />
                            </a>
                            <a href="*" className="me-4 text-reset">
                                <i className="fab fa-github" />
                            </a>
                        </div>
                    </section>
                    <section className="">
                        <div className="container text-center text-md-start mt-5">
                            <div className="row mt-3">
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    <h1 className="text-uppercase fw-bold mb-4">
                                        <img
                                            src="https://th.bing.com/th/id/OIP.flOCLOgAIuyLS5T0ARRnegHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7"
                                            width={100}
                                            height={100}
                                            alt=""
                                        />Univercity </h1>
                                    <p>
                                        Here you can use rows and columns to organize your footer content.
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </p>
                                </div>
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Angular
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            React
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Vue
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Laravel
                                        </a>
                                    </p>
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Fees
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Settings
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Campus
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Help
                                        </a>
                                    </p>
                                </div>
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                    <p>
                                        <i className="fas fa-home me-3" /> New York, NY 10012, US
                                    </p>
                                    <p>
                                        <i className="fas fa-envelope me-3" />
                                        info@example.com
                                    </p>
                                    <p>
                                        <i className="fas fa-phone me-3" /> + 01 234 567 88
                                    </p>
                                    <p>
                                        <i className="fas fa-print me-3" /> + 01 234 567 89
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div
                        className="text-center p-4"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                        © 2021 Copyright:
                        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
                            MDBootstrap.com
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )

}

export default Footer