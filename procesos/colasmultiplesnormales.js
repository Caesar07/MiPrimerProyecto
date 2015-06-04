/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.write("<script type='text/javascript' src='algoritmosmultiples.js'></script>");
document.write("<script type='text/javascript' src='proceso.js'></script>");
document.write("<script type='text/javascript' src='js/Concurrent.Thread.js'></script>");
document.write("<script type='text/javascript' src='colas.js'></script>");

var colasmultiplesnormales = function(numero){
this.__proto__ = algoritmomultiple;
algoritmomultiple.inicializar(numero,true,false);
//algoritmo.apply(this,arguments);
var numerocpu = numero;
var i = 0;
var prioridadposeecolacritico=0; //parametro para saber que tipo de analisis de critico se hace
var srtfsuspendido = false;
//var prioridadposeecolalisto=0; //paraametro para saber que cola entregara su proceso a critico
var procesos = []; // lista que poseera todos los procesos gestionados por la cpu
var cantidadprocesos = 0;
var estados = [];// lista en donde estaran todas las colas que usara la cpu
var terminados = new cola();
var desempeño = 0;
//nuemero al que pertenece la cpu
    for (var i =0; i<6;i++) {//0 para critico, 1 para prioriad1, 2 para prioridad2, 3 para prioridad3
							//4 para suspendido, 5 para bloqueado
        estados[i]= new cola(); //
    }
    
 this.getalogirtmoheredar = function(){
     return algoritmomultiple;
 };
 this.getdesempeño = function(){
     return desempeño;
 };
 this.utilizarhilo=function(){
    var listacritica = estados[0];
    var prioridad1 = estados[1];
    var prioridad2 = estados[2];
    var prioridad3 = estados[3];
    var listasuspendido = estados[4];
    var listabloqueado = estados[5];
    algoritmomultiple.gantt(estados[0],estados[1],estados[2],estados[3],estados[4],estados[5],terminados);
    var porcentajerend = algoritmomultiple.revisarrendimientoalgoritmoenprocesador(
            listacritica.getcantidadelementos(),prioridad1.getcantidadelementos(),
            prioridad2.getcantidadelementos(),prioridad3.getcantidadelementos(),
            listasuspendido.getcantidadelementos(),listabloqueado.getcantidadelementos());
    desempeño = porcentajerend*100;
    document.getElementById("rendimiento"+(numerocpu)).innerHTML =(
            "rendimiento del procesador "+(numerocpu)+" : "+desempeño+" %");
    
	
	//if (prioridad1.getcantidadelementos()>0)
		this.revisarroundrobinprioridad1(listacritica,prioridad1,listasuspendido,listabloqueado);
	//if (prioridad2.getcantidadelementos()>0)
		this.revisarsrtfprioridad2(listacritica,prioridad2,listasuspendido,listabloqueado);
	//if (prioridad3.getcantidadelementos()>0)
		this.revisarfifoprioridad3(listacritica,prioridad3,listasuspendido,listabloqueado);
    // revisar si cola bloqueado esta ocupado para ver si se liberan procesos o no
    if (estados[5].getcantidadelementos()!==0){
        if (algoritmomultiple.revisarrecursosdisponibless(estados[5].getelementoprimerocola())) {//revision disponibilidad de recursos
            var procesoalisto = estados[5].quitarelemento();
            this.agregarobjeto(procesoalisto,parseInt(procesoalisto.getprioridad()));
			if (procesoalisto.getprioridad()==2)
				algoritmomultiple.ingresarprocesoentabla(parseInt(procesoalisto.getprioridad()),procesoalisto,false);
			else
				algoritmomultiple.ingresarprocesoentabla(parseInt(procesoalisto.getprioridad()),procesoalisto,true);
            algoritmomultiple.eliminarfilatabla(5,procesoalisto.getidentificador());
        }
        else{
            var procesoabloqueado = estados[5].quitarelemento();
            algoritmomultiple.eliminarfilatabla(5,procesoabloqueado.getidentificador());
            this.agregarobjeto(procesoabloqueado,5);
			if (procesoabloqueado.getprioridad()==2)
				algoritmomultiple.ingresarprocesoentabla(5,procesoabloqueado,true,false);
			else
				algoritmomultiple.ingresarprocesoentabla(5,procesoabloqueado,true,true);
		}
    }
    
    // revisar si cola suspendido esta ocupado para ver si se procesos o no
    if (listasuspendido.getcantidadelementos()!==0){
        if (listasuspendido.getelementoprimerocola().getquantum()>0) {//quantum guardara el tiempo en suspendido mientras este en esta cola
            var nuevoquantum = estados[4].getelementoprimerocola().getquantum()-1;
            estados[4].getelementoprimerocola().setquantum(nuevoquantum);
            algoritmomultiple.actualizarfila(estados[4].getelementoprimerocola(),4);
        }
        else{
            var procesosuspendido = listasuspendido.quitarelemento();
            estados[parseInt(procesosuspendido.getprioridad())].agregarelemento(procesosuspendido);
			if (procesosuspendido.getprioridad()==2)
				algoritmomultiple.ingresarprocesoentabla(parseInt(procesosuspendido.getprioridad()),procesosuspendido,true,false);
			else
				algoritmomultiple.ingresarprocesoentabla(parseInt(procesosuspendido.getprioridad()),procesosuspendido,true,true);
				
            algoritmomultiple.eliminarfilatabla(4,procesosuspendido.getidentificador());
            //alert("cantidad de elementos de listo "+listalisto.getcantidadelementos());
        }
    }
    i+=1;
 };
 
 this.revisarroundrobinprioridad1 = function(listacritica,listalisto,listasuspendido,listabloqueado){
	  if (!(listasuspendido.getcantidadelementos()>0 && listasuspendido.getelementoprimerocola().getprioridad()==2)){
		  algoritmomultiple.setnumerocpuausar(numerocpu);
		//primero debe actualizar los quantums de los procesos
		listalisto = this.asignarquantumsatodalacola(listalisto,1);
		//revisar Si lista Critico esta disponible o no
		if (listacritica.getcantidadelementos()===0){
			if (listalisto.getcantidadelementos()!==0){//ingreso proceso a critico
				//var posicionprocquantumcorto = this.getprocesoconquantummmascorto(listalisto);
				var posicionprocquantumcorto = 0;
				if (algoritmomultiple.revisarrecursosdisponibless(listalisto.getelementoposicion(posicionprocquantumcorto))) {//revision disponibilidad de recursos
					//var procesoacritico = listalisto.quitarelemento();
					prioridadposeecolacritico = 1;
					var procesoacritico = listalisto.quitarelementoenubicacion(posicionprocquantumcorto);
					algoritmomultiple.utilizarrecursosdisponibless(procesoacritico);
					this.agregarobjeto(procesoacritico,0);
					algoritmomultiple.ingresarprocesoentabla(0,procesoacritico,true);
					algoritmomultiple.eliminarfilatabla(1,procesoacritico.getidentificador());
					document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("entregando critico "+ i);
				}
				else{//no hay recursos disponibles
					//metodos necesaios para trasladar proceso de una cola a otra
					var procesoabloqueado = listalisto.quitarelementoenubicacion(posicionprocquantumcorto);
					this.agregarobjeto(procesoabloqueado,5);
					algoritmomultiple.ingresarprocesoentabla(5,procesoabloqueado,true);
					algoritmomultiple.eliminarfilatabla(1,procesoabloqueado.getidentificador());
					
					document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("falta de recursos "+ i);
				}
			}
			else{
				//prioridadposeecolalisto = 1;
				document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesador libre"+ i);
			}
		}
		else {//reduzco tiempo en critico
			if (prioridadposeecolacritico === 1){
				var elementoprocesando = listacritica.getelementoprimerocola();
				if (elementoprocesando.gettiempouso()-1===0){//proceso a terminado
					var procesoterminado = listacritica.quitarelemento();
					terminados.agregarelemento(procesoterminado);
					algoritmomultiple.eliminarfilatabla(0,procesoterminado.getidentificador());
					algoritmomultiple.liberarrecursosdeproceso(procesoterminado);
				}
				else{
					if(elementoprocesando.getquantum()>1){//tiempo en procesador continua
						//cambio logico
						elementoprocesando = listacritica.quitarelemento();
						elementoprocesando.reducirtiempouso();
						listacritica.agregarelemento(elementoprocesando);
						//cambio fisico
						algoritmomultiple.actualizarfila(elementoprocesando,0);

						document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesando cpu #"+numerocpu+
								" valores "+ i);
					}
					else{//tiempo quantum termino por tanto proceso ira a suspendido
						//cambio logico, hay que tuaitar quantum y ponerle 3 segundos para estar en suspendido
						var procesoasuspendido = listacritica.quitarelemento();
						elementoprocesando.setquantum(algoritmomultiple.tiemposuspendido(procesoasuspendido.gettiempouso()));
						this.agregarobjeto(procesoasuspendido,4);
						//cambio fisico
						algoritmomultiple.ingresarprocesoentabla(4,procesoasuspendido,true);
						algoritmomultiple.eliminarfilatabla(0,procesoasuspendido.getidentificador());
						algoritmomultiple.liberarrecursosdeproceso(procesoasuspendido);
						
					}
				}
			}
		}
		this.actualizarestados(listacritica,listalisto,listasuspendido,listabloqueado,1);
	  }
	  else{srtfsuspendido = true;}
 };
 
  this.revisarsrtfprioridad2 = function(listacritica,listalisto,listasuspendido,listabloqueado){
	  var revisarprioridadcritica = false;
	  if (listacritica.getcantidadelementos()>0 &&listacritica.getelementoprimerocola().getprioridad()==2)
			revisarprioridadcritica = true;
		
	  if (estados[1].getcantidadelementos()==0 ||revisarprioridadcritica || srtfsuspendido){
			   algoritmomultiple.setnumerocpuausar(numerocpu);
			//primero debe actualizar los quantums de los procesos
			//revisar Si lista Critico esta disponible o no
			if (listacritica.getcantidadelementos()===0){
				if (listalisto.getcantidadelementos()!==0 /*&& prioridadposeecolalisto ===1*/){//ingreso proceso a critico
					var posiciontiempomascorto = this.getprocesocontiempomascorto(listalisto);
					//alert("mi posicion mas corto "+posiciontiempomascorto+" "+listalisto.getelementoposicion(posiciontiempomascorto).getapropiacion()
					//        +" "+listalisto.getelementoposicion(posiciontiempomascorto).getidentificador());
					if (algoritmomultiple.revisarrecursosdisponibless(listalisto.getelementoposicion(posiciontiempomascorto))) {//revision disponibilidad de recursos
						prioridadposeecolacritico = 2;
						var procesoacritico = listalisto.quitarelementoenubicacion(posiciontiempomascorto);
						algoritmomultiple.utilizarrecursosdisponibless(procesoacritico);
						this.agregarobjeto(procesoacritico,0);
						algoritmomultiple.ingresarprocesoentabla(0,procesoacritico,true);
						algoritmomultiple.eliminarfilatabla(2,procesoacritico.getidentificador());
						document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("entregando critico "+ i);
					}
					else{//no hay recursos disponibles
						//metodos necesaios para trasladar proceso de una cola a otra
						var procesoabloqueado = listalisto.quitarelementoenubicacion(posiciontiempomascorto);
						this.agregarobjeto(procesoabloqueado,5);
						algoritmomultiple.ingresarprocesoentabla(5,procesoabloqueado,true);
						algoritmomultiple.eliminarfilatabla(2,procesoabloqueado.getidentificador());
						
						document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("falta de recursos "+ i);
					}
				}
				else{
					//prioridadposeecolalisto=2;
					document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesador libre"+ i);
				}
			}
			else {//reduzco tiempo en critico
				if (prioridadposeecolacritico === 2){
				var elementoprocesando = listacritica.getelementoprimerocola();
				if (elementoprocesando.gettiempouso()===0){//proceso a terminado
					var procesoterminado = listacritica.quitarelemento();
					terminados.agregarelemento(procesoterminado);
					algoritmomultiple.eliminarfilatabla(0,procesoterminado.getidentificador());
					algoritmomultiple.liberarrecursosdeproceso(procesoterminado);
				}
				else{
					//revisar si no hay otro proceso que le quite el estado critico
					if (!this.reisarsisacardecritico(listalisto,listacritica.
								getelementoprimerocola().gettiempouso())){
							//cambio logico
							elementoprocesando = listacritica.quitarelemento();
							elementoprocesando.reducirtiempouso();
							listacritica.agregarelemento(elementoprocesando);
							//cambio fisico
							algoritmomultiple.actualizarfila(elementoprocesando,0);
						document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesando cpu #"+numerocpu+
									" valores "+ i);
						}
						else{
							var procesoasuspendido = listacritica.quitarelemento();
							elementoprocesando.setquantum(algoritmomultiple.tiemposuspendido(procesoasuspendido.gettiempouso()));
							this.agregarobjeto(procesoasuspendido,4);
							//cambio fisico
							algoritmomultiple.ingresarprocesoentabla(4,procesoasuspendido,true);
							algoritmomultiple.eliminarfilatabla(0,procesoasuspendido.getidentificador());
							algoritmomultiple.liberarrecursosdeproceso(procesoasuspendido);
						}
					}
				}
			}
				this.actualizarestados(listacritica,listalisto,listasuspendido,listabloqueado,2);
		  }
  };

  this.revisarfifoprioridad3 = function(listacritica,listalisto,listasuspendido,listabloqueado){
	  var revisar = false;
	  if (listacritica.getcantidadelementos()>0 && listacritica.getelementoprimerocola().getprioridad()==3)
			revisar = true;
	  if ((estados[1].getcantidadelementos()==0 && estados[2].getcantidadelementos()==0) ||revisar){
		  algoritmomultiple.setnumerocpuausar(numerocpu);
		//primero debe actualizar los quantums de los procesos
		//revisar Si lista Critico esta disponible o no
		if (listacritica.getcantidadelementos()===0){
			if (listalisto.getcantidadelementos()!==0/* && prioridadposeecolalisto===2*/){//ingreso proceso a critico
				if (algoritmomultiple.revisarrecursosdisponibless(listalisto.getelementoprimerocola())) {//revision disponibilidad de recursos
					prioridadposeecolacritico = 3;
					var procesoacritico = listalisto.quitarelemento();
					algoritmomultiple.utilizarrecursosdisponibless(procesoacritico);
					this.agregarobjeto(procesoacritico,0);
					algoritmomultiple.ingresarprocesoentabla(0,procesoacritico,true);
					algoritmomultiple.eliminarfilatabla(3,procesoacritico.getidentificador());
					document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("entregando critico "+ i);
				}
				else{//no hay recursos disponibles
					//metodos necesaios para trasladar proceso de una cola a otra
					var procesoabloqueado = listalisto.quitarelemento();
					this.agregarobjeto(procesoabloqueado,5);
					algoritmomultiple.ingresarprocesoentabla(5,procesoabloqueado,true);
					algoritmomultiple.eliminarfilatabla(3,procesoabloqueado.getidentificador());
					
					document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("falta de recursos "+ i);
				}
			}
			else{
				//prioridadposeecolalisto =0;
				document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesador libre"+ i);
			}
		}
		else {//reduzco tiempo en critico
			if (prioridadposeecolacritico === 3){
				var elementoprocesando = listacritica.getelementoprimerocola();
				if (elementoprocesando.gettiempouso()===0){//proceso a terminado
					var procesoterminado = listacritica.quitarelemento();
					terminados.agregarelemento(procesoterminado);
					algoritmomultiple.eliminarfilatabla(0,procesoterminado.getidentificador());
					algoritmomultiple.liberarrecursosdeproceso(procesoterminado);
								//eliminar proceso de la lista 
				}
				else{
					//cambio logico
					elementoprocesando = listacritica.quitarelemento();
					elementoprocesando.reducirtiempouso();
					listacritica.agregarelemento(elementoprocesando);
					//cambio fisico
					algoritmomultiple.actualizarfila(elementoprocesando,0);
				document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesando cpu #"+numerocpu+
							" valores "+ i);
				}
			}
		}
		
		  this.actualizarestados(listacritica,listalisto,listasuspendido,listabloqueado,3);
	  }
  };
  
 this.actualizarestados = function(listacritica,listalisto,listasuspendido,listabloqueado,c){
    estados[0] = listacritica;
    estados[c] = listalisto;
    estados[4] = listasuspendido;
    estados[5] = listabloqueado;
 };
 // Funcion llamada por jquery de interfaz para registrar nuevo recursp
