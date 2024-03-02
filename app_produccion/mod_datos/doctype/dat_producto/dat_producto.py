# Copyright (c) 2024, Gustavo Yancha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class dat_producto(Document):
	pass


@frappe.whitelist()
def getParametros() :
	sql = """ 
			SELECT * FROM tabprm_parametros 	
		"""
	return frappe.db.sql(sql, as_dict=True)