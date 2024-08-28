const METEO_URL = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-windgeschwindigkeit-kmh-10min/ch.meteoschweiz.messwerte-windgeschwindigkeit-kmh-10min_en.json";
const ID = "GVE";
let feature = null;
const KILOMETER_TO_KNOT = 1.852;
if (localStorage.getItem('weight') !== null)
{
    document.getElementById('form-weight').style.display = "none";
    document.getElementById('knots').style.display = "block";
    ShowKnots();
    setInterval(() => {
        handleData();
        ShowKnots();
    }, 600000 /* 600000 milliseconds = 10 minutes */);
}
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    main();
});

async function main() {
    const formData = new FormData(form);
    if (localStorage.getItem('weight') === null)
    {
        let weight = formData.get("weight");
        if (isNaN(weight))
        {
            alert("Please input a valid number");
            return;
        }
        weight = Math.round((weight) * 100) / 100;
        localStorage.setItem('weight', weight.toString());
    }
    document.getElementById('form-weight').style.display = "none";
    document.getElementById('knots').style.display = "block";
    handleData();
    ShowKnots();
    setInterval(() => {
        handleData();
        ShowKnots();
    }, 600000 /* 600000 milliseconds = 10 minutes */);
    
}


async function getMeteoData() {
    const response = await fetch(METEO_URL);
    const json = await response.json();
    return json;
}

async function handleData()
{
    const json = await getMeteoData();
    json.features.forEach(element => {
        if (element.id === ID)
        {
            feature = element;
        }
    });

    const wind = feature.properties.value;
    const windDirection = feature.properties.wind_direction;
    const knots = wind / KILOMETER_TO_KNOT;
    console.log(knots);
    console.log(windDirection)
    localStorage.setItem(`last-knots`, knots.toString());
    localStorage.setItem(`last-direction`, windDirection.toString());
}

function ShowKnots()
{
    const knots = Number(localStorage.getItem('last-knots'));
    const direction = Number(localStorage.getItem('last-direction'));
    const weight = Number(localStorage.getItem('weight'));
    let warning = "";
    if (direction < 180)
    {
        warning = "The wind is currently going off-shore, this makes it unsafe."
    }
    if (knots < 6)
    {
        warning += "The wind is currently too slow to be safe.";
    }
    else if (knots > 40)
    {
        warning += "The wind is currently too fast to be safe.";
    }
    else {
        switch (weight) {
            case weight <= 60:
                warning = "You should get a wing of 9m^2. "
                if (knots < 14)
                {
                    warning += "However, the wind is too slow to be safe."
                }
                else if (knots > 24)
                {
                    warning += "However, the wind is too fast to be safe."
                }
                break;
        
            case weight <= 65:
                warning = "You should get a wing of 9m^2 to 10m^2. "
                if (knots < 12)
                {
                    warning += "However, the wind is too slow to be safe."
                }
                else if (knots > 22)
                {
                    warning += "However, the wind is too fast to be safe."
                }
                break;
    
            case weight <= 70:
                warning = "You should get a wing of 10m^2 to 11m^2. "
                if (knots < 11)
                {
                    warning += "However, the wind is too slow to be safe."
                }
                else if (knots > 21)
                {
                    warning += "However, the wind is too fast to be safe."
                }
                break;
            case weight <= 75:
                warning = "You should get a wing of 12m^2. "
                if (knots < 10)
                {
                    warning += "However, the wind is too slow to be safe."
                }
                else if (knots > 20)
                {
                    warning += "However, the wind is too fast to be safe."
                }
                break;
            case weight <= 80:
                warning = "You should get a wing of 13m^2. "
                if (knots < 9)
                {
                    warning += "However, the wind is too slow to be safe."
                }
                else if (knots > 19)
                {
                    warning += "However, the wind is too fast to be safe."
                }
                break;
            case weight <= 90:
                warning = "You should get a wing of 14m^2. "
                if (knots < 8)
                {
                    warning += "However, the wind is too slow to be safe."
                }
                else if (knots > 18)
                {
                    warning += "However, the wind is too fast to be safe."
                }
                break;
    
            case weight > 90:
                warning = "You should get a wing of 15m^2. "
                if (knots < 7)
                {
                    warning += "However, the wind is too slow to be safe."
                }
                else if (knots > 17)
                {
                    warning += "However, the wind is too fast to be safe."
                }
                break;
        }

    }
    document.getElementById('knots-display').textContent = `The wind is currently at ${knots} knots. ${warning}`;
}