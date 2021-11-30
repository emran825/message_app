// All the Setting related js functions will be here
$(document).ready(function () {
    var url = $('.site_url').val();
    var number_of_msg = 5;
    var current_page_no = 1;
    var loaded = 1;
    var last_appuser_message_id = 0;




    var profile_image_url = url + "/assets/images/user/admin/";
    var demo_image_url = url + "/assets/images/user/admin/profile.png";
    var messageImage = url + "/assets/images/message/";

    console.log(profile_image_url);
    /*-----------------------------MESSAGE NOTIFICATION------------------------------------- */
    messageNotification = function messageNotification() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: url + '/message/message-notification'
            , success: function (response) {
                var response = JSON.parse(response);
                var message = response['message'];
                var count = response['count'];

                if (count > 0) {
                    $(".count").html(count);
                } else {
                    $(".count").html('');
                }

                if (!jQuery.isEmptyObject(message)) {
                    var html = '';
                    $.each(message, function (index, value) {

                        var date_time = moment(value.created_at).format("MMM Do YY");

                        message = (value.message).substr(0, 25) + '. . .'
                        console.log(value);
                        html += ' <li class="list-group-item d-flex justify-content-between align-items-center ">';
                        if (value.messagefrom_user.user_profile_image != null) {
                            html += ' <img src="' + profile_image + value.messagefrom_user.user_profile_image + '" alt="Avatar" class="avatar">';
                        }
                        else {
                            html += ' <img src="' + demo_image_url + '" alt="Avatar" class="avatar">';
                        }
                        html += '' + message + '';
                        html += ' <small class="opacity-6">';
                        html += ' <i class="fa fa-calendar-alt mr-1"></i>';
                        html += '' + date_time + '';
                        html += ' </small>';
                        html += '<span class="badge badge-info badge-pill message-view-btn" onclick="viewMessage(' + value.message_from + ')">' + value.message_from + '</span>';
                        html += '</li>';
                    })
                    $("#message_notification").html(html);
                } else {
                    $("#message_notification").html("");
                }





            }
        });

    }
    messageNotification();
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
                console.log(response.row);
                var messageBody = '';
                if (!jQuery.isEmptyObject(response.data)) {
                    // console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
                    // console.log(response.row);

                    // var message_to = '';

                    $.each(response.data, function (index, value) {
                        var message_to = '';
                        var date_time = moment(value.created_at).format("MMM Do YY");
                        if (value.messagefrom_user.id != response.id) {

                            message_to += '<div class="chat-box-wrapper receive_msg" id="receive_message_id_' + value.id + '" >';
                            message_to += ' <div id="message_to_image">';
                            message_to += ' <div class="avatar-icon-wrapper mr-1">';
                            message_to += '<div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg">';
                            message_to += ' </div>';
                            message_to += ' <div class="avatar-icon avatar-icon-lg rounded">';
                            if (value.messagefrom_user.user_profile_image != null) {
                                message_to += '<img  src="' + profile_image_url + value.messagefrom_user.user_profile_image + '" alt="">';
                            }
                            else {
                                message_to += '<img src="' + demo_image_url + '" alt="">';
                            }
                            message_to += ' </div>';
                            message_to += ' </div>';
                            message_to += ' </div>';
                            message_to += '<div class="row">';
                            if (value.message != null) {
                                message_to += ' <div class="chat-box col-md-12 ml-2">' + value.message + '</div>';
                            } else {
                                message_to += ' <div class="chat-box col-md-6 ml-2 message-image-div"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';
                            }
                            if (value.message == null) {

                            } else {
                                if (value.attachment != null) {
                                    message_to += ' <div class="chat-box col-md-6 ml-2 message-image-div"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';
                                }
                            }
                            message_to += ' <small class="opacity-6">';
                            message_to += ' <i class="fa fa-calendar-alt mr-1"></i>';
                            message_to += '' + date_time + '';
                            message_to += '</small>';


                            if (value.is_seen == 1) {
                                message_to += ' <small class="opacity-6">';
                                 message_to += ' <i class="fa fa-eye mr-1 edit-delete-icon" title="Message seen"></i>';


                                message_to += '</small>';
                            }
                            if (value.is_seen != 1) {
                                message_to += ' <small class="opacity-6">';
                                 message_to += ' <i class="fa fa-eye-slash mr-1 edit-delete-icon" title="Message not seen"></i>';
                                message_to+='seen'

                                message_to += '</small>';
                            }
                            message_to += '</div>';
                            message_to += ' </div>';

                        } else {


                            message_to += '<div class="container-fluid receive_msg" id="receive_message_id_' + value.id + '">';
                            message_to += '<div class="row">';
                            message_to += '<div class="col-md-12">'
                            message_to += '<div class="float-right chat-box-wrapper" style="padding-left: 382px;">';

                            message_to += '<div class="chat-box-wrapper chat-box-wrapper-right">';

                            message_to += '<div class="row">';
                            if (value.message != null) {
                                message_to += '<div class="chat-box col-md-12 ml-2">' + value.message + '</div>';

                            }
                            else {
                                message_to += '<div class="chat-box col-md-6 message-image-div ml-2"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';

                            }
                            if (value.message == null) {

                            } else {
                                if (value.attachment != null) {

                                    message_to += '<div class="chat-box col-md-6 message-image-div ml-2"><img class="message-image"  src="' + messageImage + value.attachment + '" alt=""></div>';
                                }
                            }



                            message_to += '<small class="opacity-6">';
                            message_to += '<i class="fa fa-calendar-alt mr-1"></i>';
                            message_to += ' ' + date_time + '';
                            message_to += '</small>';
                            if (value.is_seen == 1) {
                                message_to += ' <small class="opacity-6">';
                                 message_to += ' <i class="fa fa-eye mr-1 edit-delete-icon"></i>';


                                message_to += '</small>';
                            }
                            if (value.is_seen != 1) {
                                message_to += ' <small class="opacity-6">';
                                 message_to += ' <i class="fa fa-eye-slash mr-1 edit-delete-icon"></i>';


                                message_to += '</small>';
                            }

                            message_to += '</div>';
                            message_to += '<div>';
                            message_to += ' <div class="avatar-icon-wrapper ml-1">';
                            message_to += '<div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg">';
                            message_to += ' </div>';
                            message_to += ' <div class="avatar-icon avatar-icon-lg rounded">';
                            if (value.messagefrom_user.user_profile_image != null) {
                                message_to += '<img  src="' + profile_image_url + value.messagefrom_user.user_profile_image + '" alt="">';
                            }
                            else {
                                message_to += '<img src="' + demo_image_url + '" alt="">';
                            }
                            message_to += ' </div>';
                            message_to += ' </div>';
                            message_to += ' </div>';
                            message_to += ' </div>';
                            message_to += '</div>';
                            message_to += '</div>';
                            message_to += '</div>';
                            message_to += '</div>';

                        }
                        messageBody = message_to + messageBody;


                    });
                    // $("#message_view").html(message_to);
                }

                /************************************============================================ */
                if (messageBody != "") {
                    if (message_load_type == 1) { // 1: all message dump
                        //alert('1:first time all message')
                        $("#message_view").html(messageBody);


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
                        var html_tag = $("#message_view");
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
                        var html_tag = $("#message_view");
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
                        $("#message_view").html("");
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
    

    loadMessageUser = function loadMessageUser(app_user_id) {
        last_appuser_message_id = 0;
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
                if (response.data.type == 'School') {
                    name = response.data.school.name;
                    console.log(name)
                } else {
                    name = response.data.first_name;
                    console.log(name)
                }
                var html = '';
                html += `<div class="mobile-app-menu-btn">
                 <button type="button" class="hamburger hamburger--elastic">
                     <span class="hamburger-box">
                         <span class="hamburger-inner"></span>
                     </span>
                 </button>
             </div>
             <div class="avatar-icon-wrapper mr-2">
                 <div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg">
                 </div>
                 <div class="avatar-icon avatar-icon-xl rounded" id="image_show"><img id="app_user_image" src="" alt="" /></div>
             </div>
             <h4 class="mb-0 text-nowrap">
                 <a onclick="showProfile()" style="cursor:pointer; text-decoration: none;" id="app_user_name">`+ name + `</a>

                 <div class="opacity-7">Last Seen Online: <span class="opacity-8">10 minutes
                         ago</span></div>
             </h4>`;

                $("#name_show").html(html);

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
                loadMessages(1); // 1: all message dump
                // setMessageTimeOut();
                viewMessage(response.data.id);

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

    /*----------------------------loadMore------------------------------------ */

    newMessages();

    replyMessage = (id, msg) => {
        $('#reply_msg_id').val(id)
        $('#reply_msg').html(msg)
    }


    searchAppUsers = function searchAppUsers() {
        event.preventDefault();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var name = $("#search_user").val();

        if (name != "") {
            $.ajax({
                url: url + "/message/search-users",
                type: 'POST',
                data: { name: name },
                async: true,

                success: function (response) {



                    if (response.type == "Student") {


                        if (!jQuery.isEmptyObject(response.name)) {
                            var html = "";
                            $.each(response.name, function (index, u) {
                                console.log('-----------------------u------------------');

                                console.log(u);
                                if (u.type != "Student" && u.type != "Admin" && u.type != "School") {
                                    html += '<li class="nav-item"  onclick="loadMessageUser(' + u.id + ')">';
                                    html += '<button type="button" tabindex="0" class="dropdown-item">';
                                    html += '<div class="widget-content p-0">';
                                    html += '<div class="widget-content-wrapper">';
                                    html += '<div class="widget-content-left mr-3">';
                                    html += '<div class="avatar-icon-wrapper">';
                                    html += '<div class="badge badge-bottom badge-success badge-dot badge-dot-lg"></div>';
                                    html += '<div class="avatar-icon" id="profile_image`+index+`">';
                                    if (u.user_profile_image != null) {
                                        html += '<img  src="' + profile_image_url + u.user_profile_image + '" alt="">';
                                    }
                                    else {
                                        html += '<img src="' + demo_image_url + '" alt="">';
                                    }

                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += ' <div class="widget-content-left">';
                                    html += ' <div class="widget-heading">' + u.first_name + '</div>';
                                    html += '<div class="widget-subheading">' + u.type + '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</button>';
                                    html += '</li>';
                                }
                                // $.each(u, function (index, v) {
                                // })
                            });
                        }
                        $("#app_user_show").html(html);



                    } else {
                        if (!jQuery.isEmptyObject(response.name)) {
                            var html = "";
                            $.each(response.name, function (index, u) {
                                console.log('-----------------------u------------------');
                                var keystage = u.student.student_classes.classes.key_stages.name;
                                console.log('-------------------keystage------------------');
                                console.log(keystage);
                                var classname = u.student.student_classes.classes.name;
                                console.log(classname);

                                console.log(u);
                                if (u.type != "Teacher" && u.type != "Admin" && u.type != "School") {
                                    html += '<li class="nav-item"  onclick="loadMessageUser(' + u.id + ')">';
                                    html += '<button type="button" tabindex="0" class="dropdown-item">';
                                    html += '<div class="widget-content p-0">';
                                    html += '<div class="widget-content-wrapper">';
                                    html += '<div class="widget-content-left mr-3">';
                                    html += '<div class="avatar-icon-wrapper">';
                                    html += '<div class="badge badge-bottom badge-success badge-dot badge-dot-lg"></div>';
                                    html += '<div class="avatar-icon" id="profile_image`+index+`">';
                                    if (u.user_profile_image != null) {
                                        html += '<img  src="' + profile_image_url + u.user_profile_image + '" alt="">';
                                    }
                                    else {
                                        html += '<img src="' + demo_image_url + '" alt="">';
                                    }

                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += ' <div class="widget-content-left">';
                                    html += ' <div class="widget-heading">' + u.first_name + '</div>';
                                    html += '<div class="widget-subheading">' + u.type + ' (' + classname + ',' + keystage + ')</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</button>';
                                    html += '</li>';
                                }
                                // $.each(u, function (index, v) {
                                // })
                            });
                        }
                        $("#student_show").html(html);
                    }



                    console.log('-----------response-----------------------');
                    console.log(name);









                }
            });



        }
    }

    /*--------------------------------ALL USER SHOW---------------------------*/
    loadUser = function loadUser() {
        $.ajax({
            url: url + '/message/load-user'
            , success: function (response) {
                var response = JSON.parse(response);
                var data = response['data'];
                var student = response['student'];
                var schoolAdmin = response['admin']
                var schoolMember = response['schoolMember']

                console.log(schoolMember);
                /*-----------------------------------TEACHER STUDENT VIEW------------------------------------ */
                if (!jQuery.isEmptyObject(schoolMember)) {
                    var html = '';
                    $.each(schoolMember, function (index, value) {
                        console.log("-------------schoolMember----------------");
                        console.log(value);

                        html += '<li class="nav-item contact"  onclick="loadMessageUser(' + value.id + ')" >';
                        html += '<button type="button" tabindex="0" class="dropdown-item">';
                        html += '<div class="widget-content p-0">';
                        html += '<div class="widget-content-wrapper">';
                        html += '<div class="widget-content-left mr-3">';
                        html += '<div class="avatar-icon-wrapper">';
                        if (value.status != 0) {
                            html += '<div class="badge badge-bottom badge-success badge-dot badge-dot-lg"></div>';
                        } else {
                            html += '<div class="badge badge-bottom badge-danger badge-dot badge-dot-lg"></div>';
                        }

                        html += '<div class="avatar-icon" id="profile_image`+index+`">';
                        if (value.user_profile_image != null) {
                            html += '<img  src="' + profile_image_url + value.user_profile_image + '" alt="">';
                        }
                        else {
                            html += '<img src="' + demo_image_url + '" alt="">';
                        }

                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += ' <div class="widget-content-left">';
                        html += ' <div class="widget-heading">' + value.first_name + '</div>';
                        html += '<div class="widget-subheading">' + value.type + '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</button>';
                        html += '</li>';
                    });

                }
                $("#school_admin").html(html);
                /*-----------------------------------ADMIN VIEW------------------------------------ */

                if (!jQuery.isEmptyObject(schoolAdmin)) {
                    var html = ' ';

                    html += '<li class="nav-item contact"  onclick="loadMessageUser(' + schoolAdmin.id + ')">';
                    html += '<button type="button" tabindex="0" class="dropdown-item">';
                    html += '<div class="widget-content p-0">';
                    html += '<div class="widget-content-wrapper">';
                    html += '<div class="widget-content-left mr-3">';
                    html += '<div class="avatar-icon-wrapper">';
                    if (schoolAdmin.status != 0) {
                        html += '<div class="badge badge-bottom badge-success badge-dot badge-dot-lg"></div>';
                    } else {
                        html += '<div class="badge badge-bottom badge-danger badge-dot badge-dot-lg"></div>';
                    }

                    html += '<div class="avatar-icon" id="profile_image`+index+`">';
                    if (schoolAdmin.user_profile_image != null) {
                        html += '<img  src="' + profile_image_url + schoolAdmin.user_profile_image + '" alt="">';
                    }
                    else {
                        html += '<img src="' + demo_image_url + '" alt="">';
                    }

                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += ' <div class="widget-content-left">';
                    html += ' <div class="widget-heading">' + schoolAdmin.school.name + '</div>';
                    html += '<div class="widget-subheading"></div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</button>';
                    html += '</li>';



                }
                $("#admin_show").html(html);
                /*----------------------------------STUDENT PRINT--------------------------------- */
                if (!jQuery.isEmptyObject(student)) {

                    var html = '';
                    $.each(student, function (index, value) {

                        var student = value["class_subject"]['student_subject'];
                        var className = value["class_subject"];
                        var keystage = className.classes.key_stages.name;
                        var classname = className.classes.name;
                        var subjectName = className.subjects.subject_name

                        $.each(student, function (index, t) {
                            console.log('-----------T-------------------');
                            console.log(t);
                            var student_name = t.student.users;

                            $.each(student_name, function (index, u) {
                                console.log('------------------------------------------')
                                console.log(u.first_name);

                                if (u.type != "Teacher") {
                                    html += '<li class="nav-item contact"  onclick="loadMessageUser(' + u.id + ')">';
                                    html += '<button type="button" tabindex="0" class="dropdown-item">';
                                    html += '<div class="widget-content p-0">';
                                    html += '<div class="widget-content-wrapper">';
                                    html += '<div class="widget-content-left mr-3">';
                                    html += '<div class="avatar-icon-wrapper">';
                                    if (u.status != 0) {
                                        html += '<div class="badge badge-bottom badge-success badge-dot badge-dot-lg"></div>';
                                    } else {
                                        html += '<div class="badge badge-bottom badge-danger badge-dot badge-dot-lg"></div>';
                                    }

                                    html += '<div class="avatar-icon" id="profile_image`+index+`">';
                                    if (u.user_profile_image != null) {
                                        html += '<img  src="' + profile_image_url + u.user_profile_image + '" alt="">';
                                    }
                                    else {
                                        html += '<img src="' + demo_image_url + '" alt="">';
                                    }

                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += ' <div class="widget-content-left">';
                                    html += ' <div class="widget-heading">' + u.first_name + '</div>';
                                    html += '<div class="widget-subheading">' + subjectName + ' (' + classname + ',' + keystage + ')</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</button>';
                                    html += '</li>';
                                }


                            });

                        });

                    });
                }
                $("#student_show").html(html);

                /*----------------------------------TEACHER PRINT--------------------------------- */
                if (!jQuery.isEmptyObject(data)) {

                    var html = '';
                    $.each(data, function (index, value) {

                        var teacher = value["class_subject"]['teacher_subject'];

                        $.each(teacher, function (index, t) {
                            var user = t.teacher.users;
                            $.each(user, function (index, u) {
                                console.log('------------------------------------------')
                                console.log(u.first_name);
                                if (u.type != "Student") {
                                    html += '<li class="nav-item contact"  onclick="loadMessageUser(' + u.id + ')">';
                                    html += '<button type="button" tabindex="0" class="dropdown-item">';
                                    html += '<div class="widget-content p-0">';
                                    html += '<div class="widget-content-wrapper">';
                                    html += '<div class="widget-content-left mr-3">';
                                    html += '<div class="avatar-icon-wrapper">';
                                    if (u.status != 0) {
                                        html += '<div class="badge badge-bottom badge-success badge-dot badge-dot-lg"></div>';

                                    } else {
                                        html += '<div class="badge badge-bottom badge-danger badge-dot badge-dot-lg">hhxc</div>';
                                    }

                                    html += '<div class="avatar-icon" id="profile_image`+index+`">';
                                    if (u.user_profile_image != null) {
                                        html += '<img  src="' + profile_image_url + u.user_profile_image + '" alt="">';
                                    }
                                    else {
                                        html += '<img src="' + demo_image_url + '" alt="">';
                                    }

                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += ' <div class="widget-content-left">';
                                    html += ' <div class="widget-heading">' + u.first_name + '</div>';
                                    html += '<div class="widget-subheading">' + u.type + '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</button>';
                                    html += '</li>';
                                }



                            });

                        });

                    });
                }
                $("#app_user_show").html(html);

                if (localStorage.getItem('app_user_id')) {
                    var aa = $('#app_user_id').val(localStorage.getItem('app_user_id'))

                    loadMessageUser(localStorage.getItem('app_user_id'))
                    localStorage.removeItem('app_user_id')
                } else if (loaded == 1) {
                    $('.contact:first').trigger('click');
                    loaded++;
                }
            }
        });
    }
    loadUser();

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
                scrollTop: $("#message_view").offset().top
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

