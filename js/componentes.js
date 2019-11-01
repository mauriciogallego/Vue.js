/*************MENU***************************************/
Vue.component('menuprincipal', {
  template: //html
  `<div class="clearfix bg-dark shadow rounded fixed-top">
    <a id="logo" class="btn btn-dark" href="index.html">TGIF</a>
    <ul class="nav list-group-horizontal float-right">
      <li><a class="btn btn-dark" href="index.html">Home</a></li>
      <li v-on:click="scrollWindow(1)" v-if= "index == '/' || index == '/index.html'" class="event btn btn-dark">About us</li>
      <li v-on:click="scrollWindow(2)" v-if= "index == '/' || index == '/index.html'" class="event btn btn-dark">History</li>
      <li v-for="(value, name) in menu">
        <a href="#" class="btn btn-dark" data-toggle="dropdown">{{name}}</a>
        <ul class="dropdown-menu">
          <li v-for = "(value2,name2) in value" class = "btn dropdown-item"> <a :href="value2" class="btn">{{name2}} </a> </li>
        </ul>
      </li>
    </ul>
  </div>`,
  data: function () {
    return {
      index: window.location.pathname,
      high: window.innerHeight,
      menu: {
        "Congress 113": {
          "Senate": "senate-starter-page.html",
          "House": "house-starter-page.html"
        },
        "Attendance": {
          "Senate": "senate-attendance.html",
          "House": "house-attendance.html"
        },
        "Party Loyalty": {
          "Senate": "senate-party-loyalty.html",
          "House": "house-party-loyalty.html"
        }
      },
      scrollWindow: function (value) {
        $(window).scrollTop(this.high * value);
      }
    }
  }
});
/*************TABLAS***************************************/
Vue.component("filtertable", {
  template: //html
`<div class="w-50 p-3">
 <div class="input-group mb-3">
    <h2 class="d-block w-100">Parties</h2>
    <label for="party"></label>
    <div class="input-group-text" v-for="(value,name) in party">
      <input @click="clickFunction(name)" type="checkbox" name="party" :value="name" aria-label="Checkbox for following text input">
      <h6 class="m-auto">{{value}}</h6>
    </div>
  </div>
  <div class="my-3">
    <h2>States</h2>
    <form id="filterStates">
      <select @change="changeFunction($event)" class="custom-select">
      <option v-for="(value, name) in options" :value="name">{{value}}</option>
    </select>
    </form>  
  </div>
  <tableresult :members="members" :selected="selected" :checkParty="checkParty"></tableresult>
</div>`,
  data: function(){
    return{
      options: {
    "" :"Choose State",
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming",
      },
      selected:'',
      changeFunction: function(value){
          this.selected = value.target.value
      },
      party: {
        "D": "Democrat",
        "R": "Republican",
        "I": "Independet"
      },
      checkParty:{
        "D": false,
        "R": false,
        "I": false
      },
      clickFunction: function(value){
        this.checkParty[value] = !this.checkParty[value]
      }
    }
  },
  props: ['members']
});

Vue.component("tableresult", {
  template: //html
  `<table class="p-3 w-100 float-left table table-dark">
        <thead>
          <tr>
            <th scope="col">Members</th>
            <th scope="col">full name</th>
            <th scope="col">state</th>
            <th scope="col">seniority</th>
            <th scope="col">Party</th>
            <th scope="col">Total votes</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="x of members" v-if ="filtroCheck(x) == true && ( selected == x.state || selected == '')">
            <td>{{members.indexOf(x)}}</td>
            <td>{{x.first_name}} {{x.last_name}}</td>
            <td class="stateFilter">{{x.state}}</td>
            <td>{{x.seniority}}</td>
            <td class="partyFilter">{{x.party}}</td>
            <td>{{x.votes_with_party_pct}}%</td>
          </tr>
        </tbody>
      </table>`,
      data: function(){
        return {
          filtroCheck: function(value){
            let flag= false;
            for (partyvalue in this.checkParty){
              if(this.checkParty[partyvalue] == true){
                flag = true;
                break;
              }
            }
            if (flag!=false){
              for (partyvalue in this.checkParty){
                if(partyvalue == value.party) {
                  console.log(this.checkParty[partyvalue])
                  return this.checkParty[partyvalue]
                }
              }              
            }else{
              return true
            }           
          }
        }
      },
      props : ['members','checkParty','selected']
    });

var app = new Vue({
  el: '#app',
  data: {
    high: window.innerHeight,
    members: []
  },
  methods: {
    json: function () {
      let page;
      if (window.location.href.indexOf("house") > -1) { page = "house" }
      if (window.location.href.indexOf("senate") > -1) { page = "senate" }
      getJson(page, (json) => {
        this.members = json.results[0].members;
        this.members.map(i=>{
          i.total_vote_ptc = Math.floor((i.total_votes * i.votes_with_party_pct ) / 100);
        })
      });
    }
  },
  created: function () {
    this.json()
  }
});
