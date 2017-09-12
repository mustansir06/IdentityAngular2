
// Author : Mustansir Sabir
// Usage  : Popup Script for Messagebox.
function MsgBox(title, message) {

    //$("body").append("<div id='CustomModalPopup' class='modal fade in' style='display: block;' aria-hidden='false'>" +
    //                    "<div class='modal-backdrop fade in' style='height: 100%;opacity: 0.1 !important;'></div>" +
    //                    "<div class='modal-dialog'>" +
    //                        "<div class='modal-content'>" +
    //                            "<div class='modal-header'>" +
    //                                "<button aria-hidden='true' data-dismiss='modal' class='close' type='button' onClick='CloseMsgBoxWithFalse();'>×</button>" +
    //                                "<h4 class='modal-title'>" + String(title) + "</h4>" +
    //                            "</div>" +
    //                            "<div class='modal-body'>" + String(message) + "</div>" +
    //                            "<div class='modal-footer'>" +
    //                            "<button aria-hidden='true' data-dismiss='modal' class='btn btn-info' type='button' onClick='CloseMsgBoxWithFalse();'>OK</button>" +
    //                        "</div>" +
    //                    "</div>" +
    //                "</div>" +
    //            "</div>");

    $("body").append("<div id='CustomModalPopup' class='popup-wrapper'>" +
                    "<div class='popup-overlay'></div>" +
                    "<div class='new-event popup popup-small'>" +
                        "<i class='close-pop table-delete' onClick='CloseMsgBoxWithFalse();'></i>" +
                        "<h5>" + title + "</h5>" +
                        "<div class='row-fluid form-wrapper'>" +
                            "<div class='span12 field-box m-b-0'>" +
                                "<label class='span12'>" + message + "</label>" +
                            "</div>" +
                            "<div class='span11 field-box actions'>" +
                                "<input type='button' value='Ok' class='btn-glow primary' onClick='CloseMsgBoxWithFalse();'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>");

    $('#CustomModalPopup').modal('show', { backdrop: 'fade' });
}

// Author : Mustansir Sabir
// Usage  : Popup Script for DeleteConfirmationBox
function MsgBoxConfirmGrid(title, message, controlId) {

    $("body").append("<div id='CustomModalPopup' class='popup-wrapper'>" +
                        "<div class='popup-overlay'></div>" +
                        "<div class='new-event popup popup-small'>" +
                            "<i class='close-pop table-delete' onClick='CloseMsgBoxWithFalse(" + controlId + ");'></i>" +
                            "<h5>" + title + "</h5>" +
                            "<div class='row-fluid form-wrapper'>" +
                                "<div class='span12 field-box m-b-0'>" +
                                    "<label class='span12'>" + message + "</label>" +
                                "</div>" +
                                "<div class='span11 field-box actions'>" +
                                    "<input type='button' value='Yes' class='btn-glow primary' onClick='CloseMsgBoxWithTrue(" + controlId + ");'>" +
                                    "<input type='reset' class='reset' value='No' onClick='CloseMsgBoxWithFalse();'>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>");
    return false;
}

function CloseMsgBoxWithFalse() {
    $('#CustomModalPopup').modal('hide', { backdrop: 'fade' });
    $("#CustomModalPopup").remove();
    $("body").removeClass("modal-open");
    $("body").attr("style", "padding-right: 0px");
    return false;
}

function CloseMsgBoxWithTrue(controlId) {
    $(controlId).next().click();
    $("#CustomModalPopup").remove();
    $("body").removeClass("modal-open");
    $("body").attr("style", "padding-right: 0px");
    return true;
}

function showreminder() {

    if ($('#CPH_chkbxReminder').prop('checked') == true) {
        $('#CPH_txtreminder').prop('disabled', false);
        $('#CPH_txtremindertime').prop('disabled', false)
    }
    else {
        $('#CPH_txtreminder').prop('disabled', true);
        $('#CPH_txtremindertime').prop('disabled', true)

    }
}


// Author : Mustansir Sabir
// Usage  : Popup Script for custom button text
function MsgBoxConfirmGridCustomButtons(title, message, controlId, confirmText, cancelText) {

    $("body").append("<div id='CustomModalPopup' class='popup-wrapper'>" +
                        "<div class='popup-overlay'></div>" +
                        "<div class='new-event popup popup-small'>" +
                            "<i class='close-pop table-delete' onClick='CloseMsgBoxWithFalse(" + controlId + ");'></i>" +
                            "<h5>" + title + "</h5>" +
                            "<div class='row-fluid form-wrapper'>" +
                                "<div class='span12 field-box m-b-0'>" +
                                    "<label class='span12'>" + message + "</label>" +
                                "</div>" +
                                "<div class='span11 field-box actions'>" +
                                    "<input type='button' value='" + confirmText + "' class='btn-glow primary' onClick='CloseMsgBoxWithTrueSameControl(" + controlId + ");'>" +
                                    "<input type='reset' class='reset' value='" + cancelText + "' onClick='CloseMsgBoxWithFalse();'>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>");
    return false;
}

function CloseMsgBoxWithTrueSameControl(controlId) {
    $(controlId).click();
    $("#CustomModalPopup").remove();
    $("body").removeClass("modal-open");
    $("body").attr("style", "padding-right: 0px");
    return true;
}