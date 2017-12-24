
function loadJSON(callback) {   
    //READ JSON FILE
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
        //GET WORDS FROM DICTIONARY WITH THE ALLOCATED LENGTH
        var wordsCon10 = divideWords(10, dictionary);
        var wordsCon9 = divideWords(9, dictionary);
        var wordsCon8 = divideWords(8, dictionary);
        var wordsCon7 = divideWords(7, dictionary);
        var wordsCon6 = divideWords(6, dictionary);
        var wordsCon5 = divideWords(5, dictionary);
        var wordsCon4 = divideWords(4, dictionary);
    
        var wordsTotal = [wordsCon10, wordsCon9, wordsCon8, wordsCon7, wordsCon6, wordsCon5, wordsCon4];
        //GET ONE RANDON WORD BY LENGTH
        var arraywords = getWordsGame(wordsTotal);
        //GET DEFINITIONS OF SELECTED WORDS
        var arrayDefiniciones = getDefinitions(arraywords, dictionary);
        var diferentsWordsCont = 0;
        var letrasDifArray = new Array();
    
        //LETS CREATE A TABLE WITH INPUTS ASSOCIATED TO NUMBERS, WORD BY WORD
        for (var z = 0; z < arraywords.length; z++) {
            var word = arraywords[z];
            word = word.toUpperCase();
            
            //FIRST, LETS CHECK THAT THE LETTERS ARE NOT REPEATED TO ASSIGN ONE NUMBER
            for (var x = 0; x < word.length; x++) {
    
                var same = false;
                var letra = word.charAt(x);
    
                for (var y = 0; y < letrasDifArray.length; y++) {
    
                    if (letra == letrasDifArray[y]) {
                        same = true;
                        break;
                    }
    
                }
    
                if (!same) {
                    letrasDifArray[diferentsWordsCont] = letra;
                    diferentsWordsCont++;
                }
    
            }
            
            var table=document.createElement("table");
            var trNumbNode=document.createElement("tr");
            
            //NOW, WERE PAINTING THE NUMBER ACCORDING TO THE LETTER OF THE WORD
            for (var x = 0; x < word.length; x++) {
    
                for (var y = 0; y < letrasDifArray.length; y++) {
    
                    if (word.charAt(x) == letrasDifArray[y]) {
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
            //THEN, WERE CREATING ANOTHER TR ELEMENT WITH INPUTS FOR PUT THE ANSWERS
            for (var x = 0; x < word.length; x++) {
    
                for (var y = 0; y < letrasDifArray.length; y++) {
    
                    if (word.charAt(x) == letrasDifArray[y]) {
                        var tdnode=document.createElement("td");
                        var input=document.createElement("input");
                        input.size=1;
                        input.maxLength=1;
                        input.id=word.charAt(x);
                        tdnode.appendChild(input);
                        trHoleNode.appendChild(tdnode);
                    }
    
                }
    
            }

            //AT END, ADD TABLE ELEMENT TO THE BODY
            var logogriphBody=document.getElementById("logogriphBody");
            table.appendChild(trHoleNode);
            logogriphBody.appendChild(table);
            var definition=document.createTextNode(arrayDefiniciones[z]);
            logogriphBody.appendChild(definition);
            //LINE BREAKS BETWEEN DIFFERENTS WORDS TO MAKE IT MORE PRETTY
            var linebreak=document.createElement("br");
            var linebreak2=document.createElement("br");
            logogriphBody.appendChild(linebreak);
            logogriphBody.appendChild(linebreak2);
        }
    });

}

function divideWords(longitud, diccionario) {

    var wordsEncontradas = new Array();
    var cont = 0;

    for (var x = 0; x < diccionario.length; x++) {

        if (diccionario[x].word.length == longitud) {
            wordsEncontradas[cont] = diccionario[x].word;
            cont++;
        }

    }

    return wordsEncontradas;
}

//THIS FUNCTION GETS A WORD FROM DIFFERENT LENGTH
function getWordsGame(wordsSelected) {
    var array = new Array();
    var cont = 0;

    for (var x = 0; x < wordsSelected.length; x++) {

        var words = wordsSelected[x];

        var vMin = 0;
        var vMax = words.length;
        vMax--;

        var rndm = Math.floor(Math.random() * (vMax - vMin + 1) + vMin);

        array[cont] = words[rndm];
        cont++;

    }
    return array;
}

function getDefinitions(words, diccionario) {
    var definiciones = new Array();
    var cont = 0;

    for (var x = 0; x < words.length; x++) {

        for (var y = 0; y < diccionario.length; y++) {

            if (words[x] == diccionario[y].word) {
                definiciones[cont] = diccionario[y].definicion;
                cont++;
                break;
            }

        }

    }

    return definiciones;
}

//THIS FUNCTION CHECK IF THE PLAYER HAS WIN OR NOT
function checkWords() {

    var correcto = true;
    var listaInputs = document.getElementsByTagName("input");

    for (var x = 0; x < listaInputs.length; x++) {

        //IF THE ANSWER IS WRONG, ADD A RED COLOR TO THE INPUT, ELSE, GREEN
        if (listaInputs[x].value.toUpperCase() != listaInputs[x].id) {
            listaInputs[x].style.borderColor = "rgb(255, 116, 116)";
            correcto = false;
        } else if (listaInputs[x].value.toUpperCase() == listaInputs[x].id) {
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