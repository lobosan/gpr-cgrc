let _insertInvitation = (invite) => {
  Invitations.insert(invite);
};

let _prepareEmail = (token) => {
  let domain = Meteor.settings.private.domain;
  let url = `http://${ domain }/invite/${ token }`;

  SSR.compileTemplate('invitation', Assets.getText('email/templates/invitation.html'));
  let html = SSR.render('invitation', {url: url});

  return html;
};

let _sendInvitation = (email, content) => {
  Email.send({
    to: email,
    from: "Santiago Galindo <sgalindo@magap.gob.ec>",
    subject: "Invitación para participar en el sistema GPR-CGRC",
    html: content
  });
};

let invitation = (options) => {
  _insertInvitation(options);
  var email = _prepareEmail(options.token);
  _sendInvitation(options.email, email);
};

Modules.server.sendInvitation = invitation;
