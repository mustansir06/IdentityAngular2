var Extensions = new Array();
function PopulateUploadExtentions() {
    Extensions[0] = {
        type: "All",
        name: "All",
        filters: ''
    };

    Extensions[1] = {
        type: "Images",
        name: "Images",
        filters: 'jpg,png,jpeg'
    };

    Extensions[2] = {
        type: "Files",
        name: "Files",
        filters: 'doc,docx,xls,xlsx,rtf'
    };

    Extensions[3] = {
        type: "Audio",
        name: "Audio",
        filters: 'mp3'
    };

    Extensions[4] = {
        type: "CSV",
        name: "Files",
        filters: 'csv'
    };
}

/*Custom Multi Uploader*/
{
    //Author : Mustansir Sabir
    //Dated  : July 12, 2017
    //Usage  : Method to make and manage server side calls while uploading Multiple files which have been uploaded at client side using multiple different instances of pluploader.
    function MultiUpload(type, container, button, url, message, redirectURL) {
        var filExt = [];
        PopulateUploadExtentions();
        var currentPosition = 0;
        var uploadParams = [];
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: url,
            multi_selection: true,
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            var json = $.parseJSON(info.response);

            if (json[0] == "Success") {
                if (uploadParams != null && uploadParams.length > currentPosition) {
                    setNextFile(uploadParams[currentPosition]);
                    currentPosition++;
                }
                else {
                    ResetFiles();
                    hideAjaxLoading();
                    toastSuccess(message.success, 5000)
                    if (redirectURL != undefined && redirectURL!= "") {
                        window.location = redirectURL;

                        setTimeout(function () {
                            window.location = redirectURL;
                        }, 3000);
                    }
                }
            }
            else {
                uploader.stop()
                ResetFiles();
                hideAjaxLoading();
                toastAlert(message.alert, 8000);
            }
        });

        ///Custom function which starts the uploading of the current instance of this uploader
        uploader.startMultiUpload = function (params) {
            currentPosition = 0;
            uploadParams = params;
            if (uploadParams != null && uploadParams.length > currentPosition) {
                setNextFile(uploadParams[currentPosition]);
                currentPosition++;
                uploader.start();
            }
        }

        function setNextFile(params) {
            uploader.files.push(params.uploader.files[params.uploader.files.length - 1]);
            if (params.name != undefined && params.dimension != null) {
                uploader.settings.multipart_params = {
                    name: params.name,
                    x: params.dimension.x,
                    y: params.dimension.y,
                    w: params.dimension.w,
                    h: params.dimension.h,
                    canvasWidth: params.dimension.canvasWidth,
                    canvasHeight: params.dimension.canvasHeight
                };
            }
            params.uploaded = true;
        }

        function ResetFiles() {
            while (uploader.files.length != 0) {
                uploader.removeFile(uploader.files[0]);
            }
            while (uploadParams.length != 0) {
                while (uploadParams[0].uploader.files.length != 0) {
                    uploadParams[0].uploader.removeFile(uploadParams[0].uploader.files[0]);
                }
                uploadParams.splice(0, 1);
            }
        }

        uploader.init();
        return uploader;
    }
}
/*END Custom Multi Uploader*/

