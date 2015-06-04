/*
 * SimpleModal Basic Modal Dialog
 * http://simplemodal.com
 *
 * Copyright (c) 2013 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */



jQuery(function ($) {
	// Load dialog on page load
//	$('#basic-modal-content').modal();

	// Load dialog on click
	$('.accion1').click(function (e) {
		$('#basic-modal-content').modal('show');

		return false;
	});
	$('#btncamboproceso').click(function (e) {
            //
            
            //que termine el modal y empieze el modal con id a continuacion
            $('#basic-modal-content1').modal('show');
            return false;
	});
});