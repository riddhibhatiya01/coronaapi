
let apiKEy = "WnJUT3pRMndSS2M1VE1XSnZXdkhrT1ZOWlpDTldETW9MbUQ1eTlaWg==";
    

findCountry();

function findCountry() {
    var country = document.getElementById('country').value;
   
    $.ajax({
        url: `https://api.countrystatecity.in/v1/countries/${country}/states`,
        method: 'get',
        headers: {
            "X-CSCAPI-KEY": apiKEy
        },
        success: function (states) {
            var  Select = `<option value="">Select Your State</option>`;
            states.map((state, index) => {
                Select += `<option value="${state.iso2}">${state.name}</option>`;
            });
            document.getElementById('state').innerHTML =  Select;
        },
    });
}

function findState() {
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    $.ajax({
        url: `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        method: 'get',
        headers: {
            "X-CSCAPI-KEY": apiKEy
        },
        success: function (cites) {
            var  Select = `<option value="">Select Your City</option>`;
            cites.map((city, index) => {
                Select += `<option value="${city.name}">${city.name}</option>`;

            });
            document.getElementById('city').innerHTML =  Select;
        },
    });

}

function findCity() {
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    getReport(state,city);
}

function getReport(state,city){

    $.ajax({
        url: `https://data.covid19india.org/v4/min/data.min.json`,
        method: "GET",
        type: 'json',
        success: function (res) {
            console.log(res) ;   
         document.getElementById('confirm').innerHTML=res[state].districts[city].total.confirmed;
         document.getElementById('tested').innerHTML=res[state].districts[city].total.tested;
         document.getElementById('recovered').innerHTML=res[state].districts[city].total.recovered;
         document.getElementById('vaccinated').innerHTML=res[state].districts[city].total. vaccinated1;
         document.getElementById('deceased').innerHTML=res[state].districts[city].total.deceased;
        }
    });
}
