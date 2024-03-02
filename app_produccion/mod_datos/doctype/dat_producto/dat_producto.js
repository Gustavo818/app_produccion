// Copyright (c) 2024, Gustavo Yancha and contributors
// For license information, please see license.txt


frappe.ui.form.on("dat_producto", {
	refresh(frm) {
		getConsultaParametros1Registro(frm)
	},
	prod_aplicariva(frm)
	{
		AplicarIva(frm)
	},
	prod_costounitario(frm)
	{
		AplicarIva(frm)
	},
});

function AplicarIva(frm){
	let prod_valoriva = 0 ;
	let prod_costototal = frm.doc.prod_costounitario ;

	if (frm.doc.prod_aplicariva){
		prod_valoriva = frm.doc.prod_costounitario * frm.doc.prod_aplicariva / 100;
		prod_costototal = frm.doc.prod_costounitario + prod_valoriva;
	}
	
	frm.doc.prod_valoriva =  prod_valoriva ;
	frm.doc.prod_costototal = prod_costototal ;
		
	// frm.doc.valor_bono	= frm.doc.valor_capital * frm.doc.valor_porcentaje / 100 ;
	refresh_field("prod_valoriva");
	refresh_field("prod_costototal");	
}

function getConsultaParametros1Registro(frm){
	let porcentajeiva = 0;
	frappe.call({
			method: "app_produccion.mod_datos.doctype.dat_producto.dat_producto.getParametros", 
			freeze: true
		}).done((r) => {
			let porcentajeiva = r.message[0].porcentajeiva;	
			console.log("Registrado %iva: " +  frm.doc.prod_procentajeiva );	
			if (frm.doc.prod_procentajeiva!==porcentajeiva){

				if (frm.doc.prod_procentajeiva>0){
					frappe.msgprint("Porcentage IVA [ " + frm.doc.prod_procentajeiva + " ], se ha actualizado a : [ " + porcentajeiva + " ], favor verificar PRECIOS")
				}

				console.log("Actualizado : [" + porcentajeiva + "]");
				frm.doc.prod_procentajeiva = porcentajeiva;
				refresh_field("prod_procentajeiva");
				// frappe.throw("Actualizado : [" + porcentajeiva + "]")
				
			} else {
				console.log("no se actualizo [porcentajeiva]");
			}
			
		})	
	
	
}

// No usado
function getConsultaParametros_RecorreTabla_TmpTmp(frm){
	let iva = 0;
	frappe.call({
			method: "app_produccion.mod_datos.doctype.dat_producto.dat_producto.getParametros", 
			freeze: true
		}).done((r) => {
			let consultaParametros = r.message
			// console.log("consultaParametros")
			// console.log(consultaParametros)
			$.each(consultaParametros, function(_i, e){
				iva= e.porcentajeiva ;
 			})
			console.log("iva");
			console.log(iva);		
			frm.doc.prod_procentajeiva = iva;
			refresh_field("prod_procentajeiva");
		})	
	
	
}
