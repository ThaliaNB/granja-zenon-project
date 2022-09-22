const config = {
    type: 'bar',
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Grafica de la granja de Zenón'
            }
        }
    },
};

function generarColor() {
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";

    for (var i = 0; i < 6; i++) {
        color = color + simbolos[Math.floor(Math.random() * 16)];
    }

    return color;
}

async function init() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://granja-zenon-project.herokuapp.com/temperatura", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            let datasets = []
            let labels = []
            result.body.forEach(temperature => {
                const color = generarColor();
                datasets.push({
                    label: temperature.unidad,
                    data: temperature.valor,
                    borderColor: color,
                    backgroundColor: generarColor(),
                })
                const isEntry = labels.find(x => x == temperature.fecha)
                if (!isEntry)
                    labels.push(temperature.fecha);
            });
            config["data"] = {
                labels: labels,
                datasets: datasets
            }
            let myChart = new Chart("chartTemperature", config);
        })
        .catch(error => console.log('error', error));
}