"use strict";

Zentyal.namespace('MailUserAddon');

Zentyal.MailUserAddon.accountChange = function(mail, ocEnabled) {
    var hasAccount = (mail !== '');
    $('#userMailNoAccountDiv').toggle(!hasAccount);
    $('#userMailWithAccountDiv').toggle(hasAccount);

    if (hasAccount) {
        // check if vdomain is managed
        var vdManaged = false;
        var accountVDomain = mail.split('@', 2)[1];
        var vdomains       = $('#userMail_data').data('vdomains');
        for (var i=0; i < vdomains.length; i++) {
            if (accountVDomain === vdomains[i]) {
                vdManaged = true;
                break;
            }
        }


        $('#userMailManaged').toggle(vdManaged);
        $('#userMailUnmanaged').toggle(!vdManaged);

        $('#userMailDelAccount_mail').val(mail);
        $('#userMailDelAccount_mailLabel').text(mail);
    }

    // aliases
    $('#userMailCreateAlias_maildrop').val(mail);
    $('#userMailAliasTable .aliasRow').remove();
    $('#note_userMailAlias, #error_userMailAlias, #note_userMailSetMaildirQuota, #error_userMailSetMaildirQuota').html('').hide();

    // external accounts
    $('#userMailAddExternalAccount_localmail').val(mail);
    $('#userMailExternalAccountsTable').children().remove();
    $('#note_userMailExternalAccount, #error_userMailExternalAccount').html('').hide();

    // event for observer in other addons
    var user_email_change_event = jQuery.Event("user_email_change");
    user_email_change_event.mail = mail;
    user_email_change_event.ocEnabled = ocEnabled;
    $('.user_email_observer').trigger(user_email_change_event);
};
