var getJson = function(typePerson,callback){
    var url = "https://api.propublica.org/congress/v1/113/{congress}/members.json";
    url = url.replace(/{congress}/g,typePerson);
    var headers = new Headers();
    headers.append("X-API-Key","bYNfpt4aTqzoeoXwxumzkkVitLmFeqCvSfuoN2Yr");
    let options = {
        method:"GET",
        headers: headers
    }
    fetch(url,options)
        .then(function (res) {
            return res.json();
        })
        .then(function(res){
            callback(res);
        })
        .catch(function(err){
            console.log(err.message)
        });
}
