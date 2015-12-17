const authenticatedRedirect = () => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.go('login');
  }
};

const blockUnauthorizedAdmin = (context, redirect) => {
  if (Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), 'admin')) {
    Modules.both.redirectUser({redirect: redirect});
  }
};

const blockUnauthorizedManager = (context, redirect) => {
  if (Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), ['admin', 'manager'])) {
    Modules.both.redirectUser({redirect: redirect});
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [authenticatedRedirect]
});

authenticatedRoutes.route('/users', {
  name: 'users',
  triggersEnter: [blockUnauthorizedAdmin],
  action() {
    BlazeLayout.render('default', {yield: 'users'});
  }
});

authenticatedRoutes.route('/productores', {
  name: 'productores',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'productores'});
  }
});

authenticatedRoutes.route('/nuevo-productor', {
  name: 'nuevo-productor',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoProductor'});
  }
});

authenticatedRoutes.route('/organizaciones', {
  name: 'organizaciones',
  action() {
    BlazeLayout.render('default', {yield: 'organizaciones'});
  }
});

authenticatedRoutes.route('/nueva-organizacion', {
  name: 'nueva-organizacion',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevaOrganizacion'});
  }
});

authenticatedRoutes.route('/cialcos', {
  name: 'cialcos',
  action() {
    BlazeLayout.render('default', {yield: 'cialcos'});
  }
});

authenticatedRoutes.route('/nuevo-cialco', {
  name: 'nuevo-cialco',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoCialco'});
  }
});

authenticatedRoutes.route('/redes', {
  name: 'redes',
  action() {
    BlazeLayout.render('default', {yield: 'redes'});
  }
});

authenticatedRoutes.route('/nueva-red', {
  name: 'nueva-red',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevaRed'});
  }
});

authenticatedRoutes.route('/montos-venta', {
  name: 'montos-venta',
  action() {
    BlazeLayout.render('default', {yield: 'montosVenta'});
  }
});

authenticatedRoutes.route('/nuevo-monto-venta', {
  name: 'nuevo-monto-venta',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoMontoVenta'});
  }
});

authenticatedRoutes.route('/metas', {
  name: 'metas',
  action() {
    BlazeLayout.render('default', {yield: 'metas'});
  }
});

authenticatedRoutes.route('/nuevas-metas', {
  name: 'nuevas-metas',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevasMetas'});
  }
});

authenticatedRoutes.route('/respaldos', {
  name: 'respaldos',
  action() {
    BlazeLayout.render('default', {yield: 'respaldos'});
  }
});

authenticatedRoutes.route('/nuevo-respaldo', {
  name: 'nuevo-respaldo',
  triggersEnter: [blockUnauthorizedManager],
  action() {
    BlazeLayout.render('default', {yield: 'nuevoRespaldo'});
  }
});
