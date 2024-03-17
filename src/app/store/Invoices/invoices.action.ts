import { createAction, props } from '@ngrx/store';
import { InvoiceModel, ListModel } from './invoices.model';

// fetch Invoicelist data
export const fetchInvoicelistData = createAction('[Data] Fetch Invoicelist Table Data');
export const fetchInvoicelistSuccess = createAction('[Data] Fetch Invoice list Success', props<{ Invoicelistdata: ListModel[] }>());
export const fetchInvoicelistFailure = createAction('[Data] Fetch Invoice list Failure', props<{ error: string }>());

// fetch Invoice data
export const fetchInvoiceData = createAction('[Data] Fetch Invoice Table Data');
export const fetchInvoiceSuccess = createAction('[Data] Fetch Invoice Data Success', props<{ Invoicedata: InvoiceModel[] }>());
export const fetchInvoiceFailure = createAction('[Data] Fetch Invoice Data Failure', props<{ error: string }>());

// Delete Data
export const deleteinvoice = createAction(
    '[Data] Delete invoiceData',
    props<{ id: string }>()
);
export const deleteinvoiceSuccess = createAction(
    '[Data] Delete invoiceData Success',
    props<{ id: string }>()
);
export const deleteinvoiceFailure = createAction(
    '[Data] Delete invoiceData Failure',
    props<{ error: string }>()
);