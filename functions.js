
function loadJSON(callback) {   
    
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'dictionary.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            
            callback(xobj.responseText);
            
        }
    };
    xobj.send(null);  
} 

function startGame(){

    loadJSON(function(response) {
        var dictionary = JSON.parse(response);
        var palabrasCon10 = divideWords(10, dictionary);
        var palabrasCon9 = divideWords(9, dictionary);
        var palabrasCon8 = divideWords(8, dictionary);
        var palabrasCon7 = divideWords(7, dictionary);
        var palabrasCon6 = divideWords(6, dictionary);
        var palabrasCon5 = divideWords(5, dictionary);
        var palabrasCon4 = divideWords(4, dictionary);
    
        var palabrasTotal = [palabrasCon10, palabrasCon9, palabrasCon8, palabrasCon7, palabrasCon6, palabrasCon5, palabrasCon4];
    
        var arrayPalabras = getWordsGame(palabrasTotal);
        var arrayDefiniciones = getDefinitions(arrayPalabras, dictionary);
        var letrasDiferentesCont = 0;
        var letrasDifArray = new Array();
    
        for (var z = 0; z < arrayPalabras.length; z++) {
            var palabra = arrayPalabras[z];
            palabra = palabra.toUpperCase();
    
            for (var x = 0; x < palabra.length; x++) {
    
                var igual = false;
    
                var letra = palabra.charAt(x);
    
                for (var y = 0; y < letrasDifArray.length; y++) {
    
                    if (letra == letrasDifArray[y]) {
                        igual = true;
                        break;
                    }
    
                }
    
                if (!igual) {
                    letrasDifArray[letrasDiferentesCont] = letra;
                    letrasDiferentesCont++;
                }
    
            }
            
            var table=document.createElement("table");
            var trNumbNode=document.createElement("tr");
            
            for (var x = 0; x < palabra.length; x++) {
    
                for (var y = 0; y < letrasDifArray.length; y++) {
    
                    if (palabra.charAt(x) == letrasDifArray[y]) {
                        y++;
                        var tdnode=document.createElement("td");
                        var text=document.createTextNode(y);
                        tdnode.appendChild(text);
                        trNumbNode.appendChild(tdnode);
                        y--;
                    }
    
                }
    
            }
            table.appendChild(trNumbNode);

            var trHoleNode=document.createElement("tr");
    
            for (var x = 0; x < palabra.length; x++) {
    
                for (var y = 0; y < letrasDifArray.length; y++) {
    
                    if (palabra.charAt(x) == letrasDifArray[y]) {
                        var tdnode=document.createElement("td");
                        var input=document.createElement("input");
                        input.size=1;
                        input.maxLength=1;
                        input.id=palabra.charAt(x);
                        tdnode.appendChild(input);
                        trHoleNode.appendChild(tdnode);
                    }
    
                }
    
            }
            var logogriphBody=document.getElementById("logogriphBody");
            table.appendChild(trHoleNode);
            logogriphBody.appendChild(table);
            var definition=document.createTextNode(arrayDefiniciones[z]);
            logogriphBody.appendChild(definition);
            var linebreak=document.createElement("br");
            var linebreak2=document.createElement("br");
            logogriphBody.appendChild(linebreak);
            logogriphBody.appendChild(linebreak2);
        }
    });

}

function divideWords(longitud, diccionario) {

    var palabrasEncontradas = new Array();
    var cont = 0;

    for (var x = 0; x < diccionario.length; x++) {

        if (diccionario[x].palabra.length == longitud) {
            palabrasEncontradas[cont] = diccionario[x].palabra;
            cont++;
        }

    }

    return palabrasEncontradas;

}

function getWordsGame(palabrasSeleccionadas) {

    //OBTENER UN NUMERO ALEATORIO POR CADA ARRAY
    var array = new Array();
    var cont = 0;

    for (var x = 0; x < palabrasSeleccionadas.length; x++) {

        var words = palabrasSeleccionadas[x];

        var vMin = 0;
        var vMax = words.length;
        vMax--;

        var rndm = Math.floor(Math.random() * (vMax - vMin + 1) + vMin);

        array[cont] = words[rndm];
        cont++;

    }
    return array;
}

function getDefinitions(palabras, diccionario) {
    var definiciones = new Array();
    var cont = 0;

    for (var x = 0; x < palabras.length; x++) {

        for (var y = 0; y < diccionario.length; y++) {

            if (palabras[x] == diccionario[y].palabra) {

                definiciones[cont] = diccionario[y].definicion;
                cont++;
                break;

            }

        }

    }

    return definiciones;
}

function checkWords() {

    var correcto = true;

    var listaInputs = document.getElementsByTagName("input");

    for (var x = 0; x < listaInputs.length; x++) {

        if (listaInputs[x].value.toUpperCase() != listaInputs[x].id) {
            //listaInputs[x].style.backgroundColor="rgb(255, 116, 116)";
            listaInputs[x].style.borderColor = "rgb(255, 116, 116)";
            correcto = false;

        } else if (listaInputs[x].value.toUpperCase() == listaInputs[x].id) {
            //listaInputs[x].style.backgroundColor="rgb(127, 253, 115)";
            listaInputs[x].style.borderColor = "rgb(127, 253, 115)";
        }

    }


    if (correcto) {
        alert("Congratulations, you have won");

        disableInputs(listaInputs);
        var boton = document.getElementsByTagName("button");
        boton[0].disabled = true;
        boton[1].hidden = false;

    }

}

function disableInputs(inputs) {

    for (var x = 0; x < inputs.length; x++) {
        inputs[x].disabled = true;
    }

}