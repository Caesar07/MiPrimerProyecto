/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cpu = function () {
    var libre = true;
    var procesousado=[];
    var tiempoproceso = 0; //contador para llegar a 0 para procesar
    var procesoblanco=[];
    
    this.procesarunsegundo = function (){
                     tiempoproceso--;
    };
    
    this.revisardisponible = function(){
        if (procesousado===procesoblanco || tiempoproceso===0)
            return true;
        return false;
    };
    
    this.solicitarproceso = function () {
        return null;
    };
    
    this.removerproceso = function(){
        
    };
};