this.ingresarproceso = function(identificador,nombreproceso,tiempoproceso,prioridadproceso,recursoconsumo,
cantidadconsumo,color){
    var nuevoproceso = new proceso(identificador,nombreproceso,tiempoproceso,prioridadproceso,recursoconsumo,
cantidadconsumo,color);
    procesos[cantidadprocesos] = nuevoproceso;
    cantidadprocesos++;
    //Se asume que todo recurso nueo entra en cola de listo
    this.agregarobjeto(nuevoproceso,parseInt(prioridadproceso));
	if (prioridadproceso==1 || prioridadproceso==3)
    algoritmomultiple.ingresarprocesoentabla(parseInt(prioridadproceso),nuevoproceso,true,true);
	else
    algoritmomultiple.ingresarprocesoentabla(parseInt(prioridadproceso),nuevoproceso,true,false);
    //alert("en abstracto bien "+nuevoproceso.getnombre()+", "+nuevoproceso.gettiempouso()+", "+nuevoproceso.getrecursosnecesitados()
    //        +", "+nuevoproceso.getcantidadrecursos());                        
};


//Funcion usada para agregar a un proceso a cualqueir cola
this.agregarobjeto = function(elemento, lista){
    estados[lista].agregarelemento(elemento);
};

//Funcion para calcular Quantum
this.calcularquantum = function(colalisto,tiempoprocesocritico){
    var quantum = 0;
    var numElements = 0;
    if (colalisto.getcantidadelementos()>0) {
        while (colalisto.getcantidadelementos()>numElements) {
            quantum = quantum + parseInt(colalisto.getelementoposicion(numElements).gettiempouso());
            numElements++;
        }
        return (quantum / (numElements*2)) + (parseInt(tiempoprocesocritico) / 4);
    } else {
        return parseInt(tiempoprocesocritico);
    }
};

