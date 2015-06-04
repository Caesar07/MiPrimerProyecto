/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.write("<script type='text/javascript' src='proceso.js'></script>");
document.write("<script type='text/javascript' src='colas.js'></script>");
document.write("<script type='text/javascript' src='recursos.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.min.js'></script>");

//ABSTRACTO

var algoritmo = {};
algoritmo.numerocpu = 0;
algoritmo.nombreestados = ["Critico","Listo","Suspendido","Bloqueado"];
algoritmo.cantidadestados = 4; //cantidad de estados cricoco,listo,...
algoritmo.inicializar = function(numerocpu,siquantum){
    algoritmo.numerocpu = numerocpu;
    algoritmo.recursoscomputadora = new recursos();
    var body = document.getElementById("procesador"+algoritmo.numerocpu);
    for (var it=0;it<algoritmo.cantidadestados;it++){
        var parrafo = document.createElement('p');//Colocacion de titulos en lñas colas de cada procesador
        parrafo.innerHTML =("Cola de "+algoritmo.nombreestados[it]);
        body.appendChild(parrafo);
        algoritmo.creartablasgraficas(it,siquantum);
    }
    //alert("sopy abstarcto "+algoritmo.numerocpu);
};

algoritmo.creartablasgraficas = function(numerocola,siquantum){
    // Obtener la referencia del elemento body
  var body = document.getElementById("procesador"+algoritmo.numerocpu);
 
  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  tabla.id = ("procesador"+algoritmo.numerocpu+algoritmo.nombreestados[numerocola]);
  tabla.className = "table table-bordered col-md-8";
  //Crea los titulos
  var hilera = document.createElement("tr");
  hilera.className = "active";
  var celda = document.createElement("td");
  var textoCelda = document.createTextNode("ID");
  celda.appendChild(textoCelda);
  celda.className= "active";
  hilera.appendChild(celda);
  var celda = document.createElement("td");
  var textoCelda = document.createTextNode("Nombre del proceso");
  celda.appendChild(textoCelda);
  celda.className= "active";
  hilera.appendChild(celda);
  var celda = document.createElement("td");
  var textoCelda = document.createTextNode("Tiempo del proceso");
  celda.appendChild(textoCelda);
  celda.className= "active";
  hilera.appendChild(celda);
  var celda = document.createElement("td");
  var textoCelda = document.createTextNode("Prioridad del proceso");
  celda.appendChild(textoCelda);
  celda.className= "active";
  hilera.appendChild(celda);
  var celda = document.createElement("td");
  var textoCelda = document.createTextNode("Recurso del proceso");
  celda.appendChild(textoCelda);
  celda.className= "active";
  hilera.appendChild(celda);
  var celda = document.createElement("td");
  var textoCelda = document.createTextNode("Cantidad del recurso");
  celda.appendChild(textoCelda);
  celda.className= "active";
  hilera.appendChild(celda);
  if (siquantum){
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode("Tiempo en cola");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
  }
  tabla.appendChild(hilera);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
};

algoritmo.ingresarprocesoentabla = function(numerotabla,proceso,sitiempo){
    var tabla = document.getElementById("procesador"+algoritmo.numerocpu+
            algoritmo.nombreestados[numerotabla]);
    var hilera = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(proceso.getelementopornumero(j));
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
	var posicioninsertar =1;
	for (var r = 1, n = tabla.rows.length; r < n; r++) {
		if (sitiempo){
			var tiempo =  parseInt(tabla.rows[r].cells[2].innerHTML);
			//salert("c "+proceso.gettiempouso()+" "+tiempo);
			if (proceso.gettiempouso()<tiempo){
				break;
			}
		}
		else{
			var prioridad = parseInt(tabla.rows[r].cells[3].innerHTML);
			if (proceso.getprioridad()==prioridad){
                            var tiempo =  parseInt(tabla.rows[r].cells[2].innerHTML);
                            //salert("c "+proceso.gettiempouso()+" "+tiempo);
                            if (proceso.gettiempouso()<tiempo){
                                    break;
                            }
                        }
                        if (proceso.getprioridad()<prioridad){
				break;
			}
		}
		posicioninsertar++;
	}
	tabla.insertBefore(hilera, tabla.childNodes[posicioninsertar]); 
    //tabla.appendChild(hilera);
};