/*Retailer Module Uploader*/
{
    //Author : Mustansir Sabir
    //Dated  : Dec 23, 2015
    //Usage  : Method to upload Manager Logo According to the given logotype .
    function UploadRetailerLogo(type, isMultiple, container, button, logoType) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: '/BrandManager/UploadLargeLogo',
            multi_selection: isMultiple,  // Set True for Multi Select //
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    if (args.code == -601) {
                        toastAlert("The uploaded file type is not supported.", 8000)
                    }
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('FilesAdded', function (up, files) {
            var img = new o.Image();

            img.onload = function () {
                $("#lblCropError").html("").fadeOut(500);
                if (logoType == "large") {
                    this.embed("dvCropCanvas");
                    $('body').addClass('hide-overflow');
                    $('#dvCropModal').removeClass('hide');
                    $('#cnvsImgPreview').attr('style', 'width:180px; height:57.6px;');
                    $("#hdnLogoType").val("large");

                    if (this.width < 150 || this.height < 48) {
                        $("#lblCropError").html("Minimum supported size: 150 x 48 pixels").fadeIn(500);
                    }
                    setTimeout(function () {
                        var canvasId = '#' + $($("#dvCropCanvas").children()[0]).attr('id');
                        $("#hdnCanvasId").val(canvasId);
                        $(canvasId).Jcrop({
                            onChange: updatePreview,
                            onSelect: updatePreview,
                            allowSelect: true,
                            allowMove: true,
                            allowResize: true,
                            aspectRatio: 3.125,
                            minSize: [150, 48],
                            setSelect: [100, 100, 150, 48]
                        });
                    }, 200);
                }
                else if (logoType == "small") {
                    this.embed("dvCropCanvas");
                    $('body').addClass('hide-overflow');
                    $('#dvCropModal').removeClass('hide');
                    $('#cnvsImgPreview').attr('style', 'width:180px; height:180px;');
                    $("#hdnLogoType").val("small");

                    if (this.width < 24 || this.height < 24) {
                        $("#lblCropError").html("Minimum supported size: 200 x 200 pixels").fadeIn(500);
                    }

                    setTimeout(function () {
                        var canvasId = '#' + $($("#dvCropCanvas").children()[0]).attr('id');
                        $("#hdnCanvasId").val(canvasId);
                        $(canvasId).Jcrop({
                            onChange: updatePreview,
                            onSelect: updatePreview,
                            allowSelect: true,
                            allowMove: true,
                            allowResize: true,
                            aspectRatio: 1,
                            minSize: [24, 24],
                            setSelect: [100, 100, 50, 50]
                        });
                    }, 200);
                }
                else {
                    this.embed("dvCropCanvas");
                    $('body').addClass('hide-overflow');
                    $('#dvCropModal').removeClass('hide');
                    $('#cnvsImgPreview').attr('style', 'width:180px; height:180px;');
                    $("#hdnLogoType").val("splash");
                    $("#lblCropError").val("");

                    if (this.width < 300 || this.height < 300) {
                        $("#lblCropError").html("Minimum supported size: 300 x 300 pixels").fadeIn(500);
                    }

                    setTimeout(function () {
                        var canvasId = '#' + $($("#dvCropCanvas").children()[0]).attr('id');
                        $("#hdnCanvasId").val(canvasId);
                        $(canvasId).Jcrop({
                            onChange: updatePreview,
                            onSelect: updatePreview,
                            allowSelect: true,
                            allowMove: true,
                            allowResize: true,
                            aspectRatio: 1,
                            minSize: [290, 290],
                            setSelect: [300, 300, 290, 290]
                        });
                    }, 200);
                }
            };

            img.load(uploader.files[0].getSource());
        });

        uploader.init();
        return uploader;
    }
}
/*END Manager Module Uploader*/

/*User Module Uploader*/
{
    //Author : Mustansir Sabir
    //Dated  : Dec 23, 2015
    //Usage  : Method to upload Retailer Logo.
    function UploadUserLogo(type, isMultiple, container, button, logoType) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: '/Profile/UploadLogo',
            multi_selection: isMultiple,  // Set True for Multi Select //
            //resize: { width: 320, height: 240, quality: 90 },
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    if (args.code == -601) {
                        toastAlert("The uploaded file type is not supported.", 8000)
                    }
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('FilesAdded', function (up, files) {
            var img = new o.Image();

            img.onload = function () {
                $("#lblCropError").html("").fadeOut(500);
                if (logoType == "large") {
                    this.embed("dvCropCanvas");
                    $('body').addClass('hide-overflow');
                    $('#dvCropModal').removeClass('hide');
                    $('#cnvsImgPreview').attr('style', 'width:180px; height:57.6px;');
                    $("#hdnLogoType").val("large");

                    if (this.width < 150 || this.height < 48) {
                        $("#lblCropError").html("Minimum supported size: 150 x 48 pixels").fadeIn(500);
                    }

                    setTimeout(function () {
                        var canvasId = '#' + $($("#dvCropCanvas").children()[0]).attr('id');
                        $("#hdnCanvasId").val(canvasId);
                        $(canvasId).Jcrop({
                            onChange: updatePreview,
                            onSelect: updatePreview,
                            allowSelect: true,
                            allowMove: true,
                            allowResize: true,
                            aspectRatio: 3.125,
                            minSize: [150, 48],
                            setSelect: [100, 100, 150, 48]
                        });
                    }, 200);
                }
                else if (logoType == "small") {
                    this.embed("dvCropCanvas");
                    $('body').addClass('hide-overflow');
                    $('#dvCropModal').removeClass('hide');
                    $('#cnvsImgPreview').attr('style', 'width:180px; height:180px;');
                    $("#hdnLogoType").val("small");

                    if (this.width < 24 || this.height < 24) {
                        $("#lblCropError").html("Minimum supported size: 200 x 200 pixels").fadeIn(500);
                    }

                    setTimeout(function () {
                        var canvasId = '#' + $($("#dvCropCanvas").children()[0]).attr('id');
                        $("#hdnCanvasId").val(canvasId);
                        $(canvasId).Jcrop({
                            onChange: updatePreview,
                            onSelect: updatePreview,
                            allowSelect: true,
                            allowMove: true,
                            allowResize: true,
                            aspectRatio: 1,
                            minSize: [24, 24],
                            setSelect: [100, 100, 50, 50]
                        });
                    }, 200);
                }
                else {
                    this.embed("dvCropCanvas");
                    $('body').addClass('hide-overflow');
                    $('#dvCropModal').removeClass('hide');
                    $('#cnvsImgPreview').attr('style', 'width:180px; height:180px;');
                    $("#hdnLogoType").val("splash");

                    if (this.width < 300 || this.height < 300) {
                        $("#lblCropError").html("Minimum supported size: 300 x 300 pixels").fadeIn(500);
                    }

                    setTimeout(function () {
                        var canvasId = '#' + $($("#dvCropCanvas").children()[0]).attr('id');
                        $("#hdnCanvasId").val(canvasId);
                        $(canvasId).Jcrop({
                            onChange: updatePreview,
                            onSelect: updatePreview,
                            allowSelect: true,
                            allowMove: true,
                            allowResize: true,
                            aspectRatio: 1,
                            minSize: [200, 200],
                            setSelect: [100, 100, 50, 50]
                        });
                    }, 200);
                }
            };

            img.load(uploader.files[0].getSource());
        });

        uploader.init();

        return uploader;
    }
}
/*END User Module Uploader*/

