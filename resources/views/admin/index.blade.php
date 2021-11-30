@extends('home')
@section('style')

<link rel="stylesheet" href="{{ asset('message/css/style.css') }}">
{{-- <link href="{{ asset('assets/main.8d288f825d8dffbbe55e.css') }}" rel="stylesheet"> --}}
@endsection
@section('content')

<section>


    <div class="container app" >
        <div class="row app-one">
            <div class="col-sm-4 side sideone">
                <div class="side-one">
                    <div class="row heading">
                        <div class="col-sm-3 col-xs-3 heading-avatar">
                            <div class="heading-avatar-icon">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png">
                            </div>
                        </div>

                        <div class="col-sm-9 col-xs-9 sideBar-main">
                            <div class="row">
                                <div class="col-sm-8 col-xs-8 sideBar-name">
                                    <span class="name-meta common-class">{{ Auth::user()->name }}
                                    </span>
                                </div>
                                <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
                                    <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                                </div>
                                <div class="col-sm-2 col-xs-2 heading-compose  pull-right">
                                    <i class="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row searchBox">
                        <div class="col-sm-12 searchBox-inner">
                            <div class="form-group has-feedback">
                                <input id="searchText" type="text" class="form-control" name="searchText" placeholder="Search">

                            </div>
                        </div>
                    </div>

                    <div class="row sideBar">
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar4.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar5.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sideBar-body">
                            <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                <div class="avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar4.png">
                                </div>
                            </div>
                            <div class="col-sm-9 col-xs-9 sideBar-main">
                                <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                        <span class="name-meta common-class">John Doe
                                        </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                        <span class="time-meta pull-right common-class">18:18
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div class="col-sm-8  conversation " id="sidetwo" >



                <div class="row heading " id="headline" >
                   {{-- <div>
                    <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                        <div class="heading-avatar-icon">
                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png">
                        </div>
                    </div>
                    <div class="col-sm-8 col-xs-7 heading-name">
                        <a class="heading-name-meta">John Doe
                        </a>
                        <span class="heading-online common-class">Online</span>
                    </div>
                    <div class="col-sm-1 col-xs-1  heading-dot pull-right">
                        <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                    </div>
                   </div> --}}
                </div>

                <div class="row message scroll-div" id="conversation" >
                    <div id="child" style="height:70%;">




                    </div>

                </div>


                <div class="row reply" id="replymessage" >
                    <form id="sent_message_to_user" name="sent_message_to_user" enctype="multipart/form-data" class="form form-horizontal form-label-left">
                        @csrf

                    <div class="col-sm-1 col-xs-1 reply-emojis">
                        {{-- <i class="fa fa-smile-o fa-2x"></i> --}}
                    </div>
                    <div class="col-sm-9 col-xs-9 reply-main">
                        <input type="hidden" id="edit_msg_id" name="edit_msg_id">
                        <input type="hidden" name="app_user_id" id="app_user_id"/>
                        <textarea class="form-control" rows="1" name="admin_message" id="admin_message"></textarea>
                    </div>
                    <div class="col-sm-1 col-xs-1 reply-recording">
                        <button type="button" id="custom-button" style="margin: 3px"> <i class="fa fa-paperclip " aria-hidden="true"></i></button>

                        <input type="file" id="attachment" name="attachment" style="display:none" />
                    </div>
                    <div class="col-sm-1 col-xs-1 reply-send">
                        <button class="btn btn-success border-radious-0" type="submit" class="submit" id="message_sent_to_user"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </form>


                    {{-- <form id="sent_message_to_user" name="sent_message_to_user" enctype="multipart/form-data" class="form form-horizontal form-label-left">
                        @csrf
                        <p id="reply_msg" class="replied_message_p"></p>
                        <input type="hidden" id="edit_msg_id" name="edit_msg_id">
                        <div class="input-group">

                            <input type="hidden" name="app_user_id" id="app_user_id">
                            <input placeholder="Write here and hit enter to send..." name="admin_message" id="admin_message" type="text" class="form-control-lg form-control">

                            <button type="button" id="custom-button"> <i class="fa fa-paperclip " aria-hidden="true"></i></button>

                            <input type="file" id="attachment" name="attachment" hidden="hidden" />


                            <input type="hidden" id="reply_msg_id" name="reply_msg_id">
                            <button class="btn btn-success border-radious-0" type="submit" class="submit" id="message_sent_to_user"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                        </div>
                    </form> --}}




                </div>


            </div>

        </div>

    </div>


</section>


@endsection

@section('JScript')
      {{-- moment js --}}

      <script src="{{ asset('assets/js/moment.js')}}"></script>
      <script src="{{ asset('assets/js/moment-with-locales.js')}}"></script>
      <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>



<script src="{{ asset('message/js/message.js')}}"></script>
{{-- <script type="text/javascript" src="{{ asset('assets/scripts/main.8d288f825d8dffbbe55e.js') }}"></script> --}}


@endsection

