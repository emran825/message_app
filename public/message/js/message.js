// All the Setting related js functions will be here
$(document).ready(function () {
    var url = $('.site_url').val();
    var number_of_msg = 15;
    var current_page_no = 1;
    var loaded = 1;
    var last_appuser_message_id = 0;




    var profile_image_url = url + "/assets/images/user/admin/";
    var demo_image_url = url + "/assets/images/user/admin/profile.png";
    var messageImage = url + "/assets/images/message/";

    console.log(profile_image_url);


    /*-----------------------------MESSAGE NOTIFICATION------------------------------------- */


    /*--------------------------------ALL USER SHOW---------------------------*/
    loadUser = function loadUser() {
        $.ajax({
            url: url + '/message/load-user'
           // url:  '/message/load-user'
            , success: function (response) {
                var response = JSON.parse(response);
                var data = response['data'];

                console.log("-----------************-------------");
                console.log(data);
                /*-----------------------------------TEACHER STUDENT VIEW------------------------------------ */
                if (!jQuery.isEmptyObject(data)) {
                    var html = '';
                    $.each(data, function (index, value) {
                        console.log(value);
                        html +=  '<div class="row sideBar-body"  onclick="loadMessageUser(' + value.id + ')">';
                        html +=' <div class="col-sm-3 col-xs-3 sideBar-avatar">';
                        html +=    ' <div class="avatar-icon">';
                        html +=        '<img src="https://bootdey.com/img/Content/avatar/avatar3.png"/>';
                        html +=   ' </div>';
                        html += '</div>';
                        html += '<div class="col-sm-9 col-xs-9 sideBar-main">';
                        html +=   '  <div class="row">';
                        html +=        '<div class="col-sm-8 col-xs-8 sideBar-name">';
                        html +=           ' <span class="name-meta common-class">'+value.name;
                        html +=           ' </span>';
                        html +=        '</div>';
                        html +=         '<div class="col-sm-4 col-xs-4 pull-right sideBar-time">';
                        html +=           ' <span class="time-meta pull-right common-class">18:18';
                        html +=           ' </span>';
                        html +=       ' </div>';
                        html +=    '</div>';
                        html +=  '</div>';
                        html += ' </div>';
                    });
                    $(".sideBar").html(html);
                }
                else{
                    $(".sideBar").html('');
                }
                if (localStorage.getItem('app_user_id')) {
                    var aa = $('#app_user_id').val(localStorage.getItem('app_user_id'))

                    loadMessageUser(localStorage.getItem('app_user_id'))
                    localStorage.removeItem('app_user_id')
                } else if (loaded == 1) {
                    $('.sideBar-body:first').trigger('click');
                    loaded++;
                }
            }
        });
    }
    loadUser();
    loadMessages = function loadMessages(message_load_type) {

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var app_user_id = $("#app_user_id").val();
        // new appuser loaded
        if (message_load_type == 1) {
            current_page_no = 1;
        }


        $.ajax({
            url: url + '/message/load-message',
            type: 'POST',
            data: {
                app_user_id_load_msg: app_user_id,
                limit: number_of_msg,
                page_no: current_page_no,
                message_load_type: message_load_type,
                last_appuser_message_id: last_appuser_message_id
            },
            async: true,
            beforeSend: function (xhr) {

            },
            success: function (response) {
                /***********************************MESSAGE DISPLAY****************************************** */
                console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
                console.log(response.data);
                var messageBody = '';
                if (!jQuery.isEmptyObject(response.data)) {
                    $.each(response.data, function (index, value) {
                        var message_to = '';
                        console.log('-------------------------------------------------------------------')
                        console.log(value.message)
                        //var date_time = moment(value.created_at).format("MMM Do YY");
                        var date_time =moment(value.created_at).format('lll');
                        if (value.message_from != response.id) {
                            console.log('-------------------------------------------------------------------')
                            console.log(value.message)

                            message_to +=  '<div class="row message-body receive_msg" id="receive_message_id_' + value.id + '">';
                            message_to += '<div class="col-sm-12 message-main-receiver">';
                            message_to +=    ' <div class="receiver">';
                            message_to +=         '<div class="message-text">'  + value.message+ '</div>';


                            message_to +=         '<span class="message-time pull-right common-class">';
                            message_to +=          '' + date_time + '';
                            message_to +=        '</span>';
                            message_to +=    '</div>';
                            message_to += '</div>';
                            message_to +=  '</div>';

                            // message_to += '<div class="chat-box-wrapper receive_msg" id="receive_message_id_' + value.id + '" >';
                            // message_to += ' <div id="message_to_image">';
                            // message_to += ' <div class="avatar-icon-wrapper mr-1">';
                            // message_to += '<div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg">';
                            // message_to += ' </div>';
                            // message_to += ' <div class="avatar-icon avatar-icon-lg rounded">';
                            // if (value.messagefrom_user.user_profile_image != null) {
                            //     message_to += '<img  src="' + profile_image_url + value.messagefrom_user.user_profile_image + '" alt="">';
                            // }
                            // else {
                            //     message_to += '<img src="' + demo_image_url + '" alt="">';
                            // }
                            // message_to += ' </div>';
                            // message_to += ' </div>';
                            // message_to += ' </div>';
                            // message_to += '<div class="row">';
                            // if (value.message != null) {
                            //     message_to += ' <div class="chat-box col-md-12 ml-2">' + value.message + '</div>';
                            // } else {
                            //     message_to += ' <div class="chat-box col-md-6 ml-2 message-image-div"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';
                            // }
                            // if (value.message == null) {

                            // } else {
                            //     if (value.attachment != null) {
                            //         message_to += ' <div class="chat-box col-md-6 ml-2 message-image-div"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';
                            //     }
                            // }
                            // message_to += ' <small class="opacity-6">';
                            // message_to += ' <i class="fa fa-calendar-alt mr-1"></i>';
                            // message_to += '' + date_time + '';
                            // message_to += '</small>';


                            // if (value.is_seen == 1) {
                            //     message_to += ' <small class="opacity-6">';
                            //      message_to += ' <i class="fa fa-eye mr-1 edit-delete-icon" title="Message seen"></i>';


                            //     message_to += '</small>';
                            // }
                            // if (value.is_seen != 1) {
                            //     message_to += ' <small class="opacity-6">';
                            //      message_to += ' <i class="fa fa-eye-slash mr-1 edit-delete-icon" title="Message not seen"></i>';
                            //     message_to+='seen'

                            //     message_to += '</small>';
                            // }
                            // message_to += '</div>';
                            // message_to += ' </div>';

                        } else {
                            message_to += '<div class="row message-body receive_msg" id="receive_message_id_' + value.id + '">';
                            message_to +='<div class="col-sm-12 message-main-sender">';
                            message_to +=   '<div class="sender">';
                            message_to +=         '<div class="message-text">'  + value.message+ '</div>';
                            message_to +=       '<span class="message-time pull-right common-class">';
                            message_to +=         '' + date_time + '';
                            message_to +=      ' </span>';
                            message_to +=  ' </div>';
                            message_to +='</div>';
                            message_to +=' </div>';


                            // message_to += '<div class="container-fluid receive_msg" id="receive_message_id_' + value.id + '">';
                            // message_to += '<div class="row">';
                            // message_to += '<div class="col-md-12">'
                            // message_to += '<div class="float-right chat-box-wrapper" style="padding-left: 382px;">';

                            // message_to += '<div class="chat-box-wrapper chat-box-wrapper-right">';

                            // message_to += '<div class="row">';
                            // if (value.message != null) {
                            //     message_to += '<div class="chat-box col-md-12 ml-2">' + value.message + '</div>';

                            // }
                            // else {
                            //     message_to += '<div class="chat-box col-md-6 message-image-div ml-2"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';

                            // }
                            // if (value.message == null) {

                            // } else {
                            //     if (value.attachment != null) {

                            //         message_to += '<div class="chat-box col-md-6 message-image-div ml-2"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';
                            //     }
                            // }



                            // message_to += '<small class="opacity-6">';
                            // message_to += '<i class="fa fa-calendar-alt mr-1"></i>';
                            // message_to += ' ' + date_time + '';
                            // message_to += '</small>';
                            // if (value.is_seen == 1) {
                            //     message_to += ' <small class="opacity-6">';
                            //      message_to += ' <i class="fa fa-eye mr-1 edit-delete-icon"></i>';


                            //     message_to += '</small>';
                            // }
                            // if (value.is_seen != 1) {
                            //     message_to += ' <small class="opacity-6">';
                            //      message_to += ' <i class="fa fa-eye-slash mr-1 edit-delete-icon"></i>';


                            //     message_to += '</small>';
                            // }

                            // message_to += '</div>';
                            // message_to += '<div>';
                            // message_to += ' <div class="avatar-icon-wrapper ml-1">';
                            // message_to += '<div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg">';
                            // message_to += ' </div>';
                            // message_to += ' <div class="avatar-icon avatar-icon-lg rounded">';
                            // if (value.messagefrom_user.user_profile_image != null) {
                            //     message_to += '<img  src="' + profile_image_url + value.messagefrom_user.user_profile_image + '" alt="">';
                            // }
                            // else {
                            //     message_to += '<img src="' + demo_image_url + '" alt="">';
                            // }
                            // message_to += ' </div>';
                            // message_to += ' </div>';
                            // message_to += ' </div>';
                            // message_to += ' </div>';
                            // message_to += '</div>';
                            // message_to += '</div>';
                            // message_to += '</div>';
                            // message_to += '</div>';

                        }
                        messageBody = message_to + messageBody;


                    });
                    // $("#child").html(message_to);
                }

                /************************************============================================ */
                if (messageBody != "") {
                    if (message_load_type == 1) { // 1: all message dump
                        //alert('1:first time all message')
                        $("#child").html(messageBody);


                        $(document).ready(function () {
                            $('#sc').animate({
                                scrollTop: $('#sc')[0].scrollHeight
                            }, 35000);
                        });

                        // $("#FixedHeightContainer").animate({ scrollTop: 180000/*$(document).height()*/ }, "fast");
                        current_page_no = 2;
                    }
                    // 2: get last message which just entered by admin
                    // load appuser last message
                    else if (message_load_type == 2 || message_load_type == 4) {
                        // alert('1:add last mesage')
                        var html_tag = $("#child");
                        html_tag.append(messageBody);

                        $(document).ready(function () {
                            $('#sc').animate({
                                scrollTop: $('#sc')[0].scrollHeight
                            }, 35000);
                        });




                        // $("#FixedHeightContainer").animate({ scrollTop: 180000/*$(document).height()*/ }, "fast");

                    }
                    else if (message_load_type == 3) { // 3: get load more messages
                        // alert('1:add more all message')
                        // need to specify the las message <li> and make the slide animation accoring to that li

                        $(document).ready(function () {
                            $('#sc').animate({
                                scrollTop: $('#sc')[0].scrollHeight
                            }, 35000);
                        });
                        /********************************************************************************** */
                        last_app_user_message = $('.receive_msg:first').attr('id').split('_');
                        last_appuser_message_id = last_app_user_message[3];
                        /**************************************************************************************** */
                        // $("#FixedHeightContainer").animate({ scrollTop: $(document).height() }, "fast");
                        var html_tag = $("#child");
                        html_tag.prepend(messageBody);
                        current_page_no++;
                    }
                    //alert($('.receive_msg:last').length)
                    if ($('.receive_msg:last').length > 0) {
                        //  alert('yes')
                        last_app_user_message = $('.receive_msg:last').attr('id').split('_');
                        last_appuser_message_id = last_app_user_message[3];

                        // alert( last_appuser_message_id)
                    }
                }
                else {
                    if (message_load_type == 1) {
                        // NO message yet,
                        $("#child").html("");
                    }
                }

                /**************===================================================== */



            }
        });

        $(".zoomImg").click(function () {
            var image_src = $(this).attr('src');
            $("#modalIMG").modal();
            $("#load_zoom_img").attr('src', image_src);
        });

    }

    /*-------------------------------USER CLICK MESSAGE SHOW----------------- */
    loadMessageUser = function loadMessageUser(app_user_id) {
        last_appuser_message_id = 0;
       // alert(app_user_id);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: url + "/message/view-user/" + app_user_id
            , success: function (response) {
                console.log("*****************************************************")

                console.log(response)
                var name = '';

                var html = '';

                var html1 = '';
                html1+=`<div>
                <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                    <div class="heading-avatar-icon">
                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png">
                    </div>
                </div>
                <div class="col-sm-8 col-xs-7 heading-name">
                    <a class="heading-name-meta">`+ response.data.name + `
                    </a>
                    <span class="heading-online common-class">Online</span>
                </div>
                <div class="col-sm-1 col-xs-1  heading-dot pull-right" >
                <button type="button"  onclick="loadMore()"  class="ml-2  btn btn-warning">
                Load More
            </button>
                </div>
               </div>`



                $("#headline").html(html1);

                var button = `<button type="button"  onclick="loadMore()"  class="ml-2  btn btn-warning">
                                 Load More
                             </button>`;
                $("#btn_load").html(button);

                var img = '';
                if (response.data.user_profile_image != null) {
                    //  img+= `<img width="82" src="`+admin_image_url+`'/'`+response.data.user_profile_image+`" alt="">`;
                    $("#app_user_image").attr('src', profile_image_url + response.data.user_profile_image);
                    //  $("#image_show").html(img);

                } else {
                    // img+= `<img width="82" src="`+demo_image_url+`" alt="">`;
                    // $("#image_show").html(img);
                    $("#app_user_image").attr('src', demo_image_url);

                }
                $("#app_user_id").val(response.data.id);

                // setMessageTimeOut();

               // viewMessage(response.data.id);
                loadMessages(1); // 1: all message dump

            }
        });

    }
    setMessageTimeOut = function setMessageTimeOut() {
        setTimeout(function () {
            newMessages();
        }, 5000);
    }


    newMessages = function newMessages() {
        if ($('.receive_msg:last').length > 0) {
            last_app_user_message = $('.receive_msg:last').attr('id').split('_');
            last_appuser_message_id = last_app_user_message[3];

        }
         loadMessages(4);


        setMessageTimeOut();
    }

    /*----------------------------loadMoreL------------------------------------ */
    loadMore = function loadMore() {
        if ($('.receive_msg:first').length > 0) {
            last_app_user_message = $('.receive_msg:first').attr('id').split('_');
            last_appuser_message_id = last_app_user_message[3];

        }
         loadMessages(3);
    }
    newMessages();

    /*----------------------------loadMore------------------------------------ */

    viewMessage = function viewMessage(message_from) {

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: url + "/message/view/" + message_from
            , success: function (response) {
                var response = JSON.parse(response);
                var message = response['message'];
                if (message > 0) {
                    console.log('*-*-*-*NO EMPTY MESSAGE-*-*-*-*');
                    messageNotification();
                    // localStorage.setItem('app_user_id', message_from);
                    // window.location.href = url + '/message';
                }
                console.log('*-*-*-*-*-*-*-*');
                console.log(message);

            }
        })
        // localStorage.setItem('app_user_id', message_from);

        // window.location.href = url + '/message';


    }






















    $("#search_user").keyup(function () {

        searchAppUsers();
        if ($("#search_user").val() == '') {
            loadUser()
        }
    });



    $("#message_sent_to_user").click(function () {
        event.preventDefault();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        newMsgSent();
    });


    newMsgSent = function newMsgSent() {
        // alert($('#app_user_id').val())
        var img = $("#attachment").val();

        var formData = new FormData($('#sent_message_to_user')[0]);

        if (($.trim($('#admin_message').val()) != "" || $.trim($('#attachment').val()) != "") && $.trim($('#app_user_id').val()) != "") {
            $.ajax({
                url: url + "/message/message-sent"
                , type: 'POST'
                , data: formData
                , async: true
                , cache: true
                , contentType: false
                , processData: false
                , success: function (data) {
                    console.log("--------------------------------------------------------------------------------------");
                    console.log(data);
                    console.log("--------------------------------------------------------------------------------------");
                    // need to confirmation
                    if ($('#edit_msg_id').val() != "") {
                        if (data == 1) {
                            $('#sent_message_id_' + $('#edit_msg_id').val() + '>div').html($.trim($('#admin_message').val()));
                        }
                    } else {
                        loadMessages(2); // 2: last message only
                    }

                    $("#attachment").val('');
                    $('#reply_msg_id').val('')
                    $('#reply_msg').html('')
                    $('#edit_msg_id').val('')
                    $('#admin_message').val("");
                    //$(".messages").animate({ scrollTop:1800000 /*$(document).height()*/ }, "fast");
                    loadUser();
                }
            });
        }
    }

    /*-------------------------MESSAGE IMAGE BUTTON JS-------------------------*/
    const realFileBtn = document.getElementById("attachment");
    const customBtn = document.getElementById("custom-button");
    const customTxt = document.getElementById("custom-text");

    customBtn.addEventListener("click", function () {
        realFileBtn.click();
    });


    $(document).ready(function () {
        $("#message_sent_to_user").click(function () {
            $('.table-responsive').animate({
                scrollTop: $("#child").offset().top
            }, 1500);
        });
    });
    $("a[href='#bottom']").click(function () {
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        return false;
    });





    $(document).ready(function () {
        $('#sc').animate({
            scrollTop: $('#sc')[0].scrollHeight
        }, 22000);
    });






});


