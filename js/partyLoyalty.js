function onReady(members) {
    members.map(i => {
        searchPerson((person) => {
            if (i.party == person.letter) {
                person.members.push(i);
            }
        });
        i.total_vote_ptc = Math.floor((i.total_votes * i.votes_with_party_pct ) / 100);
    });
    searchPerson(createTable);
    
    members = members.sort(function(a,b){
        return a["votes_with_party_pct"]- b["votes_with_party_pct"];
    });
    let menores = orderPosition(members);
    createTable2(menores,"#bottomAttendance");
    members = members.sort(function(a,b){
        return b["votes_with_party_pct"]- a["votes_with_party_pct"];
    });
    let mayores = orderPosition(members);
    createTable2(mayores,"#topAttendance");
}

function createTable2(array,nameTable){
    array.map(i=>{
        let text =
        `<tr>
            <td>${i.first_name}</td>
            <td>${i.total_vote_ptc}</td>
            <td>${i.votes_with_party_pct}</td>
        </tr>
        `
        $(nameTable).append(text)
    });
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

function createTable(person){
    let td = $(`#firstTable tr[value=${person.letter}]`);
    let arrayPorcent = person.members.map(i => {
        return i.votes_with_party_pct;
    });
    let porcent;
    if( arrayPorcent != 0){
        porcent = arrayPorcent.reduce((acc, acu) => {
            return acc + acu;
        }) / person.members.length;
        porcent = Math.round(porcent, 2);
    }else{
        porcent= 0;
    }
    let text = `
        <td>${person.members.length}</td>
        <td>${porcent}%</td>
        `;
    td.append(text);
}

function searchPerson(callback) {
    for (person in container) {
        callback(container[person]);
    }
}

var container = {
    republican: {
        letter: "R",
        members: []
    },
    democrat: {
        letter: "D",
        members: []
    },
    independet: {
        letter: "I",
        members: []
    }
}

$(window).ready(function(){
    var heigthWindow = $(window).height();
    $('.menuBarra').css({ "height": heigthWindow });

    let page;
    if (window.location.href.indexOf("house") > -1){page = "house"}
    if (window.location.href.indexOf("senate") > -1){page = "senate"}

    getJson(page,(json)=>{
        data = json;
        onReady(data.results[0].members);
    });
});
