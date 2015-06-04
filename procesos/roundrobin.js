/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.write("<script type='text/javascript' src='algoritmo.js'></script>");
document.write("<script type='text/javascript' src='proceso.js'></script>");
document.write("<script type='text/javascript' src='js/Concurrent.Thread.js'></script>");
document.write("<script type='text/javascript' src='colas.js'></script>");

var roundrobin = function(numero){
this.__proto__ = algoritmo;
algoritmo.inicializar(numero,true);
//algoritmo.apply(this,arguments);
var numerocpu = numero;
var i = 0;
var desempeño =0;
var procesos = []; // lista que poseera todos los procesos gestionados por la cpu
var cantidadprocesos = 0;
var estados = [];// lista en donde estaran todas las colas que usara la cpu
var terminados = new cola();
//nuemero al que pertenece la cpu
    for (var i =0; i<4;i++) {//0 para critico, 1 para listo, 2 para suspendido, 3 para bloquedado
        estados[i]= new cola(); //
    }
    
 this.getalogirtmoheredar = function(){
     return algoritmo;
 };
 this.getdesempeño = function(){
     return desempeño;
 };
 this.utilizarhilo=function(){
    algoritmo.setnumerocpuausar(numerocpu);
    var listacritica = estados[0];
    var listalisto = estados[1];
    var listasuspendido = estados[2];
    var listabloqueado = estados[3];
	algoritmo.gantt(estados[0],estados[1],estados[2],estados[3],terminados);
    var porcentajerend = algoritmo.revisarrendimientoalgoritmoenprocesador(
            listacritica.getcantidadelementos(),listalisto.getcantidadelementos(),
            listasuspendido.getcantidadelementos(),listabloqueado.getcantidadelementos());
    desempeño = porcentajerend*100;
    document.getElementById("rendimiento"+(numerocpu)).innerHTML =(
            "rendimiento del procesador "+(numerocpu)+" : "+desempeño+" %");
    //primero debe actualizar los quantums de los procesos
    listalisto = this.asignarquantumsatodalacola(listalisto,1);
    //revisar Si lista Critico esta disponible o no
    if (listacritica.getcantidadelementos()===0){
        if (listalisto.getcantidadelementos()!==0){//ingreso proceso a critico
            var posicionprocquantumcorto = this.getprocesoconquantummmascorto(listalisto);
            if (algoritmo.revisarrecursosdisponibless(listalisto.getelementoposicion(posicionprocquantumcorto))) {//revision disponibilidad de recursos
                //var procesoacritico = listalisto.quitarelemento();
                var procesoacritico = listalisto.quitarelementoenubicacion(posicionprocquantumcorto);
                algoritmo.utilizarrecursosdisponibless(procesoacritico);
                this.agregarobjeto(procesoacritico,0);
                algoritmo.ingresarprocesoentabla(0,procesoacritico,true);
                algoritmo.eliminarfilatabla(1,procesoacritico.getidentificador());
                document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("entregando critico "+ i);
            }
            else{//no hay recursos disponibles
                //metodos necesaios para trasladar proceso de una cola a otra
                var procesoabloqueado = listalisto.quitarelementoenubicacion(posicionprocquantumcorto);
                this.agregarobjeto(procesoabloqueado,3);
                algoritmo.ingresarprocesoentabla(3,procesoabloqueado,true);;
                algoritmo.eliminarfilatabla(1,procesoabloqueado.getidentificador());
                
                document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("falta de recursos "+ i);
            }
        }
        else{
            document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesador libre"+ i);
        }
    }
    else {//reduzco tiempo en critico
        var elementoprocesando = listacritica.getelementoprimerocola();
        if (elementoprocesando.gettiempouso()-1===0){//proceso a terminado
            var procesoterminado = listacritica.quitarelemento();
			terminados.agregarelemento(procesoterminado);
            algoritmo.eliminarfilatabla(0,procesoterminado.getidentificador());
            algoritmo.liberarrecursosdeproceso(procesoterminado);
        }
        else{
            if(elementoprocesando.getquantum()>1){//tiempo en procesador continua
                //cambio logico
                elementoprocesando = listacritica.quitarelemento();
                elementoprocesando.reducirtiempouso();
                listacritica.agregarelemento(elementoprocesando);
                //cambio fisico
                algoritmo.actualizarfila(elementoprocesando,0);

                document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesando cpu #"+numerocpu+
                        " valores "+ i);
            }
            else{//tiempo quantum termino por tanto proceso ira a suspendido
                //cambio logico, hay que tuaitar quantum y ponerle 3 segundos para estar en suspendido
                var procesoasuspendido = listacritica.quitarelemento();
                procesoasuspendido.setquantum(algoritmo.tiemposuspendido(procesoasuspendido.gettiempouso()));
                this.agregarobjeto(procesoasuspendido,2);
                //cambio fisico
                algoritmo.ingresarprocesoentabla(2,procesoasuspendido,true);
                algoritmo.eliminarfilatabla(0,procesoasuspendido.getidentificador());
                algoritmo.liberarrecursosdeproceso(procesoasuspendido);
            }
        }
    }
    
    // revisar si cola bloqueado esta ocupado para ver si se liberan procesos o no
    if (listabloqueado.getcantidadelementos()!==0){
        if (algoritmo.revisarrecursosdisponibless(listabloqueado.getelementoprimerocola())) {//revision disponibilidad de recursos
            var procesoalisto = listabloqueado.quitarelemento();
            this.agregarobjeto(procesoalisto,1);
            algoritmo.ingresarprocesoentabla(1,procesoalisto,true);
            algoritmo.eliminarfilatabla(3,procesoalisto.getidentificador());
        }
        else{
            var procesoabloqueado = listabloqueado.quitarelemento();
            algoritmo.eliminarfilatabla(3,procesoabloqueado.getidentificador());
            this.agregarobjeto(procesoabloqueado,3);
            algoritmo.ingresarprocesoentabla(3,procesoabloqueado,true);
        }
    }
    
    // revisar si cola suspendido esta ocupado para ver si se procesos o no
    if (listasuspendido.getcantidadelementos()!==0){
        if (listasuspendido.getelementoprimerocola().getquantum()>0) {//quantum guardara el tiempo en suspendido mientras este en esta cola
            var nuevoquantum = listasuspendido.getelementoprimerocola().getquantum()-1;
            listasuspendido.getelementoprimerocola().setquantum(nuevoquantum);
            algoritmo.actualizarfila(listasuspendido.getelementoprimerocola(),2);
        }
        else{
            var procesosuspendido = listasuspendido.quitarelemento();
            listalisto.agregarelemento(procesosuspendido);
            algoritmo.ingresarprocesoentabla(1,procesosuspendido,true);
            algoritmo.eliminarfilatabla(2,procesosuspendido.getidentificador());
            //alert("cantidad de elementos de listo "+listalisto.getcantidadelementos());
        }
    }
        this.actualizarestados(listacritica,listalisto,listasuspendido,listabloqueado);
        i+=1;
 };
 
 
 this.actualizarestados = function(listacritica,listalisto,listasuspendido,listabloqueado){
    estados[0] = listacritica;
    estados[1] = listalisto;
    estados[2] = listasuspendido;
    estados[3] = listabloqueado;
 };
 // Funcion llamada por jquery de interfaz para registrar nuevo recursp
this.ingresarproceso = function(identificador,nombreproceso,tiempoproceso,prioridadproceso,recursoconsumo,
cantidadconsumo,color){
    var nuevoproceso = new proceso(identificador,nombreproceso,tiempoproceso,prioridadproceso,recursoconsumo,
cantidadconsumo,color);
    procesos[cantidadprocesos] = nuevoproceso;
    cantidadprocesos++;
    //Se asume que todo recurso nueo entra en cola de listo
    this.agregarobjeto(nuevoproceso,1);
    algoritmo.ingresarprocesoentabla(1,nuevoproceso,true);
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
        algoritmo.actualizarfila(proceso,numerocola);
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
 };
 