/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var cola = function(){
    var elementos = [];
    var cantidadElemento = 0;
 
    this.agregarelemento=function(elemento){
        elementos.push(elemento);
        cantidadElemento++;
    };

    this.quitarelemento=function(){
        if (elementos!==[]){
            var elemento = elementos[0];
            elementos.shift();
            cantidadElemento--;
            return elemento;
        }
        return null;
    };
    
    this.quitarelementoenubicacion=function(ubicacion){
        var elemento = elementos[ubicacion];
        elementos.splice(ubicacion, 1);
        cantidadElemento--;
        return elemento;
    };
    
    this.getcantidadelementos=function(){
        return cantidadElemento;
    };
    
    this.getelementoprimerocola=function(){
        if (elementos!==[]){
            var elemento = elementos[0];
            return elemento;
        }
        return null;
    };
    
    this.getelementoposicion = function(i){
        return elementos[i];
    };
 };

