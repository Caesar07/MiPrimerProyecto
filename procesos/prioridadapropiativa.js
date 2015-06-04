/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.write("<script type='text/javascript' src='algoritmo.js'></script>");
document.write("<script type='text/javascript' src='proceso.js'></script>");
document.write("<script type='text/javascript' src='js/Concurrent.Thread.js'></script>");
document.write("<script type='text/javascript' src='colas.js'></script>");

var prioridadapropiativa = function(numero){
this.__proto__ = algoritmo;
algoritmo.inicializar(numero,true);
//algoritmo.apply(this,arguments);
var numerocpu = numero;
var i = 0;
var desempeño =0;
var procesos = []; // lista que poseera todos los procesos gestionados por la cpu
var cantidadprocesos = 0;
var terminados = new cola();
var estados = [];// lista en donde estaran todas las colas que usara la cpu
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
    //revisar Si lista Critico esta disponible o no
    if (listacritica.getcantidadelementos()===0){
        if (listalisto.getcantidadelementos()!==0){//ingreso proceso a critico
            var posicionprioridadmascorto = this.getprocesoconprioridadmascorto(listalisto);
            //alert("mi posicion mas corto "+posiciontiempomascorto+" "+listalisto.getelementoposicion(posiciontiempomascorto).getapropiacion()
            //        +" "+listalisto.getelementoposicion(posiciontiempomascorto).getidentificador());
            if (algoritmo.revisarrecursosdisponibless(listalisto.getelementoposicion(posicionprioridadmascorto))
                    || listalisto.getelementoposicion(posicionprioridadmascorto).getapropiacion()) {//revision disponibilidad de recursos
                var procesoacritico = listalisto.quitarelementoenubicacion(posicionprioridadmascorto);
                if (!procesoacritico.getapropiacion()){
                    algoritmo.utilizarrecursosdisponibless(procesoacritico);
                    procesoacritico.setapropiacion(true);
                }
                this.agregarobjeto(procesoacritico,0);
                algoritmo.ingresarprocesoentabla(0,procesoacritico,false);
                algoritmo.eliminarfilatabla(1,procesoacritico.getidentificador());
                document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =("entregando critico "+ i);
            }
            else{//no hay recursos disponibles
                //metodos necesaios para trasladar proceso de una cola a otra
                var procesoabloqueado = listalisto.quitarelementoenubicacion(posicionprioridadmascorto);
                this.agregarobjeto(procesoabloqueado,3);
                algoritmo.ingresarprocesoentabla(3,procesoabloqueado,false);
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
                //cambio logico
                elementoprocesando = listacritica.quitarelemento();
                elementoprocesando.reducirtiempouso();
                listacritica.agregarelemento(elementoprocesando);
                //cambio fisico
                algoritmo.actualizarfila(elementoprocesando,0);
            document.getElementById("tiempoprocesos"+(numerocpu)).innerHTML =( "procesando cpu #"+numerocpu+
                        " valores "+ i);
        }
    }
    
    // revisar si cola bloqueado esta ocupado para ver si se liberan procesos o no
    if (listabloqueado.getcantidadelementos()!==0){
        if (algoritmo.revisarrecursosdisponibless(listabloqueado.getelementoprimerocola())) {//revision disponibilidad de recursos
            var procesoalisto = listabloqueado.quitarelemento();
            this.agregarobjeto(procesoalisto,1);
            algoritmo.ingresarprocesoentabla(1,procesoalisto,false);
            algoritmo.eliminarfilatabla(3,procesoalisto.getidentificador());
        }
        else{
            var procesoabloqueado = listabloqueado.quitarelemento();
            algoritmo.eliminarfilatabla(3,procesoabloqueado.getidentificador());
            this.agregarobjeto(procesoabloqueado,3);
            algoritmo.ingresarprocesoentabla(3,procesoabloqueado,false);
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
            algoritmo.ingresarprocesoentabla(1,procesosuspendido,false);
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
 // Funcion llamada por jquery de interfaz para registrar nuevo proceso
this.ingresarproceso= function(identificador,nombreproceso,tiempoproceso,prioridadproceso,recursoconsumo,
cantidadconsumo,color){
    var nuevoproceso = new proceso(identificador,nombreproceso,tiempoproceso,prioridadproceso,recursoconsumo,
cantidadconsumo,color);
    procesos[cantidadprocesos] = nuevoproceso;
    cantidadprocesos++;
    //Se asume que todo recurso nueo entra en cola de listo
    this.agregarobjeto(nuevoproceso,1);
    algoritmo.ingresarprocesoentabla(1,nuevoproceso,false);
    //alert("en abstracto bien "+nuevoproceso.getnombre()+", "+nuevoproceso.gettiempouso()+", "+nuevoproceso.getrecursosnecesitados()
    //        +", "+nuevoproceso.getcantidadrecursos());                        
};


//Funcion usada para agregar a un proceso a cualqueir cola
this.agregarobjeto = function(elemento, lista){
    estados[lista].agregarelemento(elemento);
};

 //roundrobin.recibirproceso=function(nombr,tiempous,recursosnecesitad,cantidadrecurso){
 //    var nuevoproceso = new proceso(nombr,tiempous,recursosnecesitad,cantidadrecurso);
 //    roundrobin.procesos[roundrobin.cantidadprocesos]=nuevoproceso;
 //    roundrobin.cantidadprocesos++;
 //};
 
 //Funcion usada para ver en toda la cola de listo cual es el del tiempo mas corto
//para enviarlo a critico
this.getprocesoconprioridadmascorto = function(colalisto){
    var prioridadurgente = parseInt(colalisto.getelementoposicion(0).getprioridad());
    var tiempocorto = parseInt(colalisto.getelementoposicion(0).gettiempouso());
    //var id  = colalisto.getelementoposicion(0).getidentificador();
    var id =0;
    for (var i =0;i<colalisto.getcantidadelementos();i++){
        var procesoit = colalisto.getelementoposicion(i);
        //alert("viendo quantums "+i+", "+id+", "+procesoit.getquantum()+", "+quantumcorto);
        if (parseInt(procesoit.getprioridad())==prioridadurgente)
            if (parseInt(procesoit.gettiempouso())<tiempocorto){
            id = i;
            tiempocorto = procesoit.gettiempouso();
            prioridadurgente = procesoit.getprioridad();
        }
		if (parseInt(procesoit.getprioridad())<prioridadurgente){
            id = i;
		prioridadurgente = procesoit.getprioridad();}
            //id = colalisto.getelementoposicion(i).getidentificador();
    }
    return id;
};

//Funcion para saber si un proceso en critico se debe ir por alguien con tiempo
//mas corto
this.reisarsisacardecritico = function(colalisto, tiempoactualproceso,prioridadactual){
    for (var i =0;i<colalisto.getcantidadelementos();i++){
        var procesoit = colalisto.getelementoposicion(i);
        //alert("viendo quantums "+i+", "+id+", "+procesoit.getquantum()+", "+quantumcorto);
        if(parseInt(procesoit.getprioridad())<prioridadactual)
            return true;
        if (parseInt(procesoit.getprioridad())==prioridadactual && 
                parseInt(procesoit.gettiempouso())<tiempoactualproceso)
                return true;
            //id = colalisto.getelementoposicion(i).getidentificador();
    }
    return false;
};
 };
 