Vue.component('menuprincipal', {
  template:`  
  <div class="clearfix bg-dark shadow rounded fixed-top">
    <a id="logo" class="btn btn-dark" href="index.html">TGIF</a>
    <ul class="nav list-group-horizontal float-right">
      <li><a class="btn btn-dark" href="index.html">Home</a></li>
      <li value= "1" v-if= "index == '/' || index == '/index.html'" class="event btn btn-dark">About us</li>
      <li value= "2" v-if= "index == '/' || index == '/index.html'" class="event btn btn-dark">History</li>
      
      
      <li v-for="(value, name) in menu">
        <a href="#" class="btn btn-dark" data-toggle="dropdown">{{name}}</a>
        <ul v-for = "(value2,name2) in value" class="dropdown-menu">
          <li class = "btn dropdown-item"> <a class="btn">{{name2}} </a> </li>
        </ul>
      </li>


    </ul>
  </div>`,
  data: function(){
    return {
      index : window.location.pathname,
      menu: {
        "Congress 113": {
          "Senate": "senate-starter-page.html" ,
          "House": "house-starter-page.html"
        },
        "Attendance":{
          "Senate":"senate-attendance.html",
          "House": "house-attendance.html"
        },
        "Party Loyalty":{
          "Senate":"senate-party-loyalty.html",
          "House": "house-party-loyalty.html"
        }
      }
    }
  }
});

new Vue({
  el: '#menu'
});  
