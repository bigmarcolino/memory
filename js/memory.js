//FALTA REEMBARALHAR, PEGAR O TEMPO e MUDAR VISUAL

var memory = 
['1', '1',
'2', '2',
'3', '3',
'4', '4',
'5', '5',
'6', '6',
'7', '7',
'8', '8',
'9', '9',
'10', '10',
'11', '11',
'12', '12',
'13', '13',
'14', '14',
'15', '15',
'16', '16',
'17', '17',
'18', '18']; //array com o valor de cada célula

var array_ids = []; //array que guardará os ids das células que terão seus valores modificados
var array_emb = []; //array que guardará os valores dos campos que serão reembaralhados
var memory_values = []; //guarda o valor das duas células que serão clicadas, para serem comparados
var memory_cell_ids = []; //guarda os ids das células clicadas, para serem usados pra revirar quando os valores não forem iguais
var cells_flipped = 0; //quantidade de células viradas

var qtd_row = Math.sqrt(memory.length);
var qtd_col = Math.sqrt(memory.length);

var qtd_jogadas = 0; //
var hora_de_embaralhar = 10; //quantidades de jogadas máxima para reembaralhar o jogo

//cria a função embaralhar() para os objetos Array
Array.prototype.embaralhar = function() {
	var i = this.length;
	var j, temp; 

	while(--i > 0) {
		j = Math.floor(Math.random() * (i+1)); 
		temp = this[j]; 
		this[j] = this[i]; 
		this[i] = temp; 
	} 
}

function novoJogo() {
	cells_flipped = 0; 
	var saida = '';
	var val = 0;
	var val_aux = 0; 
	memory.embaralhar();

	for(var i = 0; i < qtd_row; i++) {
		saida += '<div class="row">';

		for(var j = 0; j < qtd_col; j++) {
			saida += '<div id="cell_'+val+'" class="cell" style="background:#FFF" onclick="cliqueNaCelula(this, \''+memory[val]+'\')">'+memory[val]+'</div>';
			val++;
		}

		saida += '</div>';
		saida += '<div class="clear"></div>';
	}

	document.getElementById('game-container').innerHTML = saida;

	//desvira todas as células após o tempo para ver os valores
	function desvirarTodas() {
		for(var i = 0; i < qtd_row; i++) {
			for(var j = 0; j < qtd_col; j++) {
				document.getElementById('cell_'+val_aux).style.background = 'grey'; 
				document.getElementById('cell_'+val_aux).innerHTML = ""; 
				val_aux++;
			}
		}
	} 

	setTimeout(desvirarTodas, 5000);
}

function cliqueNaCelula(cell, val){
	//verifica se a célula clicada já está virada 
	if(cell.innerHTML == "" && memory_values.length < 2){ 
		cell.style.background = '#FFF'; 
		cell.innerHTML = val; 

		//verifica se é a primeira a ser clicada
		if(memory_values.length == 0) { 
			memory_values.push(val); 
			memory_cell_ids.push(cell.id); 
		} //entra aqui se for a segunda a ser clicada
		else if(memory_values.length == 1) { 
			memory_values.push(val);
			memory_cell_ids.push(cell.id);
			qtd_jogadas++; 

			//verifica se as duas clicadas são iguais
			if(memory_values[0] == memory_values[1]) { 
				cells_flipped += 2;
				memory_values = []; 
				memory_cell_ids = [];
				
				//verifica se o jogo terminou
				if(cells_flipped == memory.length) { 
					alert("Parabéns"); 
					document.getElementById('game-container').innerHTML = "";
					novoJogo(); 
				} 
			}//se as duas não forem iguais, as células são desviradas 
			else { 
				function desvirarDiferentes() {
					var cell1 = document.getElementById(memory_cell_ids[0]);
					var cell2 = document.getElementById(memory_cell_ids[1]); 
					cell1.style.background = 'grey'; 
					cell1.innerHTML = ""; 
					cell2.style.background = 'grey'; 
					cell2.innerHTML = "";
					memory_values = []; 
					memory_cell_ids = []; 
				} 

				setTimeout(desvirarDiferentes, 600); 
			}

			//reembaralhar após 5 jogadas 
			if(qtd_jogadas == hora_de_embaralhar) {

				qtd_jogadas = 0;

				alert("embaralhou");

				for(var i = 0; i < memory.length; i++) {
					if(document.getElementById('cell_'+i).innerHTML == "") {
						array_ids.push(i);
						array_emb.push(memory[i]);
					} 
				}

				array_emb.embaralhar();

				for(var j = 0; j < array_ids.length; j++) {
					document.getElementById('cell_'+array_ids[j]).setAttribute( "onClick", "cliqueNaCelula(this, " + array_emb[j] + ");" );
				}

				array_emb = [];
				array_ids = [];
			} 
		} 
	} 
}

novoJogo();