/*Coupon Module Uploader*/
{
    //Author : Mustansir Sabir
    //Dated  : Dec 23, 2015
    //Usage  : Method to upload Coupon Image.
    function UploadCouponImage(type, isMultiple, container, button) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: '/Coupon/UploadCouponImage',
            multi_selection: isMultiple,  // Set True for Multi Select //
            //resize: { width: 320, height: 240, quality: 90 },
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    if (args.code == -601) {
                        toastAlert("The uploaded file type is not supported.", 8000)
                    }
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('FilesAdded', function (up, files) {
            var img = new o.Image();
            img.onload = function () {
                this.embed("dvCanvas");
                $("#btnBrowsePic").addClass("hide");
                $("#dvCouponCurrentPic").removeClass("hide");
                $("#txtImageUploaded").val('true');
                $("#txtImageName").val(this.name);
            };
            img.load(uploader.files[0].getSource());
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            hideAjaxLoading();
            var json = $.parseJSON(info.response);
            if (json[0] == "Success") {
                while (uploader.files.length != 0) {
                    uploader.removeFile(uploader.files[0]);
                }
                toastSuccess("Item successfully updated", 5000);
            }
            else {
                toastAlert("Item successfully was saved but we encountered some error while uploading the image. Please try again later. ", 8000);
            }
        });

        uploader.init();

        return uploader;
    }
}
/*Coupon Module Uploader*/

