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
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type='text/javascript' src='js/Concurrent.Thread.js'></script>
<script type='text/javascript' src='js/bootstrap.min.js'></script>
<link href="css/bootstrap.min.css" rel="stylesheet"/>
<link href="css/grid.css" rel="stylesheet"/>
<link href="css/style.css" rel="stylesheet"/>

<TITLE>Simulador Algoritmos de Planificación</TITLE>
      
</HEAD>
 
<BODY>
  
    HOLA A TODOS
 <?php
    session_start();
    require_once 'HTML/Table.php';

    $attrs = array('width' => '600');
    $table = new HTML_Table($attrs);
    $table->setAutoGrow(true);
    $table->setAutoFill('n/a');
    $table->setHeaderContents(0, 0, '');
    $table->setHeaderContents(0, 1, 'Surname');
    $table->setHeaderContents(0, 2, 'Name');
    $table->setHeaderContents(0, 3, 'Website');
    $table->setHeaderContents(0, 4, 'EMail');
    //$siprocesonuevo = $_POST['sinuevoproceso'];
    //if ($siprocesonuevo == '1'){
    //    $nuevoproceso = $_POST['nuevoproceso'];
        
    //}
    //$direccion = $_POST['direccion'];
 ?>
</BODY>
</HTML>