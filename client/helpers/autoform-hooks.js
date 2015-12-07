let hooksObject = {
  onSuccess: function (formType, result) {
    Bert.alert('La información ha sido guardada exitosamente', 'success');
  },
  onError: function (formType, error) {
    console.log(error);
    Bert.alert( `No se guardó la información, revise sus datos. ${error}`, 'warning' );
  }
};

AutoForm.addHooks(['insertProductorForm'], hooksObject);
