Template.nuevaRed.onCreated(function () {
  let self = this;
  self.subscribe('provincias');
  self.subscribe('organizaciones');
});

