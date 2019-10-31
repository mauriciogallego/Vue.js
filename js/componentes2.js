Vue.component("glance", {
  template://html
    `<div class="w-100">
    <table class="p-3 w-50 table table-dark">
      <thead>
        <tr>
          <th>Party</th>
          <th>Number of Reps</th>
          <th>% Voted with Prty</th>
        </tr>
      </thead>
      <tbody id="firstTable">
        <tr v-for="(value,name) in calculo()">
          <td>{{name}}</td>
          <td>{{value.members}}</td>
          <td>{{(value.porcent / value.members).toFixed(2) || 0  }}</td>
        </tr>
      </tbody>
    </table>
    </div>`,
  data: function () {
    return {
      calculo: function () {
        let container = {
          republican: {
            letter: "R",
            members: 0,
            porcent: 0
          },
          democrat: {
            letter: "D",
            members: 0,
            porcent: 0
          },
          independet: {
            letter: "I",
            members: 0,
            porcent: 0
          }
        }
        for (member of this.members) {
          if (member.party == container.democrat.letter) {
            container.democrat.members += 1;
            container.democrat.porcent += member.votes_with_party_pct;
          }
          if (member.party == container.republican.letter) {
            container.republican.members += 1;
            container.republican.porcent += member.votes_with_party_pct;
          }
          if (member.party == container.independet.letter) {
            container.independet.members += 1;
            container.independet.porcent += member.votes_with_party_pct;
          }
        }
        return container;
      }
    }
  },
  props: ['members']
});

Vue.component("topbottom",{
  template://html
  `
  <div class="w-50 float-left">
  <h2>{{title}}</h2>

  <table class="p-3 w-100 table table-dark">
    <thead>
      <tr>
        <th>Name</th>
        <th>Number of Missed Votes</th>
        <th>% Missed</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value,name) in order()">
        <td>${value.first_name}</td>
        <td>${value.missed_votes}</td>
        <td>${value.missed_votes_pct}</td>
      </tr>
    </tbody>
  </table>
  
</div>`,
  data: function(){
    return {
      order: function(){
        let result = ordermembers(members,this.title,this.fieldOrder)
        return orderPosition(result);
      }
    }
  },
  props: ['title','members','fieldOrder']
});

function ordermembers(members,title,fieldOrder){
  if(title.indexOf('Least') != -1){
    return members.sort(function(a,b){
      return a[fieldOrder]- b[fieldOrder];
  });
  }
  if(title.indexOf('Most') != -1 ){
    return members.sort(function(b,a){
      return a[fieldOrder]- b[fieldOrder];
  });
  }
}

function orderPosition(orderMembers){
  let positions=[];
  let tope = orderMembers.length * 0.10;
  let conteo=0;

  for(i of orderMembers){
      conteo += 1;
      let repite =positions.some(function(ele){
          return i.votes_with_party_pct == ele.votes_with_party_pct;
      });
      if(repite){conteo -= 1}
      if(conteo>=tope){break}       
      positions.push(i);
  }  
  return positions;
}
