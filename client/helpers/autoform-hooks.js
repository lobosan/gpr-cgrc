let hooksObject = {
  onSuccess: function (formType, result) {
    Bert.alert('La información ha sido guardada exitosamente', 'success');
  },
  onError: function (formType, error) {
    Bert.alert( `No se guardó la información, revise sus datos. Error: ${error.reason}`, 'warning' );
  }
};

AutoForm.addHooks(['insertProductorForm'], hooksObject);
