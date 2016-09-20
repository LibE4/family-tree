var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function findFamilyMember(familyName, decendantName) {
  var found = false;
  var date;
  var birthMonth;
  var familyCall = new XMLHttpRequest();
  familyCall.addEventListener("load", searchFamilyTree)
  familyCall.open("GET", "family.json");
  familyCall.send();

  function searchFamilyTree () {
    var family = JSON.parse(this.response);
    // check if the family is the right one
    if (family.Name === familyName) {
      if (family.hasOwnProperty("Descendants")) {
        searchChildOf(family);
      } else {
        alert("No descendant for this family.");
      }
    } else {
      alert("Family not found!");
    }
    if(found) {
      birthMonth = month[parseInt(date.substring(0, date.indexOf("/") + 1)) - 1]; 
      console.log(decendantName + "'s birth month: ",birthMonth);
    } else {
      alert ("No matched descendant found!");
    }
  }

  function searchChildOf(currentFamily){
    var childFamily = currentFamily.Descendants;
    for(var i = 0; i < childFamily.length; i++){
      if (found) break;
      var child = childFamily[i];
      if (decendantName === child.Name) {
        date = child.Birthday;
        found = true;
        break;
      } else {
        if (child.hasOwnProperty("Descendants")) {
          searchChildOf(child);
        }
      }
    }
  }
}

findFamilyMember("Ted", "Sally");

