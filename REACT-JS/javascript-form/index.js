


var form = document.getElementById("formId");

function data(event){
  event.preventDefault();

  var a=document.getElementById("n1").value;
  var b=document.getElementById("n2").value;
  var c=document.getElementById("n3").value;
  var d=document.getElementById("n4").value;
  var e=document.getElementById("n5").value;
  var f=document.getElementById("n6").value;
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var match=c.match(validRegex)
  var fname="First name must be 3 digit";
  var lname="Last name must be 3 digit";
  var password="Password must be digit";
  var mnumber="Phone number must be digit";
  var cpassword="Plese write same password";
  var Email="Not valid email address"

  let firstname = document.querySelector("#n1").value
  console.log({ firstname });
  let lastname = document.querySelector("#n2").value
  console.log({ lastname })

  if(a==""||b==""||c==""||d==""||e==""||f==""){
    document.getElementById("firstname").innerHTML="please fill data"
    document.getElementById("lastname").innerHTML="please fill data"
    document.getElementById("password").innerHTML="please fill data"
    document.getElementById("mnumber").innerHTML="please fill data"
    document.getElementById("cpassword").innerHTML="please fill data"
    document.getElementById("Email").innerHTML="please fill data"
    return false
  }
  else if(a.length<3||b.length<3){

    document.getElementById("firstname").innerHTML=fname
    //  alert("full name should be maximum 3 chracter")

    document.getElementById("lastname").innerHTML=lname

    return false
  }
  else if(!match){

    // alert("not valid email address");
    document.getElementById("Email").innerHTML=Email
    return false
  }
  else if(isNaN(d)||isNaN(f)){

    // alert("password only numric allowed")
    document.getElementById("password").innerHTML=password

    document.getElementById("mnumber").innerHTML=mnumber
    return false
  }
  else if(d!==e){

    // alert("please enter same password")
    document.getElementById("cpassword").innerHTML=cpassword
    return false
  }

  else{
    true;
    window.location.reload();
    alert("sumbited")
  }
}
function checkbutton(){
  var g=document.getElementById("gridRadios1").value
  console.log(g)
  if (g === "on") {
      let first = document.querySelector(".first")
      first.setAttribute("style", "display : flex")
      let last = document.querySelector(".last")
      last.setAttribute("style", "display : none")
  }
  }
 function check(){
    var h=document.getElementById("gridRadios2").value
    console.log(h)
    if (h === "on") {
      let last = document.querySelector(".last")
          last.setAttribute("style", "display : flex")
          let first = document.querySelector(".first")
          first.setAttribute("style", "display : none")
    }
  }
// function genderhandler() {
//   let item = document.getElementById("gridRadios1").value
//   console.log(item)
//   if (item.value === "on") {
//       let first = document.querySelector(".first")
//       first.setAttribute("style", "display : flex")
//       let last = document.querySelector(".last")
//       last.setAttribute("style", "display : none")
//   } else {
//       alert("slect gender")
//   }
// }
// function genderfehandler() {
//   let item = document.getElementById("gridRadios2").value
//   console.log(item)
//   if (item.value === "on") {
//       let last = document.querySelector(".last")
//       last.setAttribute("style", "display : flex")
//       let first = document.querySelector(".first")
//       first.setAttribute("style", "display : none")
//   } else {
//       alert("slect gender")
//   }
// }
form.addEventListener('submit', data);

function loginhandler() {

  data()
}
