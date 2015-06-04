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

var algoritmomultiple = {};
algoritmomultiple.numerocpu = 0;
algoritmomultiple.nombreestados = ["Critico","Prioridad1","Prioridad2","Prioridad3","Suspendido","Bloqueado"];
algoritmomultiple.cantidadestados = 6; //cantidad de estados cricoco,listo,...
algoritmomultiple.cantidadcolumnas =0;
algoritmomultiple.inicializar = function(numerocpu,siquantum,siretroalimentada){
    algoritmomultiple.numerocpu = numerocpu;
    if (siretroalimentada)
        algoritmomultiple.cantidadcolumnas = 8;
    else algoritmomultiple.cantidadcolumnas = 7;
    algoritmomultiple.recursoscomputadora = new recursos();
    var body = document.getElementById("procesador"+algoritmomultiple.numerocpu);
    for (var it=0;it<algoritmomultiple.cantidadestados;it++){
        var parrafo = document.createElement('p');//Colocacion de titulos en lñas colas de cada procesador
        parrafo.innerHTML =("Cola de "+algoritmomultiple.nombreestados[it]);
        body.appendChild(parrafo);
        algoritmomultiple.creartablasgraficas(it,siquantum,siretroalimentada);
    }
   // alert("sopy abstarcto "+algoritmomultiple.numerocpu);
};

algoritmomultiple.creartablasgraficas = function(numerocola,siquantum,siretroalimentada){
    // Obtener la referencia del elemento body
  var body = document.getElementById("procesador"+algoritmomultiple.numerocpu);
 
  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  tabla.id = ("procesador"+algoritmomultiple.numerocpu+algoritmomultiple.nombreestados[numerocola]);
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
    celda.className= "active";
    hilera.appendChild(celda);
  }
  if (siretroalimentada){
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode("envejecimiento");
    celda.appendChild(textoCelda);
    celda.className= "active";
    hilera.appendChild(celda);
  }
  tabla.appendChild(hilera);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
};

