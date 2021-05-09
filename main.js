module.exports = `
<!DOCTYPE html>
<head>
    <title>Radar Bot Directory</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"> </script>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.6/firebase-firestore.js"></script>
<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.2.6/firebase-analytics.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>



   
     <link rel="stylesheet" href="https://mcfacts.xyz/botdirectory/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://mcfacts.xyz/botdirectory/css/main.css">
    <link rel="stylesheet" href="https://mcfacts.xyz/botdirectory/css/now-ui-kit.css">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<script async src="https://arc.io/widget.min.js#mYemCLn7"></script>
<meta http-equiv="Expires" content="0" />

    <!-- <link rel="stylesheet" href="./css/main.css">
        <link rel="stylesheet" href="./css/bootstrap.min.css">
            <link rel="stylesheet" href="./css/now-ui-kit.css"> -->
            
<link rel="icon" 
      type="image/png" 
      href="https://mcfacts.xyz/Images/botlistlogo.png">

    <meta charset="UTF-8">
  <meta name="description" content="A Directory for discord bots">
  <meta name="keywords" content="Discord, Bot, Directory">
  <meta name="author" content="Scorprian#2161">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
 

  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
  
  <!-- Bootstrap files (jQuery first, then Popper.js, then Bootstrap JS) -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" type="text/javascript"></script>
  
  
  <script type="text/javascript">
  /// some script
  $(function () {
      'use strict'
  
    $("[data-trigger]").on("click", function(){
          var trigger_id =  $(this).attr('data-trigger');
          $(trigger_id).toggleClass("show");
          $('body').toggleClass("offcanvas-active");
      });
  
      // close if press ESC button 
      $(document).on('keydown', function(event) {
          if(event.keyCode === 27) {
             $(".navbar-collapse").removeClass("show");
             $("body").removeClass("overlay-active");
          }
      });
  
      // close button 
      $(".btn-close").click(function(e){
          $(".navbar-collapse").removeClass("show");
          $("body").removeClass("offcanvas-active");
      }); 
  
  
  })
  </script>

  <style type="text/css">

body.offcanvas-active{
	overflow:hidden;
}
.offcanvas-header{ display:none; }

@media (max-width: 992px) {
  .offcanvas-header{ display:block; }
  .navbar-collapse {
    position: fixed;
    top:0; 
    bottom: 0;
    left: 100%;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    visibility: hidden;
    background-color: black;
    transition: visibility .2s ease-in-out, transform .2s ease-in-out;
  }
  .navbar-collapse.show {
    visibility: visible;
    transform: translateX(-100%);
  }
}

</style>



<!-- #1D1E28 -->


  <div style="background-color: black; color: white">

    <div id="page">
    <nav class="navbar navbar-expand-lg bg-transparent">
    <button class="navbar-toggler" style="color: #fff" type="button" data-toggle="collapse" data-trigger="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    ☰</button>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin-left: 20px !important">
        <div class="navbar-nav mr-auto">
        <div class="offcanvas-header mt-3">  
        <button class="btn btn-close float-right">Close</button>
      </div>
                <a  class="nav-link"  href="/">Radar Bot Directory</a>
            
           
                      

                           <a class="nav-link" href="/bots">All Bots</a>
                           <a class="nav-link" href="/servers">Servers</a>
                           <a class="nav-link" href="/submit">Add Bot</a>
                           <a class="nav-link" href="https://docs.radarbotdirectory.xyz">Docs</a>
                           <a class="nav-link" href="https://discord.gg/P7G7A5ARvj" target="_blank">Discord</a>
                           {{panelnavbar}}
</div>
<ul class="nav navbar-nav ml-auto" id="profiledata">
<li class="nav-item" id="profile">
<a onclick="login()" href="/login" class="nav-link"><span class="glyphicon glyphicon-log-in"></span> Login With Discord</a>
</li>
</ul>
            
       
        </div>
               

           

        
        
    </div>
</nav>
<div class="p-5 bg-black">
    <div class="container text-white">
        <h2><b>Radar Bot Directory</b></h2>
        <p>Find the perfect bot for your server with our directory of discord bots</p>
    </div>
</div>
<hr>
</div>
<div  style="text-align: center;">
    <input id="searchbox" style="
    padding: 6px;   
    border: none;
    background-color: #98a4b5;
    color: white;
    width: 40%;
    font-size: 17px;" type="text" placeholder="Search.." >
<button id="submitbutton" style="
padding: 6px;
border: none;
background-color: #98a4b5;
font-size: 17px;" onClick="query()">Search</button>
</div>
<hr>

<center>
<a href="/search?q=moderation" class="btn">MODERATION</a>
<a href="/search?q=music" class="btn">MUSIC</a>
<a href="/search?q=economy" class="btn">ECONOMY</a>
<a href="/search?q=multi-purpose" class="btn">MULTI-PURPOSE</a>
<br>
<a href="/search?q=giveaway" class="btn">GIVEAWAY</a>
<a href="/search?q=meme" class="btn">MEME</a>
<a href="/search?q=utility" class="btn">UTILITY</a>
<a href="/search?q=entertainment" class="btn">ENTERTAINMENT</a>
<a href="/search?q=advertisement" class="btn">ADVERTISEMENT</a>
</center>
<hr>



<script>
    var input = document.getElementById("searchbox");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submitbutton").click();
    document.getElementById("searchbox").blur()

  }
});




async function query() {

  if(document.getElementById('searchbox').value.length === 0) {
   return document.getElementById('searchbox').placeholder = "Please fill out this field"
  } else {
window.location.href = "https://radarbotdirectory.xyz/search?q=" + document.getElementById('searchbox').value
}
}


</script>


<div style="text-align: left; color: black; padding: 10px">
<h3><img src="https://mcfacts.xyz/Images/RBD/votes.png" style="width: 40px; height: 40px">Top Voted Bots</h3>
<center><div class="row">
<p>{{topvoted}}</p>
</div>
</center>
<h3><img src="https://mcfacts.xyz/Images/RBD/clock.png" style="width: 40px; height: 40px">Newest Bots</h3>
<center><div class="row">
<p>{{newestbots}}</p>
</div>
</center>
<h3><img src="https://mcfacts.xyz/Images/RBD/premium.png" style="width: 40px; height: 40px">Premium Bots</h3>
<center><div class="row">
<p>{{certifiedbots}}</p>
</div>
</center>
</div>


<script>
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function login(){
window.location.href="/login"
}

function logout(){
eraseCookie("username")
eraseCookie("discriminator")
eraseCookie("id")
eraseCookie("avatar")
eraseCookie("access_token")
window.location.href = "/"
}

let url = new URL(window.location.href)
window.onload = function(){
     if(url.searchParams.has("username") && url.searchParams.has("avatar") && url.searchParams.has("discriminator") && url.searchParams.has("id")){
      setCookie("username", url.searchParams.get("username"), 3)
      setCookie("discriminator", url.searchParams.get("discriminator"), 3)
      setCookie("avatar", url.searchParams.get("avatar"), 3)
      setCookie("id", url.searchParams.get("id"), 3)
      setCookie("access_token", url.searchParams.get("access_token"), 3)
      window.history.pushState({}, document.title, "/");
     }
   if(getCookie("username") !== undefined && getCookie("username") !== null){
     
      document.getElementById("profile").className = "nav-item dropdown"
      if(getCookie("avatar") !== undefined && getCookie("avatar") !== null){
      document.getElementById("profile").innerHTML = '<a class="nav-link" href="/user/' + getCookie("id") + '"><img height="25px" src=' + getCookie("avatar") + ' style="border-radius: 50%; margin: 0px 5px;">' + getCookie("username") + "#" + getCookie("discriminator") + "</a>"
      }
      document.getElementById("profiledata").innerHTML += '<li class="nav-item" id="profile"><a onclick="logout()" href="#" class="nav-link"><span class="glyphicon glyphicon-log-in"></span>Logout</a></li>'
      
   }
}
</script>








</div>
</div>
</body>
</html>

`