
function Validate(e) {
    var ername = '';
    var eremail = '';
    var ertextarea = '';
    var ValidateFlag = true;
    var ControlFlag = true;

    var AllControls = $('.' + e + 'input-required:visible');

    var AllHiddenControls = $('.' + e + 'input-requiredhidden:hidden');

    var AllNotRequired = $("." + e + "input-notrequired:visible");

    var AllHiddenNotRequired = $("." + e + "input-notrequiredhidden:hidden");

    if (AllNotRequired.length > 0) {
        for (var i = 0; i < AllNotRequired.length; i++) {
            var ctlVal = $(AllNotRequired[i]).val().trim();
            if (ctlVal.length > 0) {
                if ($(AllNotRequired[i]).hasClass('isEmail')) {
                    var email = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
                    if (email.test(ctlVal)) {
                        ValidateFlag = true;
                        $(AllNotRequired[i]).removeClass('er');
                        $(AllNotRequired[i]).next('.error').html('').fadeOut(800);
                    }
                    else {
                        $(AllNotRequired[i]).addClass('er');
                        $(AllNotRequired[i]).next('.error').html("Invalid Email").fadeIn(800);
                        ValidateFlag = false;
                        ControlFlag = false;
                    }
                }
                else if ($(AllNotRequired[i]).hasClass('isZipcode')) {
                    var zip = new RegExp(/\d{5}-?(\d{4})?$/);
                    if (zip.test(ctlVal)) {
                        $(AllNotRequired[i]).removeClass('er');
                        $(AllNotRequired[i]).next('.error').html('').fadeOut(800);
                        ValidateFlag = true;
                    }
                    else {
                        $(AllNotRequired[i]).addClass('er');
                        $(AllNotRequired[i]).next('.error').html("Invalid Zipcode").fadeIn(800);
                        ValidateFlag = false;
                        ControlFlag = false;
                    }
                }
                else if ($(AllNotRequired[i]).hasClass('isPhone')) {
                    var phone = new RegExp(/^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/);
                    if (phone.test(ctlVal)) {
                        $(AllNotRequired[i]).removeClass('er');
                        $(AllNotRequired[i]).next('.error').html('').fadeOut(800);
                        ValidateFlag = true;
                    }
                    else {
                        $(AllNotRequired[i]).addClass('er');
                        $(AllNotRequired[i]).next('.error').html("Invalid Phone").fadeIn(800);
                        ValidateFlag = false;
                        ControlFlag = false;
                    }
                }
                else if ($(AllNotRequired[i]).hasClass('isMatch')) {
                    var prevVal = $(AllControls[i - 1]).val();
                    if (prevVal.match(ctlVal)) {
                        $(AllNotRequired[i]).removeClass('er');
                        $(AllNotRequired[i]).next('.error').html('').fadeOut(800);
                        ValidateFlag = true;
                    }
                    else {
                        $(AllNotRequired[i]).addClass('er');
                        $(AllNotRequired[i]).next('.error').html("Passwords do not match").fadeIn(800);
                        ValidateFlag = false;
                        ControlFlag = false;
                    }
                }
                else if ($(AllNotRequired[i]).hasClass('isNumber')) {
                    if (!isNaN(ctlVal)) {
                        $(AllNotRequired[i]).removeClass('er');
                        $(AllNotRequired[i]).next('.error').html('').fadeOut(800);
                        ValidateFlag = true;
                    }
                    else {
                        $(AllNotRequired[i]).addClass('er');
                        $(AllNotRequired[i]).next('.error').html("Invalid Value").fadeIn(800);
                        ValidateFlag = false;
                        ControlFlag = false;
                    }
                }
                else if ($(AllNotRequired[i]).hasClass('isNumberNonNegative')) {
                    var numReg = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);
                    if (numReg.test(ctlVal)) {
                        $(AllNotRequired[i]).removeClass('er');
                        $(AllNotRequired[i]).next('.error').html('').fadeOut(800);
                        ValidateFlag = true;
                    }
                    else {
                        $(AllNotRequired[i]).addClass('er');
                        $(AllNotRequired[i]).next('.error').html("Invalid Value").fadeIn(800);
                        ValidateFlag = false;
                        ControlFlag = false;
                    }
                }
                else if ($(AllNotRequired[i]).hasClass('isNumberNonZeroNegative')) {
                    var numReg = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);
                    if (numReg.test(ctlVal)) {
                        $(AllNotRequired[i]).removeClass('er');
                        $(AllNotRequired[i]).next('.error').html('').fadeOut(800);
                        ValidateFlag = true;
                    }
                    else {
                        $(AllNotRequired[i]).addClass('er');
                        $(AllNotRequired[i]).next('.error').html("Invalid Value").fadeIn(800);
                        ValidateFlag = false;
                        ControlFlag = false;
                    }
                }
            }
        }
    }

    if (AllHiddenNotRequired.length > 0) {

    }

    if (AllControls.length > 0) {
        for (var i = 0; i < AllControls.length; i++) {
            var ctlVal = $(AllControls[i]).val();
            //if ($(AllControls[i]).val().trim() == '') {
            //    $(AllControls[i]).addClass('er');
            //    $(AllControls[i]).next('.error').fadeIn(800);
            //    ValidateFlag = false;
            //    ControlFlag = false;
            //}
            if ($(AllControls[i]).hasClass('customDropdown')) {
                if (ctlVal != '0') {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Select One Value").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isEmail')) {
                var email = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
                if (email.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Email").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isPhone')) {
                var phone = new RegExp(/^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/);
                if (phone.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Phone").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isZipcode')) {
                var zip = new RegExp(/\d{5}-?(\d{4})?$/);
                if (zip.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Zipcode").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isMatch')) {
                var prevVal = $(AllControls[i - 1]).val();
                if (ctlVal === "") {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Please enter a password").fadeIn(800);
                }
                else if (prevVal === ctlVal) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Passwords do not match").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('multiSelect')) {
                var prevVal = $("#MultiSelect #subDiv").length;
                if (prevVal > 0) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Add atleast one value").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isDuration')) {
                var zip = new RegExp(/^([2][0-3]|[0-1]?[0-9])([.:][0-5]?[0-9])?$/);
                if (zip.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Duration").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isPriceRating')) {
                var zip = new RegExp(/\b^[1-5\b]\b/);
                if (zip.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Price Rating, Rating should be between 1 to 5").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isNumber')) {
                if (!isNaN(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Value").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('oneToFourDigit')) {
                var numReg = new RegExp(/^^([1-4]{4})$/);
                if (numReg.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Value").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isNumberNonNegative')) {
                var numReg = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);
                if (numReg.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Value").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).hasClass('isNumberNonZeroNegative')) {
                var numReg = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);
                if (numReg.test(ctlVal)) {
                    $(AllControls[i]).removeClass('er');
                    $(AllControls[i]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    $(AllControls[i]).addClass('er');
                    $(AllControls[i]).next('.error').html("Invalid Value").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
            else if ($(AllControls[i]).val().trim() == '') {
                $(AllControls[i]).addClass('er');
                $(AllControls[i]).next('.error').fadeIn(800);
                ValidateFlag = false;
                ControlFlag = false;
            }
            else {
                $(AllControls[i]).removeClass('er');
                $(AllControls[i]).next('.error').fadeOut(800);
                ValidateFlag = true;
            }

        }
    }

    if (AllHiddenControls.length > 0) {
        for (var i = 0; i < AllHiddenControls.length; i++) {
            var ctlVal = $(AllHiddenControls[i]).val();
            if ($(AllHiddenControls[i]).hasClass('select2Dropdown')) {
                if (ctlVal != '0') {
                    //$($(AllHiddenControls[i]).parent().children()[0]).removeClass('er');
                    $($($(AllHiddenControls[i]).parent().children()[0]).children()[0]).removeClass('er')
                    $($(AllHiddenControls[i]).parent().children()[0]).next('.error').html('').fadeOut(800);
                    ValidateFlag = true;
                }
                else {
                    //$($(AllHiddenControls[i]).parent().children()[0]).addClass('er')
                    $($($(AllHiddenControls[i]).parent().children()[0]).children()[0]).addClass('er')
                    $($(AllHiddenControls[i]).parent().children()[0]).next('.error').html("Select One Value").fadeIn(800);
                    ValidateFlag = false;
                    ControlFlag = false;
                }
            }
        }
    }

    if (ValidateFlag == true && ControlFlag == true) {
        return true;
    }
    else
        return false;

    //Ajax calling
    if (ername == '' && eremail == '' && ertextarea == '') {
        var dataString = 'name=' + name + '&email=' + email + '&text=' + textarea;
        $.ajax({
            type: "POST",
            url: "email.php",
            data: dataString,
            success: function (msg) {
                $(".mailFromDiv").animate({
                    height: '0px'
                }, 500);
                $('.mailSuccessDiv').fadeIn(1000);
            }
        });

    } else {
        $(".namefild .error").html(ername).fadeIn(800);
        $(".emailfild .error").html(eremail).fadeIn(800);
        $(".messagefild .error").html(ertextarea).fadeIn(800);
    }
}

function RemoveValidate(e) {
    $(e).removeClass('er');
    //$(e).next('.error').html('').fadeOut(800);
    $(e).next('.error').fadeOut(800);
}

function RemoveAllValidations(e) {
    var AllControls = $('.' + e + 'input-required');
    var AllNotRequired = $("." + e + "input-notrequired");
    for (var i = 0; i < AllControls.length; i++) {
        $(AllControls[i]).removeClass('er');
        //$(AllControls[i]).next('.error').html("").fadeIn(800);
        $(AllControls[i]).next('.error').fadeIn(800);
    }
    for (var i = 0; i < AllNotRequired.length; i++) {
        $(AllNotRequired[i]).removeClass('er');
        //$(AllNotRequired[i]).next('.error').html("").fadeIn(800);
        $(AllNotRequired[i]).next('.error').fadeIn(800);
    }
}

function checkNumber(txtbox) {
    var amt = $(txtbox).val();
    if (isNaN(amt)) {
        $(txtbox).addClass('er');
        $(txtbox).next(".error").html("Invalid Value").fadeIn(800);
    }
    else {
        $(txtbox).removeClass('er');
        $(txtbox).next(".error").html("").fadeOut(800);
        $(txtbox).val(Number(amt).toFixed(2));
    }
}