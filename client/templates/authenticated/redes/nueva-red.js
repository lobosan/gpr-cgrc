Template.nuevaRed.onCreated(() => {
  Template.instance().subscribe('provincias');
  Template.instance().subscribe('organizaciones');
});

