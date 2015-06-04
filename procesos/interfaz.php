<HTML>

  <HEAD>
    <meta charset="utf-8">
    <script type='text/javascript' src='roundrobin.js'></script>
    <script type='text/javascript' src='sjf.js'></script>
    <script type='text/javascript' src='srtf.js'></script>
    <script type='text/javascript' src='colasmultiplesnormales.js'></script>
    <script type='text/javascript' src='colasmultiplesretroalimentadas.js'></script>
    <script type='text/javascript' src='prioridadapropiativa.js'></script>
    <script type='text/javascript' src='prioridadnoapropiativo.js'></script>
    <script type='text/javascript' src='recursos.js'></script>
    <!-- <script type="text/javascript" src="js/jquery.js"></script> -->
    <!-- <script type='text/javascript' src='js/jquery.simplemodal.js'></script>
    <script type='text/javascript' src='js/basic.js'></script> -->
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type='text/javascript' src='js/Concurrent.Thread.js'></script>
    <script type='text/javascript' src='js/bootstrap.min.js'></script>
    <link href="css/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/grid.css" rel="stylesheet"/>
    <link href="css/style.css" rel="stylesheet"/>
    <!-- Page styles copia -->
    <!-- <link type='text/css' href='css/demo.css' rel='stylesheet' media='screen' /> -->

    <!-- Contact Form CSS files copia -->
    <!-- <link type='text/css' href='css/basic.css' rel='stylesheet' media='screen' /> -->
    <TITLE>Simulador Algoritmos de Planificación</TITLE>
    <script type = "text/javascript">

    $(document).ready(function() {
      $("#pausar").prop( "disabled", true);
      $("#btnClickregistrar").prop( "disabled", true);
      $("#btnClickregistrarProceso").prop( "disabled", true);

    });
    //var recursoscomputadora = new recursos();
    var recursossleeccionados = [];
    var algoritmos=[];
    var procesosregistrados = [];
    var cantidadprocesadores = 0;
    var identificadorproceso = 0;
    var algoritmoausar = -1;
    var idprocesoi =-1;
    var procesadori = -1;
    var estado =true;// se usa para el estado del hilo
    function elegiralgoritmo(){
      iniciarprocesadores(document.getElementById("opcion").value);
      $('#menu').fadeOut('fast');
      $("#pausar").prop( "disabled", false);
      $("#btnClickregistrar").prop( "disabled", false);
      $("#btnClickregistrarProceso").prop( "disabled", false);
    }
    </script>

    <Script type = "text/javascript">
    // var cpus = prompt("ingrese cuantas CPUS quiere", "1");
    </Script>
    </HEAD>

    <BODY>

    <div id="menu" class="container center-block row" >
    <div class = " col-md-8" >
    <p>Ingrese que algoritmo desea utilizar</p>
    <select id="opcion"  class="form-control">
    <option value="0">Round Robin</option>
    <option value="1">SJF</option>
    <option value="2">SRTF</option>
    <option value="3">Prioridad Apropiativa</option>
    <option value="4">Prioridad No Apropiativa</option>
    <option value="5">Colas multiples normales</option>
    <option value="6">Colas multiples Retroalimentadas</option>
    </select>
    <input  type="submit" onclick="elegiralgoritmo()" class="btn btn-default">
    </div>
    </div>
    <div class="container row center-block ">

    <div class="center-block col-md-4 col-md-height col-full-height">
    <p>Nombre de nuevo recurso <input type="text" id="nombrenuevorecurso" class="form-control"/></p>
    <p>Unidad: <input type="text" id="unidadnuevorecurso" class="form-control" /> </p>
    <p> capacidad: <input type="text" id="capacidadnuevorecurso" class="form-control" /> </p>
    <p> <input type="button" id="btnClickregistrar" value= "Crear Recurso"  class="btn btn-default"/></p>
    <p><input type="button" id="pausar" value= "Pausar"  class="btn btn-warning"  /></p>
    <p><input type="button" value="Mostrar Controlador" data-toggle="modal" data-target="#myModal"class="btn btn-primary"/></p>
    </div>

    <div class="center-block col-md-4 col-md-height col-full-height">
    <p>Nombre de nuevo proceso <input type="text" id="nombrenuevoproceso" class="form-control" /></p>
    <p>Procesador <select id="procesadoresdisponibles"></select></p>
    <p>Tiempo de ejecución <input type="text" id="tiempoproceso" class="form-control" value="1"/></p>
    <p>Prioridad <select id="prioridadproceso" class="form-control">
    <option value="1">1</option><option value="2">2</option><option value="3">3</option>
    </select></p>
    <p>Recurso <select id="recursosdisponibles" class="form-control" multiple></select></p>
    <p><input type="button" id="btnClickregistrarProceso" value= "Crear Proceso"  class="btn btn-success" /></p>
    </div>

    <script  type = "text/javascript">
    function entregarprocesadoresaprocesos(){
      var listadesplegable = document.getElementById("procesadoresdisponibles");
      for (var i =0;i<cantidadprocesadores;i++){
        var option = document.createElement("option");
        option.text = i;
        option.value =i;
        listadesplegable.add(option);
      }
    }
    </script>

  </div>
  <script>

  function getRandomColor() {//codigo obtenido de http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  $('#pausar').click(function(){
    estado = !estado;
  });

  jQuery('#btnClickregistrar').click(function(){
    var nombrerecurso = document.getElementById("nombrenuevorecurso").value;
    var unidadrecurso = document.getElementById("unidadnuevorecurso").value;
    var capacidadrecurso = document.getElementById("capacidadnuevorecurso").value;
    algoritmos[0].getalogirtmoheredar().agregarrecurso(nombrerecurso,unidadrecurso,capacidadrecurso);
  });



  jQuery('#btnClickregistrarProceso').click(function(){
    var nombreproceso = document.getElementById("nombrenuevoproceso").value;
    var numeroprocesador = document.getElementById("procesadoresdisponibles").value;
    var tiempoproceso = document.getElementById("tiempoproceso").value;
    var prioridadproceso = document.getElementById("prioridadproceso").value;
    var colorx= getRandomColor();
    var cantidadconsumo = [];
    for (var i =0; i<recursossleeccionados.length;i++){
      var algoritmoabstracto = algoritmos[0].getalogirtmoheredar();
      var unidad = algoritmoabstracto.getunidadrecurso(recursossleeccionados[i]);
      //var unidad = 0;
      cantidadconsumo[i] = prompt("ingrese cuantos(as) "+unidad+ " quiere para "+recursossleeccionados[i], "0");
    }
    algoritmos[numeroprocesador].setnumerocpuausar(numeroprocesador);
    algoritmos[numeroprocesador].ingresarproceso(identificadorproceso,nombreproceso,tiempoproceso
      ,prioridadproceso,recursossleeccionados,cantidadconsumo,colorx);//modificado en RR
      //crear la fila para el ganntt de cada proceso


      var listanuevoproceso = [numeroprocesador,nombreproceso,recursossleeccionados,cantidadconsumo];
      agregaraccionprocesotabla(identificadorproceso,listanuevoproceso);

      var p1 = document.getElementById("listaPr"+numeroprocesador);
      var fila = document.createElement('tr');
      var item = document.createElement('td');
      var itemp = document.createElement('td');
      var itemx = document.createElement('td');

      //  var divx = document.createElement('div');
      var txt = document.createTextNode(nombreproceso);
      var txtp = document.createTextNode(prioridadproceso);
      //divx.style.backgroundColor = colorx;
      //divx.style.borderColor = "#FFFFFF";
      item.appendChild(txt);
      itemp.appendChild(txtp);
      //itemx.appendChild(divx);
      itemx.id= identificadorproceso;
      fila.appendChild(item);
      fila.appendChild(itemp);
      fila.appendChild(itemx);
      p1.appendChild(fila);
      //crear nuevo td con su id
      identificadorproceso++;
      algoritmos[numeroprocesador].dibujarRetraso(algoritmos[numeroprocesador].getultimoprocesocreado());
    });
    jQuery('#recursosdisponibles').click(function(){//Encerrar en un array todos os recursos seleccionados
      recursossleeccionados = $( "#recursosdisponibles" ).val() || [];
    });
    </script>

    <DIV  class="container center-block row" >
      <div class="col-md-8">
        <form name="formulariorecursos" method="post" action="" >
          <table id="tablarecursosdisponibles"  class="col-md-6 table table-bordered">
            <tr class="active">
              <td><strong>recurso</strong></td>
              <td><strong>unidad</strong></td>
              <td><strong>capacidad</strong></td>
              <td><strong>usado</strong></td>
            </tr>
          </table>
        </form>
      </div>
    </DIV>

    <DIV id ="procesadores" class="container">
      <div>
        <p id ="renditotal" class= "row col-md-8 center-block">Rendimiento total : </p>
      </div>
    </DIV>
    <script>
    //existe un div por procesador llamad procesadori
    function iniciarprocesadores(algoritmoelegido){
      cantidadprocesadores = 3;
      entregarprocesadoresaprocesos();
      for (var i=0;i<cantidadprocesadores;i++){
        //var i =0;
        var newdiv = document.createElement('procesador'+i);
        newdiv.id =('procesador'+i);
        newdiv.className = "row col-md-8 center-block";
        var parrafo = document.createElement('p');
        parrafo.id=('tiempoprocesos'+i);
        // parrafo.className = "active";
        newdiv.appendChild(parrafo);
        document.getElementById("procesadores").appendChild(newdiv);

        var divrendimiento = document.createElement('rendimiento'+i);
        divrendimiento.id =('rendimiento'+i);
        divrendimiento.className = "row col-md-8 center-block";
        var parrafor = document.createElement('p');
        parrafor.id=('rendimiento '+i);
        divrendimiento.appendChild(parrafor);
        document.getElementById("procesadores").appendChild(divrendimiento);

        var algoritmo;
        switch(parseInt(algoritmoelegido)){
          case 0: algoritmo = new roundrobin(i); break;
          case 1: algoritmo = new sjf(i); break;
          case 2: algoritmo = new srtf(i); break;
          case 3: algoritmo = new prioridadapropiativa(i); break;
          case 4: algoritmo = new prioridadnoapropiativo(i); break;
          case 5: algoritmo = new colasmultiplesnormales(i); break;
          case 6: algoritmo = new colasmultiplesretroalimentadas(i); break;
        }
        algoritmos[i] = algoritmo;
        //newdiv.innerHTML = "<br><input type='text' name='dia_"+contador+"'>";
        //document.getElementById("procesadores").appendChild(newdiv);
        algoritmo.utilizarhilo();
        //algoritmo.darcpus();
      }
    }

    //un hilo para las tres cpu
    Concurrent.Thread.create (function () {
      var procesoblanco=[];
      while (1) {
        if(estado){
          //codigo de algoritmo por cada segundo
          Concurrent.Thread.sleep(1000);
          var rendtotal = 0;
          for (var a=0;a<cantidadprocesadores;a++){
            algoritmos[a].utilizarhilo();
            rendtotal += algoritmos[a].getdesempeño();
          }
          if (cantidadprocesadores>0)
          rendtotal = rendtotal/cantidadprocesadores;
          document.getElementById("renditotal").innerHTML =(
            "rendimiento del total : "+rendtotal+" %");
          }
        }});
        this.agregaraccionprocesotabla=function(identificadorproceso,nuevoproceso){
          //importante
          var newprocess = [];
          newprocess.push(identificadorproceso);
          for(var j = 0; j < 4; j++) {
            newprocess.push(nuevoproceso[j]);
          }
          var listadesplegable = document.getElementById("procesosregistrados");
          var option = document.createElement("option");
          option.text = newprocess[1];
          option.value = newprocess[1];
          listadesplegable.add(option);
          procesosregistrados.push(newprocess);//importante
          alert(procesosregistrados);
          //importante
          //necesario para crear botones de controles por proceso
          /**
          var tabla   = document.getElementById("tablaaccionprocesos");
          var fila = document.createElement("tr");
          for (var j = 0; j < 4; j++) {
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(nuevoproceso[j].toLocaleString());
          celda.appendChild(textoCelda);
          fila.appendChild(celda);
        }
        var celda = document.createElement("td");
        celda.id='basic-modal';
        var button = document.createElement("input");
        button.type = "button";
        button.name = "basic";
        button.id = "basic";
        button.value = "Agregar nuevo recurso";
        button.class="basic";
        button.onclick =function(){
        agregarrecursonuevoprocesoviejo(identificadorproceso,nuevoproceso[0]);
      };
      celda.appendChild(button);
      fila.appendChild(celda);
      tabla.appendChild(fila);
      **/
    };
    this.agregarrecursonuevoprocesoviejo=function(idproceso,procesador){
      alert("amos bien "+idproceso+" "+procesador);
    };
    </script>
    <div id="gantt" class="container center-block row ">
      <div id="p0">


        <div class="col-md-8">
          <table id="listaPr0" class=" col-md-2 table table-bordered">
            <tr class="active">
              <td><strong>Proceso</strong></td>
              <td><strong>Prioridad</strong></td>
              <td><strong>Gantt</strong></td>
            </tr>
          </table>
        </div>

      </div>
      <div id="p1">
        <div class="col-md-8">
          <table id="listaPr1" class=" col-md-2 table table-bordered">
            <tr class="active">
              <td><strong>Proceso</strong></td>
              <td><strong>Prioridad</strong></td>
              <td><strong>Gantt</strong></td>
            </tr>
          </table>
        </div>

      </div>
      <div id="p2" >

        <div class="col-md-8">
          <table id="listaPr2" class=" col-md-2 table table-bordered">
            <tr class="active">
              <td><strong>Proceso</strong></td>
              <td><strong>Prioridad</strong></td>
              <td><strong>Gantt</strong></td>
            </tr>
          </table>
        </div>


      </div>


    </div>

    <DIV  class="container center-block row" >
      <div class="col-md-8">
        <form name="formularioaccionprocesos"  method="post" action="" >
          <table id="tablaaccionprocesos"  class="col-md-6 table table-bordered">
            <tr class="active">
              <td><strong>Procesador</strong></td>
              <td><strong>proceso</strong></td>
              <td><strong>recursos</strong></td>
              <td><strong>capacidad</strong></td>
              <td><strong>accion</strong></td>
            </tr>
          </table>
        </form>
      </div>
    </DIV>


    <!-- modal content -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal-label" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3 class="modal-title">Lista de procesos disponibles</h3>
      </div>

      <div class="modal-body">
        <p>Proceso: <select id="procesosregistrados" class="form-control"></select></p>
        <p>Recursos: <select id="recursosdisponibles1" class="form-control" multiple></select></p>

      </div>

      <div class="modal-footer">
        <p><input type="button" id="btncamboproceso" value= "Siguiente"  class="btn btn-success" /></p>
      </div>
    </div>
    </div>
    </div>


  </BODY>

</HTML>