algoritmo.getnumeroprocesador = function(){
    alert("estoy en el procesador "+algoritmo.numerocpu);
};

algoritmo.setnumerocpuausar = function(nuevonumero){
    algoritmo.numerocpu = nuevonumero;
};

algoritmo.eliminarfilatabla = function(numerotabla,idprocesoborrar){
  var table = document.getElementById("procesador"+algoritmo.numerocpu+
            algoritmo.nombreestados[numerotabla]);
        for (var r = 1, n = table.rows.length; r < n; r++) {
            //for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            //    alert(table.rows[r].cells[c].innerHTML);
            //}
            var idproceso = table.rows[r].cells[0].innerHTML;
            if (idprocesoborrar==idproceso){
                table.deleteRow(r);
                break;
            }
        }  
};

algoritmo.actualizarfila = function(procesoactualizar,numerotabla){
    var table = document.getElementById("procesador"+algoritmo.numerocpu+
            algoritmo.nombreestados[numerotabla]);
         var idprocesoactualizar = procesoactualizar.getelementopornumero(0);
         for (var r = 1, n = table.rows.length; r < n; r++) {
            var idprocesobuscar = table.rows[r].cells[0].innerHTML;
            if (idprocesobuscar==idprocesoactualizar){
                var filatabla = table.rows[r];
                for (var j = 0; j < 7; j++) {//actualizaremos toda la fila
                    var celda = filatabla.cells[j];
                    celda.innerHTML = procesoactualizar.getelementopornumero(j);
              }
                break;
            }
        }
};
 
algoritmo.actualizartablacompleta = function(cola,numerotabla){
        var salir = false;
        var newcola = algoritmo.clonarobjeto(cola);
    var table = document.getElementById("procesador"+algoritmo.numerocpu+
            algoritmo.nombreestados[numerotabla]);
    for (var r = 1, n = table.rows.length; r < n && newcola.getcantidadelementos()>0; r++) {
        var filatabla = table.rows[r];
        var proceso = newcola.quitarelemento();
        for (var j = 0; j < 7; j++) {//actualizaremos toda la fila
            var celda = filatabla.cells[j];
            //alert ("actualizando "+proceso.getelementopornumero(j)+" en "+algoritmo.nombreestados[numerotabla]+" "+j);
            celda.innerHTML = proceso.getelementopornumero(j);
        }
        salir = true;
    }
    return salir;
};

algoritmo.agregarrecurso = function(nombrerecurso,unidadrecurso,capacidadrecurso){
    algoritmo.recursoscomputadora.agregarrecurso(nombrerecurso,unidadrecurso,capacidadrecurso);
};
algoritmo.getunidadrecurso = function(nombre){
    return algoritmo.recursoscomputadora.getunidad(nombre);
};

algoritmo.getrecursos = function(){
    return algoritmo.recursoscomputadora;
};

algoritmo.revisarrecursosdisponibless = function(proceso){
    var nombresrecursosrequeridos = proceso.getrecursosnecesitados();
    var cantidadrequerida = proceso.getcantidadrecursos();
    var recursosalimentadosproceso = proceso.getrecursosalimentados();
    for (var i=0;i<nombresrecursosrequeridos.length;i++){//revisa disponibilidad
        if (!recursosalimentadosproceso[i])
            if (!algoritmo.recursoscomputadora.getdisponibilidadrecurso(
                    nombresrecursosrequeridos[i],cantidadrequerida[i]))
                return false;
    }
    return true;
};

