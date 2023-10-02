//@ts-check
async function getCountry() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    localStorage.setItem("countries", JSON.stringify(data));
    location.reload();
}

function setCountry() {
    localStorage.setItem("countriesDate", new Date().toUTCString());
    getCountry();
}


function main() {
    const dateStr = localStorage.getItem("countriesDate");
    const countriesStr = localStorage.getItem("countries");

    if (countriesStr === null || dateStr === null)
    {
        setCountry();
        return;
    }

    
    const countries = JSON.parse(countriesStr);
    const date = new Date(dateStr);
    const dateNow = new Date(new Date().toUTCString());

    if (date.getFullYear() !== dateNow.getFullYear() && date.getMonth() !== dateNow.getMonth()) 
    {
        setCountry();    
        return;
    }


    const table = document.getElementById("country-list");

    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        table.innerHTML += `<tr><td>${country["cca3"]}</td><td>${country["flag"]}</td><td>${country["altSpellings"][1]}</td><td>${country["area"]}</td><td>${country["population"]}</td></tr><br>`;
    }

    table.innerHTML += "</table>";
}

main()