//funcion que tomando una cola de procesos le calcula el cuantum a todos los rpocesos involucrados
this.asignarquantumsatodalacola = function(colalisto,numerocola){
    var colalist = new cola();
    //colar cola listo
    var cloncola = new cola();
    for (var i=0;colalisto.getcantidadelementos()>i;i++){
        cloncola.agregarelemento(colalisto.getelementoposicion(i));
    }
    if (colalisto.getcantidadelementos()===0)
        return colalisto;
    while (colalisto.getcantidadelementos()>0){
        var proceso = colalisto.quitarelemento();
        var quantum = this.calcularquantum(cloncola,proceso.gettiempouso());
        //alert ("quantum "+quantum+" proceso "+proceso.getnombre()+", "+colalisto.getcantidadelementos());
        proceso.setquantum(quantum);
        colalist.agregarelemento(proceso);
        algoritmomultiple.actualizarfila(proceso,numerocola);
    }
    return colalist;
};

//Funcion usada para ver en toda la cola de listo cual es el del quantum mas corto
//para enviarlo a critico
this.getprocesoconquantummmascorto = function(colalisto){
    var quantumcorto = colalisto.getelementoposicion(0).getquantum();
    //var id  = colalisto.getelementoposicion(0).getidentificador();
    var id =0;
    for (var i =0;i<colalisto.getcantidadelementos();i++){
        var procesoit = colalisto.getelementoposicion(i);
        //alert("viendo quantums "+i+", "+id+", "+procesoit.getquantum()+", "+quantumcorto);
        if (procesoit.getquantum()<quantumcorto){
            id = i;
            quantumcorto = procesoit.getquantum();
        }
            //id = colalisto.getelementoposicion(i).getidentificador();
    }
    return id;
};

 //roundrobin.recibirproceso=function(nombr,tiempous,recursosnecesitad,cantidadrecurso){
 //    var nuevoproceso = new proceso(nombr,tiempous,recursosnecesitad,cantidadrecurso);
 //    roundrobin.procesos[roundrobin.cantidadprocesos]=nuevoproceso;
 //    roundrobin.cantidadprocesos++;
 //};
 
  //Funcion usada para ver en toda la cola de listo cual es el del tiempo mas corto
