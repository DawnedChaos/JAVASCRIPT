/***************************************************
 * bke.js
 * -------------------------------------------------
 * In dit bestand staat alle javascript code
 * om ons spel te laten werken.
 *
 **************************************************/
 
 
 
 //Gemaakt door Jordy Olie
 //MMVAOO6C
 
 
 //Wanneer de site wordt aangeroepen:
 window.onload = function (){
    //De knop klikbaar maken.
    knop.onclick = buttonClickHandler;
 
    //Bepalen welke speler mag beginnen
    turn_speler = Math.round(Math.random() + 1);
 
    //Tonen welke speler mag beginnen
    plaatjebeurt.src = plaatjes[turn_speler]
    beurt.innerHTML = turn_speler;
};
 
//Variabelen
//Variabel voor een knop om het spel te beginnen en om het spel te resetten.
var knop = document.getElementsByClassName("game-button")[0];
//Variabel voor het tonen welke speler aan de beurt is door het tonen van een plaatje.
var plaatjebeurt = document.getElementsByClassName('players-turn')[0].getElementsByTagName('img')[0];
//Toon de beurt van een speler via de tables van de html bestand.
var beurt = document.getElementsByClassName('players-turn')[0].getElementsByTagName('td')[2];
//Toon welke ronde het is bij de tables die daarvoor zijn gemaakt.
var score = document.getElementsByClassName('rounds-info')[0].getElementsByTagName('td')[1];
//Toon de score van de spelers bij de aantal rondes.
var scorespeler2 = document.getElementsByClassName('rounds-info')[0].getElementsByTagName('td')[3];
//Toon de aantal rondes.
var ronde = document.getElementsByClassName('rounds-info')[0].getElementsByTagName('td')[5];
//De speelveld gesorteerd met meerder cellen voor de plaatjes.(img).
var speelveldtictac = document.getElementById('speelveld').getElementsByTagName('img');
//Alle plaatjes die gebruikt worden.
var plaatjes = ['img/empty.jpg', 'img/cross.jpg', 'img/circle.jpg'];
 
var turn_speler = 0;
var score_player1 = 0;
var score_player2 = 0;
var current_round = 0;
 

 
function buttonClickHandler (){
    //Ronde verhogen en de huidige ronde tonen.
    current_round = current_round + 1;
    ronde.innerHTML = current_round;
 
    // Leeg veld
    for (var celnum = 0; celnum < speelveldtictac.length; celnum++) {
        speelveldtictac[celnum].src = ('img/empty.jpg');
        speelveldtictac[celnum].className = '';
        speelveldtictac[celnum].onclick = false;
		document.getElementById('gewonnen').innerHTML=("");
		document.getElementById('win').innerHTML=("");
    }
    //Tekst reset spel
    knop.innerHTML = 'Reset spel';
    //Velden klikbaar maken.
    for (celnum = 0; celnum < 9; celnum++){
        speelveldtictac[celnum].onclick = cellClickHandler
    }
}
 
 //Toon welke speler aan de beurt is.
function Aandebeurt(){
		//Zorg dat de beurten van de spelers op goede volgorde zijn.
        beurt.innerHTML = turn_speler;
		//Zorg dat de juiste plaatjes horen bij de juiste speler.
        plaatjebeurt.src = plaatjes[turn_speler];
}
 
 //Toon welke veld bezet is of niet.
function cellClickHandler(){
	//Als de veld bezet is:
   if (this.className == 'taken'){//Als de veld al genomen is geef dan een alert dat het bezet is.
       //alert('Deze plek is al bezet.')
	   document.getElementById('bezet').innerHTML=("Deze plek is al bezet");
        return;
		} else {
			document.getElementById('bezet').innerHTML=("");
		}
	//Als het de beurt is van speler 1 anders die van speler 2.
    if (turn_speler == 1) {//Speler 1
        this.src = 'img/cross.jpg';//Kruis
        turn_speler = 2;//Speler 1(als dit op 1 staat dan is alleen speler 1 aan de beurt.)
    } else {
        this.src = 'img/circle.jpg';
        turn_speler = 1;//Speler 2.
    }
    this.className = 'taken';
    Aandebeurt()
    CheckForWinner()
}
 
 
 
 
function CheckForWinner() {//Kijk wie heeft gewonnen:
    if (//Als de eerste veld niet leeg is dan moet deze function kijken of drie velden op een rij hetzelfde zijn.
        (!speelveldtictac[0].src.match(/empty/) && speelveldtictac[0].src == speelveldtictac[1].src && speelveldtictac[1].src == speelveldtictac[2].src)//Bovenste horizontale rij.
        ||//En het moet dit bekijken voor 8 keer, omdat er 8 manieren zijn dat een speler kan winnen.
        (!speelveldtictac[3].src.match(/empty/) && speelveldtictac[3].src == speelveldtictac[4].src && speelveldtictac[4].src == speelveldtictac[5].src)//Middelste horizontale rij.
        ||
        (!speelveldtictac[6].src.match(/empty/) && speelveldtictac[6].src == speelveldtictac[7].src && speelveldtictac[7].src == speelveldtictac[8].src)//Onderste horizontale rij.
        ||
        (!speelveldtictac[0].src.match(/empty/) && speelveldtictac[0].src == speelveldtictac[3].src && speelveldtictac[3].src == speelveldtictac[6].src)//Linker verticale rij.
        ||
        (!speelveldtictac[1].src.match(/empty/) && speelveldtictac[1].src == speelveldtictac[4].src && speelveldtictac[4].src == speelveldtictac[7].src)//Middelste verticale rij.
        ||
        (!speelveldtictac[2].src.match(/empty/) && speelveldtictac[2].src == speelveldtictac[5].src && speelveldtictac[5].src == speelveldtictac[8].src)//Rechter verticale rij.
        ||
        (!speelveldtictac[0].src.match(/empty/) && speelveldtictac[0].src == speelveldtictac[4].src && speelveldtictac[4].src == speelveldtictac[8].src)//Diagonale rih van linksboven naar rechtsonder.
        ||
        (!speelveldtictac[2].src.match(/empty/) && speelveldtictac[2].src == speelveldtictac[4].src && speelveldtictac[4].src == speelveldtictac[6].src)//Diagonale rij van rechtsboven naar linksonder.
    ){
		//Als het de beurt is van speler 1, maar speler 2 gewonnen heeft:
        if (turn_speler == 1) {//Beurt van speler 1.
            score_player2++;//Verhoog de score van speler 2.
            scorespeler2.innerHTML = score_player2;//Verhoog de score van speler 2.
            document.getElementById('gewonnen').innerHTML=("Speler 2 heeft gewonnen.");//Geef aan dat speler 2 heeft gewonnen.
			document.getElementById('win').innerHTML=("Wie heeft het laatste spel gewonnen?");
		}
		//Als het de beurt is van speler 2, maar speler 1 gewonnen heeft:
        else if (turn_speler == 2) {//Beurt van speler2.
            score_player1++;//Verhoog de score van speler 1.
            score.innerHTML = score_player1;
            document.getElementById('gewonnen').innerHTML=("Speler 1 heeft gewonnen.");
			document.getElementById('win').innerHTML=("Wie heeft het laatste spel gewonnen?");
		}
 
 
    }
}