/*Test Module Uploader*/
{
    //Author : Mustansir Sabir
    //Dated  : Dec 23, 2015
    //Usage  : Method to upload BarImages.
    function UploadLogoDirect(type, isMultiple, container, button) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: '/Retailer/UploadLogoDirect',
            multi_selection: isMultiple,  // Set True for Multi Select //
            //resize: { width: 320, height: 240, quality: 90 },
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    if (args.code == -601) {
                        toastAlert("The uploaded file type is not supported.", 8000)
                    }
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('QueueChanged', function (up) {
            uploader.start();
            showAjaxLoading();
        });

        uploader.bind('UploadProgress', function (up, file) {
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            var json = $.parseJSON(info.response);
            hideAjaxLoading();
            if(json[0] == "Success" ){
                toastSuccess("Success", 15000);
            }
            else if (json[0] == "Error") {
                toastError("Error", 15000);
            }
        });
        uploader.init();
    }

    //Author : Mustansir Sabir
    //Dated  : Dec 23, 2015
    //Usage  : Method to upload BarImages.
    function UploadLogoDirectCrop(type, isMultiple, container, button) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: '/Retailer/UploadLogoDirectCrop',
            multi_selection: isMultiple,  // Set True for Multi Select //
            //resize: { width: 320, height: 240, quality: 90 },
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('QueueChanged', function (up) {
            uploader.start();
            showAjaxLoading();
        });

        uploader.bind('UploadProgress', function (up, file) {
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            var json = $.parseJSON(info.response);
            hideAjaxLoading();
            if (json[0] == "Success") {
                toastSuccess("Success", 15000);
            }
            else if (json[0] == "Error") {
                toastError("Error", 15000);
            }
        });
        uploader.init();
    }

    //Author : Mustansir Sabir
    //Dated  : Dec 23, 2015
    //Usage  : Method to upload Coupon Image.
    function UploadLogoClient(type, isMultiple, container, button) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: '/Retailer/UploadLogoClient',
            multi_selection: isMultiple,  // Set True for Multi Select //
            //resize: { width: 320, height: 240, quality: 90 },
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('FilesAdded', function (up, files) {
            var img = new o.Image();
            img.onload = function () {
                $("#btnUploadLogo1").fadeIn(500);
            };
            img.load(uploader.files[0].getSource());
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            hideAjaxLoading();
            $("#btnUploadLogo1").fadeOut(500);
            var json = $.parseJSON(info.response);
            if (json[0] == "Success") {
                while (uploader.files.length != 0) {
                    uploader.removeFile(uploader.files[0]);
                }
                toastSuccess("Image successfully Uploaded", 15000);
            }
            else if (json[0] == "Error") {
                toastError("Error", 15000);
            }
        });
        uploader.init();

        return uploader;
    }

    //Author : Mustansir Sabir
    //Dated  : Dec 23, 2015
    //Usage  : Method to upload Coupon Image.
    function UploadLogoClientCrop(type, isMultiple, container, button) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: '/Retailer/UploadLogoClientCrop',
            multi_selection: isMultiple,  // Set True for Multi Select //
            //resize: { width: 320, height: 240, quality: 90 },
            flash_swf_url: '../Assets/plugins/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '../Assets/plugins/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('FilesAdded', function (up, files) {
            var img = new o.Image();
            img.onload = function () {
                $("#btnUploadLogo2").fadeIn(500);
            };
            img.load(uploader.files[0].getSource());
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            hideAjaxLoading();
            $("#btnUploadLogo2").fadeOut(500);
            var json = $.parseJSON(info.response);
            if (json[0] == "Success") {
                while (uploader.files.length != 0) {
                    uploader.removeFile(uploader.files[0]);
                }
                toastSuccess("Image successfully Uploaded", 15000);
            }
            else if (json[0] == "Error") {
                toastError("Error", 15000);
            }
        });
        uploader.init();

        return uploader;
    }
}
/*END Test Module Uploader*/

/*Retailer Item Module Uploaders*/
{
    //Author : Mustansir Sabir
    //Dated  : July 31, 2017
    //Usage  : Method to upload Retailer Items.
    function UploadRetailerItemCSV(type, isMultiple, container, button, url) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            //if (Extensions[i].name.toLowerCase() == type.toLowerCase()) {
            if (Extensions[i].type.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: url,
            multi_selection: isMultiple,
            flash_swf_url: '/Assets/js/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '/Assets/js/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    if (args.code == -601) {
                        toastAlert("The uploaded file type is not supported.", 8000)
                    }
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('QueueChanged', function (up) {
            showAjaxLoading();
            uploader.start();
        });

        uploader.bind('UploadProgress', function (up, file) {
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            hideAjaxLoading();
            var json = $.parseJSON(info.response);
            if (json.LoginRequired) {
                window.location = json.RedirectUrl;
            }
            else {
                if (json.status == "Error") {
                    toastError(json.message, 8000);
                }
                else if (json.status == "Success") {
                    var dataHTML = "<option value='0'>Select a value</option>";

                    for (var i = 0; i < json.columns.length; i++) {
                        dataHTML += "<option value='" + json.columns[i] + "'>" + json.columns[i] + "</option>";
                    }

                    $("#ddlCategory").html(dataHTML);
                    $("#ddlName").html(dataHTML);
                    $("#ddlDescription").html(dataHTML);
                    $("#ddlBrand").html(dataHTML);
                    $("#ddlManfuacturer").html(dataHTML);
                    $("#ddlBarcode").html(dataHTML);
                    $("#ddlBarcodeType").html(dataHTML);
                    $("#ddlPrice").html(dataHTML);
                    $("#ddlTax").html(dataHTML);
                    $("#ddlSize").html(dataHTML);
                    $("#ddlUom").html(dataHTML);

                    $("#hdnFileName").val(json.filename);

                    $('body').addClass('hide-overflow');
                    $('#dvCsvMapModal').removeClass('hide');

                    $("#ddlCategory").select2({
                        placeholder: "Select Category Id"
                    });
                    $("#ddlName").select2({
                        placeholder: "Select Name"
                    });
                    $("#ddlDescription").select2({
                        placeholder: "Select Description"
                    });
                    $("#ddlBrand").select2({
                        placeholder: "Select Brand"
                    });
                    $("#ddlManfuacturer").select2({
                        placeholder: "Select Password"
                    });
                    $("#ddlBarcode").select2({
                        placeholder: "Select Barcode"
                    });
                    $("#ddlBarcodeType").select2({
                        placeholder: "Select Barcode Type"
                    });
                    $("#ddlPrice").select2({
                        placeholder: "Select Price"
                    });
                    $("#ddlTax").select2({
                        placeholder: "Select Tax"
                    });
                    $("#ddlSize").select2({
                        placeholder: "Select Size"
                    });
                    $("#ddlUom").select2({
                        placeholder: "Select unit"
                    });
                }

            }

        });

        uploader.init();
    }
}
/*END Retailer Module Uploaders*/

