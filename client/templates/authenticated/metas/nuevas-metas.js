Template.nuevasMetas.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleDPA = DPASubs.subscribe('dpa');
    self.ready.set(handleDPA.ready());
  });
});