algoritmomultiple.ingresarprocesoentabla = function(numerotabla,proceso,sitiempo,sififo){
    var tabla = document.getElementById("procesador"+algoritmomultiple.numerocpu+
            algoritmomultiple.nombreestados[numerotabla]);
    var hilera = document.createElement("tr");
    for (var j = 0; j < algoritmomultiple.cantidadcolumnas; j++) {
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
	if (sififo){
		tabla.appendChild(hilera);
		return 0;
	}
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





algoritmomultiple.getnumeroprocesador = function(){
    alert("estoy en el procesador "+algoritmomultiple.numerocpu);
};

algoritmomultiple.setnumerocpuausar = function(nuevonumero){
    algoritmomultiple.numerocpu = nuevonumero;
};

algoritmomultiple.eliminarfilatabla = function(numerotabla,idprocesoborrar){
  var table = document.getElementById("procesador"+algoritmomultiple.numerocpu+
            algoritmomultiple.nombreestados[numerotabla]);
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

algoritmomultiple.actualizarfila = function(procesoactualizar,numerotabla){
    var table = document.getElementById("procesador"+algoritmomultiple.numerocpu+
            algoritmomultiple.nombreestados[numerotabla]);
         var idprocesoactualizar = procesoactualizar.getelementopornumero(0);
         for (var r = 1, n = table.rows.length; r < n; r++) {
            var idprocesobuscar = table.rows[r].cells[0].innerHTML;
            if (idprocesobuscar==idprocesoactualizar){
                var filatabla = table.rows[r];
                for (var j = 0; j < algoritmomultiple.cantidadcolumnas; j++) {//actualizaremos toda la fila
                    var celda = filatabla.cells[j];
                    celda.innerHTML = procesoactualizar.getelementopornumero(j);
              }
                break;
            }
        }
};
 
algoritmomultiple.actualizartablacompleta = function(cola,numerotabla){
        var salir = false;
        var newcola = algoritmomultiple.clonarobjeto(cola);
    var table = document.getElementById("procesador"+algoritmomultiple.numerocpu+
            algoritmomultiple.nombreestados[numerotabla]);
    for (var r = 1, n = table.rows.length; r < n && newcola.getcantidadelementos()>0; r++) {
        var filatabla = table.rows[r];
        var proceso = newcola.quitarelemento();
        for (var j = 0; j < algoritmomultiple.cantidadcolumnas; j++) {//actualizaremos toda la fila
            var celda = filatabla.cells[j];
            //alert ("actualizando "+proceso.getelementopornumero(j)+" en "+algoritmo.nombreestados[numerotabla]+" "+j);
            celda.innerHTML = proceso.getelementopornumero(j);
        }
        salir = true;
    }
    return salir;
};

algoritmomultiple.agregarrecurso = function(nombrerecurso,unidadrecurso,capacidadrecurso){
    algoritmomultiple.recursoscomputadora.agregarrecurso(nombrerecurso,unidadrecurso,capacidadrecurso);
};
algoritmomultiple.getunidadrecurso = function(nombre){
    return algoritmomultiple.recursoscomputadora.getunidad(nombre);
};

algoritmomultiple.getrecursos = function(){
    return algoritmomultiple.recursoscomputadora;
};

algoritmomultiple.revisarrecursosdisponibless = function(proceso){
    var nombresrecursosrequeridos = proceso.getrecursosnecesitados();
    var cantidadrequerida = proceso.getcantidadrecursos();
    var recursosalimentadosproceso = proceso.getrecursosalimentados();
    for (var i=0;i<nombresrecursosrequeridos.length;i++){//revisa disponibilidad
        if (!recursosalimentadosproceso[i])
            if (!algoritmomultiple.recursoscomputadora.getdisponibilidadrecurso(
                    nombresrecursosrequeridos[i],cantidadrequerida[i]))
                return false;
    }
    return true;
};

algoritmomultiple.utilizarrecursosdisponibless = function(proceso){
    var nombresrecursosrequeridos = proceso.getrecursosnecesitados();
    var cantidadrequerida = proceso.getcantidadrecursos();
    for (var i=0;i<nombresrecursosrequeridos.length;i++){//si hay disponibilidad ocupa recursos
        proceso.setrecursoalimnetado(i,true);
        algoritmomultiple.recursoscomputadora.consumirrecurso(nombresrecursosrequeridos[i],cantidadrequerida[i]);
    }
};

algoritmomultiple.liberarrecursosdeproceso = function (proceso){
    var nombresrecursosrequeridos = proceso.getrecursosnecesitados();
    var cantidadrequerida = proceso.getcantidadrecursos();
    for (var i=0;i<nombresrecursosrequeridos.length;i++){//si hay disponibilidad ocupa recursos
        proceso.setrecursoalimnetado(i,false);
        algoritmomultiple.recursoscomputadora.liberarrecurso(nombresrecursosrequeridos[i],cantidadrequerida[i]);
    }
};

algoritmomultiple.clonarobjeto = function(obj){
    return jQuery.extend(true, {}, obj);
};

algoritmomultiple.revisarrendimientoalgoritmoenprocesador = function(procesoscriticos,
procesosenlisto1,procesosenlisto2,procesosenlisto3,procesosensus,procesosenbloqu){
    if (procesoscriticos==0 &&procesosenbloqu==0 &&procesosenlisto1==0
            &&procesosenlisto2==0&&procesosenlisto3==0&&procesosensus==0)
        return 1;
    if (procesosenbloqu>procesosenlisto1 || 
            procesosenbloqu>procesosenlisto2 || procesosenbloqu>procesosenlisto3)
        return 0.1;
    if (procesoscriticos>procesosenlisto1 || 
            procesoscriticos>procesosenlisto2 || procesoscriticos>procesosenlisto3)
        return 1;
    if (procesoscriticos>0) procesoscriticos =Math.random()/2;
    if (procesosenlisto1>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosenlisto1;proc++){
            var p =Math.random()/6;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosenlisto1 =mayorporcentaje;
    }
    if (procesosenlisto2>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosenlisto2;proc++){
            var p =Math.random()/6;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosenlisto2 =mayorporcentaje;
    }
    if (procesosenlisto3>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosenlisto3;proc++){
            var p =Math.random()/6;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosenlisto3 =mayorporcentaje;
    }
    if (procesosensus>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosensus;proc++){
            var p =Math.random()/4;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosensus =mayorporcentaje;
    }
    if (procesosenbloqu>0){
        var mayorporcentaje = 0;
        for (var proc=0;proc<procesosenbloqu;proc++){
            var p =Math.random()/4;
            if(mayorporcentaje<p)
                mayorporcentaje = p; 
        }
        procesosenbloqu =mayorporcentaje;
    }
    var resultado = (procesosenlisto1+procesosenlisto2+procesosenlisto3+procesoscriticos)-(procesosenbloqu)-(procesosensus);
    if (resultado<0)
        return Math.random()/10;
    else
        return resultado;
};

algoritmomultiple.gantt = function(listacritica,listalisto1,listalisto2,listalisto3,listasuspendido,listabloqueado,terminados){
    //dibujar listaCritica
    if(listacritica.getcantidadelementos()!=0){
        for (var it = 0; it < listacritica.getcantidadelementos(); it++) {
           var pro = listacritica.getelementoposicion(it);
           pro.setcolaubicado(0);
           pro.dibujar();
        }
    }
    //dibujar listaListo
    if(listalisto1.getcantidadelementos()!=0){
        for (var it = 0; it < listalisto1.getcantidadelementos(); it++) {
           var pro = listalisto1.getelementoposicion(it);
           pro.setcolaubicado(1);
           pro.dibujar();
        };
    }
    if(listalisto2.getcantidadelementos()!=0){
        for (var it = 0; it < listalisto2.getcantidadelementos(); it++) {
           var pro = listalisto2.getelementoposicion(it);
           pro.setcolaubicado(1);
           pro.dibujar();
        };
    }
    if(listalisto3.getcantidadelementos()!=0){
        for (var it = 0; it < listalisto3.getcantidadelementos(); it++) {
           var pro = listalisto3.getelementoposicion(it);
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

algoritmomultiple.tiemposuspendido = function(tiempopreocesadosuspendido){
	if (tiempopreocesadosuspendido<=3)
		return 3;
	else
		return tiempopreocesadosuspendido%5+1;
}

