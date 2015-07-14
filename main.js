var consonanti = "BCDFGHJKLMNPQRSTVWXYZ";
var vocali = "AEIOU";
var dict_mese = {'1':'A','2':'B','3':'C','4':'D','5':'E','6':'H','7':'L',
				'8':'M','9':'P','10':'R','11':'S','12':'T'};
var dispari = {'0':1,'1':0,'2':5,'3':7,'4':9,'5':13,'6':15,'7':17,'8':19,
		    '9':21,'A':1,'B':0,'C':5,'D':7,'E':9,'F':13,'G':15,'H':17,
		    'I':19,'J':21,'K':2,'L':4,'M':18,'N':20,'O':11,'P':3,'Q':6,
		    'R':8,'S':12,'T':14,'U':16,'V':10,'W':22,'X':25,'Y':24,'Z':23};
var pari = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,
	      'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,
	      'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,
	      'S':18,'T':19,'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25};
var codice_resto={0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',7:'H',
      		8:'I',9:'J',10:'K',11:'L',12:'M',13:'N',14:'O',
      		15:'P',16:'Q',17:'R',18:'S',19:'T',20:'U',21:'V',
      		22:'W',23:'X',24:'Y',25:'Z'}
var belf = 0;

var fillComuni = function(){
	var listaComuni = document.getElementById("locations");
	for (var i=0; i<belfiore.length;i++){
		var option = document.createElement("option");
		t = document.createTextNode(belfiore[i]['comune']);
		option.appendChild(t);
		listaComuni.appendChild(option);
	};
	return true
};



var insertProvincia = function(){
	var prov = document.getElementById('_prov');
	var com = document.getElementById('_luog');
	
	for (var i=0; i<belfiore.length; i++){
		if (belfiore[i]['comune']==com.value){
			prov.value = belfiore[i]['provincia'];
			belf = belfiore[i]['belfiore'];
		};
	};
	return true;
};

var validityCheck = function(){
	var elenco = document.getElementsByTagName("input");
	console.log(elenco);
	for (var i=0; i < elenco.length; i++){
		if (elenco[i].validity.valid==false){
			elenco[i].value="";
			elenco[i].style.borderColor='red';
			console.log(elenco[i].validationMessage);
		}
		else{
			elenco[i].value = elenco[i].value.toUpperCase();
			elenco[i].style.borderColor='initial';
		}; 
	};
	insertProvincia();
	document.getElementById("_CFiscale").value = codice15() + codiceResto();
	return true;
};

var codiceComune = function(){
	var current_Comune = getElementById('_luog');
};

var codice00_02Cognome = function(cognome){
	var gruppo_consonantico = '', gruppo_vocalico = '', cod_cognome = '';
	cognome = cognome.toUpperCase();
	for (var i = 0; i < cognome.length; i++){
		for (var j = 0; j < consonanti.length; j++){
			if (cognome[i] == consonanti[j]){
				gruppo_consonantico += cognome[i];
			}
		}
	}; 
	for (var i = 0; i< cognome.length; i++){
		for (var j = 0; j < vocali.length; j++){
			if (cognome[i] == vocali[j]){
				gruppo_vocalico += cognome[i];
			}
		}
	};
	if (gruppo_consonantico.length >= 3){
		cod_cognome = gruppo_consonantico.slice(0,3);
	} else {
		cod_cognome = gruppo_consonantico + gruppo_vocalico.slice(0, 3-gruppo_consonantico.length);
	};
	while (cod_cognome.length < 3){
		cod_cognome += 'X';
	};
	return cod_cognome;
};

var codice03_05Nome = function(nome){
	var gruppo_consonantico = '', gruppo_vocalico = '', cod_nome = '';
	nome = nome.toUpperCase();
	for (var i = 0; i < nome.length; i++){
		for (var j = 0; j < consonanti.length; j++){
			if (nome[i] == consonanti[j]){
				gruppo_consonantico += nome[i];
			}
		}
	}; 
	for (var i = 0; i< nome.length; i++){
		for (var j = 0; j < vocali.length; j++){
			if (nome[i] == vocali[j]){
				gruppo_vocalico += nome[i];
			}
		}
	};
	if (gruppo_consonantico.length > 3){
		cod_nome = gruppo_consonantico.charAt(0) + gruppo_consonantico.charAt(2) + gruppo_consonantico.charAt(3);
	} else {
		cod_nome = gruppo_consonantico + gruppo_vocalico.slice(0, 3-gruppo_consonantico.length);
	};
	while (cod_nome.length < 3){
		cod_nome += 'X';
	};
	return cod_nome;
};
var codice06_07Anno_di_Nascita = function(){
	return document.getElementById("_aNas").value.slice(2);
};
var codice08Mese_di_Nascita = function(){
	return dict_mese[document.getElementById("_mNas").value];
};
var codice09_10Giorno_di_Nascita = function(){
	gn = +(document.getElementById("_gNas").value);
	checked = document.getElementById("_female").checked;
	if (checked){
		gn+=40;
	};
	// 2 cifre
	gn =""+gn;
	if (gn.length < 2){
		gn = "0"+gn;
	}
	return gn;
};
var codice11_14Comune = function(){
	return belf;
};

var codice15 = function(){
	return codice00_02Cognome(document.getElementById('_cogn').value) +
			codice03_05Nome(document.getElementById('_nome').value) +
			codice06_07Anno_di_Nascita(document.getElementById('_aNas').value) +
			codice08Mese_di_Nascita(document.getElementById('_mNas').value) +
			codice09_10Giorno_di_Nascita(document.getElementById('_gNas').value) +
			codice11_14Comune()
};
var codiceResto = function(){
	var codice_parziale = codice15();
	var resto = 0, somma_dispari = 0, somma_pari = 0;
	for (var i = 0; i < codice_parziale.length; i++){
		if ((i % 2) == 0){
			somma_dispari += dispari[codice_parziale.charAt(i)];
		} else{
			somma_pari += pari[codice_parziale.charAt(i)];
		};
	};
	return codice_resto[(somma_dispari+somma_pari)%26];
};
