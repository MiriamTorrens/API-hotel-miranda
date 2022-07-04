const fs = require('fs');

const countries = fs.readFileSync("countries.txt", { encoding: 'utf8', flag: 'r' }).split("\n");

//Eliminar el primer elemento del array: "Country Population Area"
countries.shift(); 

//Crear un array de países=objetos para ordenarlo por la propiedad densidad
const countriesList =
    //Añadir cabecera de la lista
    "Country,Population,Area,Density\n"+
    countries
        //Dividir cada elemento del array en objeto: nombre, poblacion, area, densidad
        .map(c => c.split(" "))
        .map(c => {
            const name = c.splice(0, (c.length - 2)).join().replace(/,/g, ' ');
            const population = parseFloat(c[c.length - 2]?.replace(/,/g, ''));
            const area = parseFloat(c[c.length - 1]?.replace(/,/g, ''));
            
            const country = {
                name: name,
                population: population,
                area: area,
                density: population / area
            }
            return country;
        })
        //Ordenar el array por densidad de población
        .sort((a, b) => a.density - b.density)
        //Convertir el objeto country y el array countriesList en string para crear archivo csv
        .map(c => Object.values(c).toString()).join("\n");

fs.writeFileSync("countries.csv", countriesList);

console.log(countriesList);
