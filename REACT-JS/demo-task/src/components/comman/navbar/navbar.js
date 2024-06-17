
function Navbar(){
    return(
<>
<section>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
  <a className="navbar-brand" href="*">
  <img
    src="https://th.bing.com/th/id/OIP.flOCLOgAIuyLS5T0ARRnegHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7"
    width={100}
    height={100}
    alt=""
  />
  <h1 className=" d-inline-block align-center me-1 navtext">Univercity</h1>
 </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item nav-li-text">
          <a class="nav-link active " aria-current="page" href="*">Home</a>
        </li>
        <li class="nav-item nav-li-text">
          <a class="nav-link" href="*">Features</a>
        </li>
        <li class="nav-item nav-li-text">
          <a class="nav-link" href="*">About</a>
        </li>
        <li class="nav-item nav-li-text">
          <a class="nav-link" href="*">News</a>
        </li>
        <li class="nav-item nav-li-text">
          <a class="nav-link" href="*">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</section>
</>

    )
}
export default Navbar