/*Retailer Store Item Module Uploaders*/
{
    //Author : Mustansir Sabir
    //Dated  : July 31, 2017
    //Usage  : Method to upload RetailerItemPrice.
    function UploadRetailerItemPriceCSV(type, isMultiple, container, button, url) {
        var filExt = [];
        PopulateUploadExtentions();
        for (var i = 1; i < Extensions.length; i++) {
            if (Extensions[i].type.toLowerCase() == type.toLowerCase()) {
                filExt = [{ title: Extensions[i].name, extensions: Extensions[i].filters }];
                break;
            }
        }

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: button,
            container: container,
            url: url,
            multi_selection: isMultiple,
            flash_swf_url: '/Assets/js/Plupload-2.1.9/Moxie.swf',
            silverlight_xap_url: '/Assets/js/Plupload-2.1.9/Moxie.xap',
            max_file_size: '20mb',
            filters: {
                max_file_size: '20mb',
                mime_types: filExt
            },
            init: {
                Error: function (up, args) {
                    if (args.code == -601) {
                        toastAlert("The uploaded file type is not supported.", 8000)
                    }
                    // Called when a error has occured
                    $("#" + args.file.id + "").remove();
                }
            }
        });

        uploader.bind('QueueChanged', function (up) {
            showAjaxLoading();
            uploader.start();
        });

        uploader.bind('UploadProgress', function (up, file) {
        });

        uploader.bind('FileUploaded', function (up, file, info) {
            hideAjaxLoading();
            var json = $.parseJSON(info.response);
            if (json.LoginRequired) {
                window.location = json.RedirectUrl;
            }
            else {
                if (json.status == "Error") {
                    toastError(json.message, 8000);
                }
                else if (json.status == "Success") {
                    var dataHTML = "<option value='0'>Select a value</option>";

                    for (var i = 0; i < json.columns.length; i++) {
                        dataHTML += "<option value='" + json.columns[i] + "'>" + json.columns[i] + "</option>";
                    }

                    $("#ddlBarcode").html(dataHTML);
                    $("#ddlPrice").html(dataHTML);
                    $("#ddlPriceMultiple").html(dataHTML);
                    $("#ddlCasePrice").html(dataHTML);
                    $("#ddlPriceType").html(dataHTML);
                    $("#ddlAisleNumber").html(dataHTML);
                    $("#ddlCaseSize").html(dataHTML);
                    $("#ddlStartDate").html(dataHTML);
                    $("#ddlEndDate").html(dataHTML);
                    $("#ddlMinimumQuantity").html(dataHTML);
                    $("#ddlLimitQuantity").html(dataHTML);

                    $("#hdnFileName").val(json.filename);

                    $('body').addClass('hide-overflow');
                    $('#dvCsvMapModal').removeClass('hide');

                    $("#ddlBarcode").select2({ placeholder: "Select a Barcode" });
                    $("#ddlPrice").select2({ placeholder: "Select a Price" });
                    $("#ddlPriceMultiple").select2({ placeholder: "Select a Price Multiple" });
                    $("#ddlCasePrice").select2({ placeholder: "Select a Case Price" });
                    $("#ddlPriceType").select2({ placeholder: "Select a Price Type" });
                    $("#ddlAisleNumber").select2({ placeholder: "Select a Aisle Number" });
                    $("#ddlCaseSize").select2({ placeholder: "Select a Case Size" });
                    $("#ddlStartDate").select2({ placeholder: "Select a Start Date" });
                    $("#ddlEndDate").select2({ placeholder: "Select a End Date" });
                    $("#ddlMinimumQuantity").select2({ placeholder: "Select a Minimum Quntity" });
                    $("#ddlLimitQuantity").select2({ placeholder: "Select a Limit Qunatity" });

                }

            }

        });

        uploader.init();
    }
}
/*END Retailer Module Uploaders*/