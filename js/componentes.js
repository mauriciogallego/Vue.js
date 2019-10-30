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

Vue.component("filterstates", {
  template: //html
  `<form @change="" id="filterStates">
    <select class="custom-select">
    <option value="">Choose State</option>
    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
  </select>
</form>
  `
})
Vue.component("filterparties", {
  template: //html
  `<div class="input-group mb-3">
  <h2 class="d-block w-100">Parties</h2>
  <label for="party"></label>
  <div class="input-group-text">
    <input @click="" type="checkbox" name="party" value="D" id="democrat" aria-label="Checkbox for following text input">
    <h6 class="m-auto">Democrat</h6>
  </div>
  <div class="input-group-text">
    <input @click="" type="checkbox" name="party" value="R" id="republican" aria-label="Checkbox for following text input">
    <h6 class="m-auto">Republican</h6>
  </div>
  <div class="input-group-text">
    <input @click="" type="checkbox" name="party" value="I" id="independet" aria-label="Checkbox for following text input">
    <h6 class="m-auto">Independet</h6>
  </div>
</div>
  `
})
Vue.component("tableresult", {
  template: //html
  `<table class="p-3 w-50 float-left table table-dark">
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
          <tr v-for="x of members" v-if ="">
            <td>{{members.indexOf(x)}}</td>
            <td>{{x.first_name}} {{x.last_name}}</td>
            <td class="stateFilter">{{x.state}}</td>
            <td>{{x.seniority}}</td>
            <td class="partyFilter">{{x.party}}</td>
            <td>{{x.votes_with_party_pct}}%</td>
          </tr>
        </tbody>
      </table>`,
      props : ['members']
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
      });
    }
  },
  created: function () {
    this.json()
  }
});
