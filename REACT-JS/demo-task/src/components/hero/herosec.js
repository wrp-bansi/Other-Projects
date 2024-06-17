function Hero() {
  return (
    <>
      <div className="container-fluid px-4 py-5 my-5 text-center">
        <div className="lc-block mb-4">
          <div editable="rich">
            <h2 className="display-2 fw-bold">
              Level up your <span className="text-primary">knowlege in this place </span>
            </h2>
          </div>
        </div>
        <div className="lc-block col-lg-6 mx-auto mb-5">
          <div editable="rich">
            <p className="lead">
              Quickly design and customize responsive mobile-first sites with
              section
            </p>
          </div>
        </div>
        <div className="lc-block d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <a className="btn btn-primary btn-lg px-4 gap-3" href="*" role="button">
            About us
          </a>
          <a className="btn btn-outline-secondary btn-lg px-4" href="*" role="button">
            Learn more
          </a>
        </div>
        <div className="lc-block d-grid gap-2 d-sm-flex justify-content-sm-center">
          <img
            className="img-fluid"
            src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/10/undraw_going_up_ttm5.svg"
            width=""
            height={783}
            srcSet=""
            sizes=""
            alt=""
          />
        </div>
      </div>

    </>
  )

}

export default Hero