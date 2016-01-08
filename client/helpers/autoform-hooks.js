let hooksObject = {
  onSuccess: function (formType, result) {
    Bert.alert('Información guardada exitosamente', 'success');
  },
  onError: function (formType, error) {
    Bert.alert(`No se guardó la información, revise sus datos. ${error}`, 'warning');
  }
};

AutoForm.addHooks([
  'insertCialcoForm',
  'insertOrganizacionForm',
  'insertRedForm',
  'insertProductorForm',
  'insertMontoVentaForm',
  'insertMetasForm',
  'insertRespaldoForm'
], hooksObject);