algoritmo.utilizarrecursosdisponibless = function(proceso){
    var nombresrecursosrequeridos = proceso.getrecursosnecesitados();
    var cantidadrequerida = proceso.getcantidadrecursos();
    for (var i=0;i<nombresrecursosrequeridos.length;i++){//si hay disponibilidad ocupa recursos
        proceso.setrecursoalimnetado(i,true);
        algoritmo.recursoscomputadora.consumirrecurso(nombresrecursosrequeridos[i],cantidadrequerida[i]);
    }
};

algoritmo.liberarrecursosdeproceso = function (proceso){
    var nombresrecursosrequeridos = proceso.getrecursosnecesitados();
    var cantidadrequerida = proceso.getcantidadrecursos();
    for (var i=0;i<nombresrecursosrequeridos.length;i++){//si hay disponibilidad ocupa recursos
        proceso.setrecursoalimnetado(i,false);
        algoritmo.recursoscomputadora.liberarrecurso(nombresrecursosrequeridos[i],cantidadrequerida[i]);
    }
};

algoritmo.clonarobjeto = function(obj){
    return jQuery.extend(true, {}, obj);
};

algoritmo.revisarrendimientoalgoritmoenprocesador = function(procesoscriticos,procesosenlisto,procesosensus,procesosenbloqu){
    if (procesoscriticos==0 &&procesosenbloqu==0 &&procesosenlisto==0 &&procesosensus==0)
        return 1;
    if (procesosenbloqu>procesosenlisto)
        return 0.1;
    if (procesoscriticos>procesosenlisto)
        return 1;
    if (procesoscriticos>0) procesoscriticos =Math.random()/2;
    if (procesosenlisto>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosenlisto;proc++){
            var p =Math.random()/2;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosenlisto =mayorporcentaje;
    }
    if (procesosensus>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosensus;proc++){
            var p =Math.random()/4;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosenlisto =mayorporcentaje;
    }
    if (procesosenbloqu>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosenbloqu;proc++){
            var p =Math.random()/4;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosenlisto =mayorporcentaje;
    }
    var resultado = (procesosenlisto+procesoscriticos)-(procesosenbloqu)-(procesosensus);
    if (resultado<0)
        return Math.random()/10;
    else
        return resultado;
};

algoritmo.gantt = function(listacritica,listalisto,listasuspendido,listabloqueado,terminados){
    //dibujar listaCritica
    if(listacritica.getcantidadelementos()!=0){
        for (var it = 0; it < listacritica.getcantidadelementos(); it++) {
           var pro = listacritica.getelementoposicion(it);
           pro.setcolaubicado(0);
           pro.dibujar();
        }
    }
    //dibujar listaListo
    if(listalisto.getcantidadelementos()!=0){
        for (var it = 0; it < listalisto.getcantidadelementos(); it++) {
           var pro = listalisto.getelementoposicion(it);
           pro.setcolaubicado(1);
           pro.dibujar();
        };
    }
    //dibujar listaSuspendido
    if(listasuspendido.getcantidadelementos()!=0){
        for (var it = 0; it < listasuspendido.getcantidadelementos(); it++) {
           var pro = listasuspendido.getelementoposicion(it);
           pro.setcolaubicado(2);
           pro.dibujar();
        };
    }                         
    //dibujar listaBloqueado
    if(listabloqueado.getcantidadelementos()!=0){
        for (var it = 0; it < listabloqueado.getcantidadelementos(); it++) {
           var pro = listabloqueado.getelementoposicion(it);
           pro.setcolaubicado(3);
           pro.dibujar();
        };
    }
	//dibujar todos los terminados
	if(terminados.getcantidadelementos()!=0){
        for (var it = 0; it < terminados.getcantidadelementos(); it++) {
           var pro = terminados.getelementoposicion(it);
           pro.setcolaubicado(4);
           pro.dibujar();
        };
    }
};

algoritmo.tiemposuspendido = function(tiempopreocesadosuspendido){
	if (tiempopreocesadosuspendido<=3)
		return 3;
	else
		return tiempopreocesadosuspendido%5+1;
}