//para enviarlo a critico
this.getprocesocontiempomascorto = function(colalisto){
    var tiempocorto = parseInt(colalisto.getelementoposicion(0).gettiempouso());
    //var id  = colalisto.getelementoposicion(0).getidentificador();
    var id =0;
    for (var i =0;i<colalisto.getcantidadelementos();i++){
        var procesoit = colalisto.getelementoposicion(i);
        //alert("viendo quantums "+i+", "+id+", "+procesoit.getquantum()+", "+quantumcorto);
        if (parseInt(procesoit.gettiempouso())<tiempocorto){
            id = i;
            tiempocorto = procesoit.gettiempouso();
        }
            //id = colalisto.getelementoposicion(i).getidentificador();
    }
    return id;
};

//Funcion para saber si un proceso en critico se debe ir por alguien con tiempo
//mas corto
this.reisarsisacardecritico = function(colalisto, tiempoactualproceso){
    for (var i =0;i<colalisto.getcantidadelementos();i++){
        var procesoit = colalisto.getelementoposicion(i);
        //alert("viendo quantums "+i+", "+id+", "+procesoit.getquantum()+", "+quantumcorto);
        if (parseInt(procesoit.gettiempouso())<tiempoactualproceso){
            return true;
        }
            //id = colalisto.getelementoposicion(i).getidentificador();
    }
    return false;
};
 };