Accounts.emailTemplates.resetPassword.siteName = () => Meteor.settings.public.app_name;
Accounts.emailTemplates.resetPassword.from     = () => `${Meteor.settings.public.app_name} <sgalindo@magap.gob.ec>`;
Accounts.emailTemplates.resetPassword.subject  = () => `[${Meteor.settings.public.app_name}] Reset Your Password`;

Accounts.emailTemplates.resetPassword.text = ( user, url ) => {
  let emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "sgalindo@magap.gob.ec",
      emailBody      = `A password reset has been requested for the account related to this address (${emailAddress}). To reset the password, visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this reset, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

  return emailBody;
};
