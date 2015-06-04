/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function proceso (id,nombr,tiempous,prioridadp,recursosnecesitad,cantidadrecurso,colorp) {
    var identificador;
    var nombre;
    var tiempouso;
    var recursosnecesitados;
    var cantidadrecursos;
    var quantum;
    var apropiacionrecursos;
    var recursosyaalimentados = []; //lista de booleanos que dicen si recurso de posicion x ya fue alimentado
    var prioridad;
    var color;
    var colaubicado;
    var envejecimiento;
    identificador = id;
    nombre=nombr;
    tiempouso=tiempous;
    recursosnecesitados=recursosnecesitad;
    cantidadrecursos=cantidadrecurso;
    prioridad=prioridadp;
    color = colorp;
    quantum = -1;
    envejecimiento = -1;
    apropiacionrecursos = false;
    for (var cantidadelementosrecurs=0;
    cantidadelementosrecurs<recursosnecesitad.length;cantidadelementosrecurs++){
        recursosyaalimentados.push(false);
    }

    this.getcolor = function(){ 
        return color;
    };
    this.getnombre = function (){
        return nombre;
    };
    this.gettiempouso = function (){
        return tiempouso;
    };
    this.getprioridad = function (){
        return prioridad;
    };
    this.getrecursosnecesitados = function (){
        return recursosnecesitados;
    };
    this.getrecursosalimentados = function(){
        return recursosyaalimentados;
    }
    this.getcantidadrecursos = function (){
        return cantidadrecursos;
    };
    this.getquantum = function (){
        return quantum;
    };
    this.setrecursoalimnetado = function(i,recursoalimentado){// cambia booleano de lista
        recursosyaalimentados[i] = recursoalimentado;
    }
    this.getidentificador = function (){
        return identificador;
    };
    this.getenvejecimiento = function (){
        return envejecimiento;
    };
    this.setqenvejecimiento = function(nuevoenvejecimiento){
        envejecimiento = nuevoenvejecimiento;
    };
    this.setquantum = function(nuevoquantum){
        quantum = nuevoquantum;
    };
    this.setprioridad = function(nuevaprioridad){
        prioridad = nuevaprioridad;
    };
    this.setcolaubicado = function(colaubi){
        colaubicado = colaubi;
    };
    this.setapropiacion = function(nuuevaapropiacion){
        apropiacionrecursos = nuuevaapropiacion;
    };
    this.getapropiacion = function(){
        return apropiacionrecursos;
    };
    this.getelementopornumero= function (i){
        switch (i){
            case 0:
                return this.getidentificador();
                break;
            case 1:
                return this.getnombre();
                break;
            case 2:
                return this.gettiempouso();
                break;
            case 3:
                return this.getprioridad();
                break;
            case 4:
                return this.getrecursosnecesitados();
                break;
            case 5:
                return this.getcantidadrecursos();
                break;
            case 6:
                if (quantum == -1)
                    return "";
                else
                    return this.getquantum();
                break;
            case 7:
                if (envejecimiento == -1)
                    return "";
                else
                    return this.getenvejecimiento();
                break;
        }
        return "null";
    };
    //usado para reducir el tiempo cuando se esta procesando
    this.reducirtiempouso = function(){
        tiempouso--;
        if (quantum>-1)
            quantum--;
    };
	
	this.dibujar = function(){
            var colorcola;
                   switch(colaubicado) {
                case 0:
                 colorcola = "#00FF00";

                    break;
                case 1:
                  colorcola = "#0000FF";

                    break;
                case 2:
                  colorcola = "#FF0000";

                    break;
                case 3:
                   colorcola = "#FF00FF";
                    break;
                case 4:
                   colorcola = "#FFFFFF";
                    break;
				case 5:
					colorcola = "#000000";
					break;
            }
            var p1 = document.getElementById(identificador);      
            var divx = document.createElement('div');
            divx.className = "diagrama";
            divx.style.width = "5px";
            divx.style.height = "20px";
            divx.style.backgroundColor = colorcola;
            divx.style.borderColor = "#FFFFFF";
            p1.appendChild(divx);
	};
	
			this.dibujarRetraso = function(t){
			
		for(i = 1;i<=t;i++){
			//alert("holar");
			this.dibujar(5);
			
		}	
				
			};
	
};
