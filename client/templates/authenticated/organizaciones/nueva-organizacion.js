Template.nuevaOrganizacion.onCreated(() => {
  Template.instance().subscribe('dpa');
  Template.instance().subscribe('cialcos');
});
