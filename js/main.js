var container = { containerParties: [], containerStates: [] };
var data;
$(window).ready(function () {
  var heigthWindow = $(window).height();
  console.log(heigthWindow) //638
  $('.menuBarra').css({ "height": heigthWindow });
  let page;
  if (window.location.href.indexOf("house") > -1) { page = "house" }
  if (window.location.href.indexOf("senate") > -1) { page = "senate" }

  if (page == "house" || page == "senate") {
    getJson(page, (json) => {
      data = json;
      buildTable(data.results[0].members);
      let inputs = $('input[type=checkbox]');
      addEvent(inputs, events);
      $('#filterStates').on('change', changeState);
    })
  } else {
    addEvent($('.event'), (obj) => {
      let move = heigthWindow * $(obj).attr('value');
      $(window).scrollTop(move);
    });
  }
});

function changeState() {
  let value = $('#filterStates select').val();
  let dropdownFilter = value ? [value] : [];
  if (container.containerStates.length != 0) {
    container.containerStates.map(i => {
      $(`#tbody tr[value="${i}"]`).toggle(true);
    });
    container.containerStates = [];
    events();
  }
  filterTable(dropdownFilter, ".stateFilter");
}

function events() {
  let checkedGroup = $('input:checked');
  let checked = [];
  for (checkbox of checkedGroup) {
    checked.push($(checkbox).attr('value'));
  }
  if (container.containerParties.length != 0) {
    container.containerParties.map(i => {
      $(`#tbody tr[value="${i}"]`).toggle(true);
    });
    container.containerParties = [];
    changeState();
  }

  filterTable(checked, ".partyFilter");
}

function filterTable(filter, filterType) {
  $('#tbody tr[style!="display: none;"]').each(function () {
    let value = $(this).find(filterType).text();
    let included = isIncluded(value, filter);
    $(this).toggle(included);
    if (!included) {
      switch (filterType) {
        case ".partyFilter":
          container.containerParties.push($(this).attr('value'));
          break;
        case ".stateFilter":
          container.containerStates.push($(this).attr('value'));
          break;
      }
    }
  });
}
function isIncluded(x, lst) {
  return lst.length === 0 || lst.indexOf(x) != -1;
}

function addEvent(list, callback) {
  list.each(function (i, data) {
    $(data).click(function () {
      callback($(this));
    });
  });
}

function buildTable(data) {
  let member = 0;
  data.map(x => {
    member += 1;
    let name = `${x.first_name} ${x.last_name}`;
    let state = x.state;
    let seniority = x.seniority;
    let party = x.party;
    let totalVotes = x.votes_with_party_pct;

    textInsert = `                
        <tr value="${x.id}">
            <td>${member}</td>
            <td>${name}</td>
            <td class="stateFilter">${state}</td>
            <td>${seniority}</td>
            <td class="partyFilter">${party}</td>
            <td>${totalVotes}%</td>
        </tr>`
    $('#tbody').append(textInsert);
  });
}