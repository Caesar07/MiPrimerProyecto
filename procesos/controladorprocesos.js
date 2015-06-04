/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

this.agregarrecursotabla=function(nuevoproceso){
        //se asume que el ultimo registro de recurso loposee la tupla
        var tabla   = document.getElementById("formularioaccionprocesos");
        var fila = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(nuevoproceso[j].toLocaleString());
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
        }
        var celda = document.createElement("td");
        var boton = document.createElement("button");
        celda.appendChild(boton);
        fila.appendChild(celda);
        tabla.appendChild(fila);
        this.actualizarrecursosenregistroproceso();
    };
