/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//importar document.write("<script type='text/javascript' src='js/bot.js'></script>");

function recursos () {
    var recurso = [];
    var listarecursos = [];
    var cantidadrecursos = 0;
    
    this.agregarrecurso = function (nombre,unidad,capacidad) {
        recurso = [nombre,unidad,capacidad,0];
        listarecursos[cantidadrecursos]=recurso;
        cantidadrecursos++;
        this.agregarrecursotabla();
    };
    this.consumirrecurso = function (nombre,cantidadconsumir) {
        for (i=0;i<cantidadrecursos;i++) {
            recurso = listarecursos[i];
            if (recurso[0]===nombre){
                    recurso[3]=parseInt(recurso[3]) + parseInt(cantidadconsumir);
                    recurso[2]=parseInt(recurso[2]) - parseInt(cantidadconsumir);
                    listarecursos[i]=recurso;
                    this.actualizardisponibilidadtabla(recurso);
                    listarecursos[i] = recurso;
            }
        }
    };
    
    this.liberarrecurso = function (nombre,cantidadliberar) {
        for (i=0;i<cantidadrecursos;i++) {
            recurso = listarecursos[i];
            if (recurso[0]===nombre){
                    recurso[3]= parseInt(recurso[3]) - parseInt(cantidadliberar);
                    recurso[2]= parseInt(recurso[2]) + parseInt(cantidadliberar);
                    //alert("liberado "+recurso[2]+" "+recurso[3]);
                    listarecursos[i]=recurso;
                    this.actualizardisponibilidadtabla(recurso);
                    listarecursos[i] = recurso;
            }
        }
    }
    this.getrecursos= function (){
        return listarecursos;
    };
    this.agregarrecursotabla=function(){
        //se asume que el ultimo registro de recurso loposee la tupla
        var tabla   = document.getElementById("tablarecursosdisponibles");
        var fila = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(recurso[j].toLocaleString());
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
        this.actualizarrecursosenregistroproceso();
    };
    this.actualizarrecursosenregistroproceso=function(){
        //funcoin usada para actualziar el elemento desplegable de regursos
        //al registrar unnuevo proceso
        var listadesplegable = document.getElementById("recursosdisponibles");
        var listadesplegable1 = document.getElementById("recursosdisponibles1"); //requerido para lista en modal
        var option = document.createElement("option");
        option.text = recurso[0];
        option.value = recurso[0];
        listadesplegable.add(option);
        listadesplegable1.add(option);
    };
    
    this.getunidad = function(nombre){
        for (var i=0;i<cantidadrecursos;i++){
            if (listarecursos[i][0]===nombre)
                return listarecursos[i][1];
        }
        return "null";
    };
    
    //reisa si hay disponibilidad sin hacer cambios en las cantidadesd de
    //los recursos disponibles
    this.getdisponibilidadrecurso = function (recurso,cantidad){
        for (var i=0;i<cantidadrecursos;i++){
            //alert("mirando "+recurso+" "+cantidad+" "+listarecursos[i][0]+" "+listarecursos[i][2]);
            if (listarecursos[i][0]==recurso)//no cambiar
                if (parseInt(listarecursos[i][2])>=parseInt(cantidad))
                    return true;
        }
        return false;
    };
    
    //cambio en los numeros de tablas cuando se ocupan o se liberan recursos
    this.actualizardisponibilidadtabla = function (recurso){
        var table = document.getElementById("tablarecursosdisponibles");
         for (var r = 1, n = table.rows.length; r < n; r++) {
            var nombreprocesobuscar = table.rows[r].cells[0].innerHTML;
            if (nombreprocesobuscar===recurso[0]){
                var filatabla = table.rows[r];
                for (var j = 0; j < 4; j++) {//actualizaremos toda la fila
                    var celda = filatabla.cells[j];
                    celda.innerHTML = recurso[j];
              }
                break;
            }
        }
    };
}