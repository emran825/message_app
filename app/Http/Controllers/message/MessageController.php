<?php

namespace App\Http\Controllers;

use App\Models\ClassSubject;
use App\Models\Message;

use App\Models\Student;
use App\Models\StudentClass;
use App\Models\StudentSubject;
use App\Models\Teacher;
use App\Models\TeacherSubject;
use App\Models\User;
use App\Traits\HasPermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{

    use HasPermission;
    public function __construct(Request $request)
    {
        $this->page_title   = $request->route()->getName();
        $description        = \Request::route()->getAction();
        $this->page_desc    = isset($description['desc']) ? $description['desc'] : $this->page_title;
    }
    public function index()
    {
        $data['page_title']     = $this->page_title;
        $data['module_name']    = " Message & Notification";
        $data['sub_module']        = "Message";
        $data['schoolName']  = Auth::user()->school->name;


        $admin_user_id          = Auth::user()->id;
        $add_action_id          = 128;
        $add_permission         = $this->PermissionHasOrNot($admin_user_id, $add_action_id);
        $data['actions']['add_permission'] = $add_permission;
        return view('notice.chat', $data);
    }
    ## Load app user for message
    public function loadUser()
    {
        $return_arr = array();
        $userId = Auth::user()->typable_id;
        $schoolId = Auth::user()->school_id;
        $type =  Auth::user()->type;
        /*------------------------------------------ADMIN SHOW------------------------------------------------ */
        $schoolAdmin = User::where([
            ['school_id', '=', $schoolId],
            ['type', '=', 'School']
        ])
            ->with('school')
            ->first();
        /*------------------------------------------FIND TEACHER STUDENT--------------------------------------- */
        $schoolMember = User::where([
            ['school_id', '=', $schoolId],
            ['type', '!=', 'School']
        ])
            ->with('school')
            ->orderBy('type', 'asc')
            ->get();

        /*------------------------------------------FIND TEACHER------------------------------------------------*/
        $teacherName = StudentSubject::where('student_id', '=', $userId)
            ->groupBy('id')
            ->with('class_subject.teacher_subject.teacher.users')
            ->get();
        /*------------------------------------------FIND STUDENT ------------------------------------------------*/
        $studentName = TeacherSubject::where('teacher_id', '=', $userId)
            ->groupBy('id')
            ->with('class_subject.subjects', 'class_subject.classes.key_stages', 'class_subject.classes', 'class_subject.student_subject.student.users')
            ->get();


        return json_encode(array('data' => $teacherName, 'student' => $studentName, 'admin' => $schoolAdmin, 'schoolMember' => $schoolMember));
    }


    public function loadMessage()
    {
        $appUserIdLoadMsg       = $_POST['app_user_id_load_msg'];
        $pageNo                    = $_POST['page_no'];
        $limit                      = $_POST['limit'];
        $messageLoadType          = $_POST['message_load_type'];
        $lastUserMessageId    = $_POST['last_appuser_message_id'];
        $start = ($pageNo * $limit) - $limit;
        $end   = $limit;
        // $message = array();
        // message_load_type
        // 1: all message dump first time
        // 2: get last message which just entered by admin
        // 3: get load more messages
        // 4: get appusers latest message
        // $message = MessageMaster::where('message_from','=',Auth::user()->id);
        // return response()->json(['data' => $message ]);

        // message_load_type
        // 1: all message dump first time
        // 2: get last message which just entered by admin
        // 3: get load more messages
        // 4: get appusers latest message



        if ($messageLoadType == 1) {

            /**------------------------------------------------------------- */
            $type =  Auth::user()->type;
            if ($type == "School") {

                $schoolId = Auth::user()->school_id;
                $schoolAdmin = User::where([
                    ['school_id', '=', $schoolId],
                    ['type', '=', 'School']
                ])
                    ->with('school')
                    ->first();
                $currentId = $schoolAdmin->id;


                $userId =  $appUserIdLoadMsg;
                $message = Message::where([
                    ['message_from', '=',  $currentId],
                    ['message_to', '=', $userId]
                ])
                    ->orWhere([
                        ['message_to', '=',  $currentId],
                        ['message_from', '=', $userId]
                    ])
                    ->groupBy('id')
                    ->with('messagefrom_user')

                    ->orderBy('created_at', 'desc')

                    ->offset($start)
                    ->limit($end)
                    ->get();
                return response()->json(['data' => $message, 'id' => $currentId]);
            } else {
                $id = Auth::user()->id;
                $userId =  $appUserIdLoadMsg;
                $message = Message::where([
                    ['message_from', '=',  $id],
                    ['message_to', '=', $userId]
                ])
                    ->orWhere([
                        ['message_to', '=',  $id],
                        ['message_from', '=', $userId]
                    ])
                    ->groupBy('id')
                    ->with('messagefrom_user')

                    ->orderBy('created_at', 'desc')

                    ->offset($start)
                    ->limit($end)
                    ->get();
                return response()->json(['data' => $message, 'id' => $id]);
            }
        } else if ($messageLoadType == 2) {
            $type =  Auth::user()->type;
            if ($type == "School") {

                $schoolId = Auth::user()->school_id;
                $schoolAdmin = User::where([
                    ['school_id', '=', $schoolId],
                    ['type', '=', 'School']
                ])
                    ->with('school')
                    ->first();
                $currentId = $schoolAdmin->id;


                $userId =  $appUserIdLoadMsg;
                $message = Message::where([
                    ['message_from', '=',  $currentId],
                    ['message_to', '=', $userId]
                ])
                    ->orWhere([
                        ['message_to', '=',  $currentId],
                        ['message_from', '=', $userId]
                    ])
                    ->groupBy('id')
                    ->with('messagefrom_user')
                    ->orderBy('created_at', 'desc')
                    ->limit(1)

                    ->get();

                return response()->json(['data' => $message, 'id' => $currentId]);
            } else {
                $id = Auth::user()->id;
                $userId =  $appUserIdLoadMsg;
                $message = Message::where([
                    ['message_from', '=',  $id],
                    ['message_to', '=', $userId]
                ])
                    ->orWhere([
                        ['message_to', '=',  $id],
                        ['message_from', '=', $userId]
                    ])
                    ->groupBy('id')
                    ->with('messagefrom_user')

                    ->groupBy('id')
                    ->with('messagefrom_user')
                    ->orderBy('created_at', 'desc')
                    ->limit(1)

                    ->get();

                return response()->json(['data' => $message, 'id' => $id]);
            }
        } else if ($messageLoadType == 3) {


            $type =  Auth::user()->type;
            if ($type == "School") {

                $schoolId = Auth::user()->school_id;
                $schoolAdmin = User::where([
                    ['school_id', '=', $schoolId],
                    ['type', '=', 'School']
                ])
                    ->with('school')
                    ->first();
                $currentId = $schoolAdmin->id;


                $userId =  $appUserIdLoadMsg;

                $message = Message::where([
                    ['message_from', '=',  $currentId],
                    ['message_to', '=', $userId],
                    ['id', '<', $lastUserMessageId]


                ])
                    ->orWhere([
                        ['message_to', '=',  $currentId],
                        ['message_from', '=', $userId],
                        ['id', '<', $lastUserMessageId]

                    ])
                    // ->orWhere('id', '<', $newlastAppuserMessageId)

                    ->with('messagefrom_user')
                    ->orderBy('id', 'desc')
                    ->limit(5)

                    ->get();

                return response()->json(['data' => $message, 'id' => $currentId]);
            } else {
                $id = Auth::user()->id;
                $userId =  $appUserIdLoadMsg;

                    $message = Message::where([
                        ['message_from', '=',  $id],
                        ['message_to', '=', $userId],
                        ['id', '<', $lastUserMessageId]
                         ])
                        ->orWhere([

                            ['message_to', '=',  $id],
                            ['message_from', '=', $userId],
                            ['id', '<', $lastUserMessageId]

                        ])

                        ->with('messagefrom_user')
                        ->orderBy('id', 'desc')
                        ->limit(5)

                        ->get();




                    return response()->json(['data' => $message, 'id' => $id,'row'=> $lastUserMessageId]);


            }
        } else if ($messageLoadType == 4) {

            $type =  Auth::user()->type;
            if ($type == "School") {

                $schoolId = Auth::user()->school_id;
                $schoolAdmin = User::where([
                    ['school_id', '=', $schoolId],
                    ['type', '=', 'School']
                ])
                    ->with('school')
                    ->first();
                $currentId = $schoolAdmin->id;


                $userId =  $appUserIdLoadMsg;

                $message = Message::where([
                    ['message_from', '=',  $userId],
                    ['message_to', '=', $currentId],
                    ['id', '>', $lastUserMessageId]

                ])
                    ->groupBy('id')
                    ->with('messagefrom_user')

                    ->groupBy('id')
                    ->with('messagefrom_user')
                    ->orderBy('created_at', 'desc')

                    ->get();

                return response()->json(['data' => $message, 'id' => $currentId]);
            } else {
                $id = Auth::user()->id;
                $userId =  $appUserIdLoadMsg;
                $message = Message::where([
                    ['message_from', '=',  $userId],
                    ['message_to', '=',  $id],
                    ['id', '>', $lastUserMessageId]

                ])
                    ->groupBy('id')
                    ->with('messagefrom_user')

                    ->groupBy('id')
                    ->with('messagefrom_user')
                    ->orderBy('created_at', 'desc')

                    ->get();

                return response()->json(['data' => $message, 'id' => $id]);
            }
        }
    }
    public function userView($id)
    {
        // $data = User::find($id);
        $data = User::where('id', '=', $id)->with('school')->first();
        // $groups =  DB::table('user_group_members as ugm')
        // 			->leftJoin('user_groups as ug', 'ugm.group_id', '=', 'ug.id')
        // 			->select(DB::raw('group_concat("", ug.group_name, "") AS group_name'))
        // 			->where('ugm.app_user_id', $id)
        // 			->where('ugm.status', 1)
        // 			->get();


        // return json_encode(array(
        // 	'data'=>$data,
        // 	 'groups'=>$groups,
        // ));
        return response()->json(['data' => $data]);
    }

    public function newMsgSent(Request $r)
    {
        $type =  Auth::user()->type;


        if ($type == "School") {

            $schoolId = Auth::user()->school_id;
            $schoolAdmin = User::where([
                ['school_id', '=', $schoolId],
                ['type', '=', 'School']
            ])

                ->first();
            $message_from = $schoolAdmin->id;
        } else {
            $message_from = Auth::user()->id;
        };
        $message = Message::create([
            'message' =>  $r['admin_message'],

            'message_from' => $message_from,
            'message_to' =>  $r['app_user_id'],

        ]);
        $mm_id = $message->id;
        $photo = (isset($r['attachment']) && $r['attachment'] != "") ? $r['attachment'] : "";
        if ($photo != "") {
            $ext = $photo->getClientOriginalExtension();
            $photoFullName = $photo->getClientOriginalName() . time() . '.' . $ext;
            $uploadPath = 'assets/images/message/';
            $success = $photo->move($uploadPath, $photoFullName);
            $message->attachment = $photoFullName;
            $message->update();
        }
        DB::commit();
        return $mm_id;
    }


    public function searchUsers()
    {
        $searchUserName = $_POST['name'];
        $type = Auth::user()->type;
        /*------------------------------------------FIND TEACHER------------------------------------------------- */
        $teacherName = User::where('first_name', 'like', '%' . $searchUserName . '%')
            ->orwhere('contact_no', 'like', '%' . $searchUserName . '%')
            ->orwhere('email', 'like', '%' . $searchUserName . '%')
            ->groupBy('id')
            ->with('student.student_classes.classes.key_stages', 'student.student_classes.classes')
            ->get();


        return response()->json(['type' => $type, 'name' => $teacherName]);
    }



    public function messageNotification()
    {

        $type =  Auth::user()->type;
        if ($type == "School") {

            $schoolId = Auth::user()->school_id;
            $schoolAdmin = User::where([
                ['school_id', '=', $schoolId],
                ['type', '=', 'School']
            ])
                ->with('school')
                ->first();
            $currentId = $schoolAdmin->id;

            $count = Message::where([
                                        ['is_seen', '=', 0],
                                        ['message_to', '=',$currentId]
                                        ]) ->groupBy('message_from')
                                        ->with('messagefrom_user')
                                        ->orderBy('created_at', 'desc')
                                        ->get()
                                        ->count();

            $message = Message::where([
                                        ['is_seen', '=', 0],
                                        ['message_to', '=', $currentId]
                                                ])
                                                    ->groupBy('message_from')
                                                    ->with('messagefrom_user')
                                                    ->orderBy('created_at', 'desc')
                                                    ->get();
                return json_encode(array('message' => $message, 'count' => $count));


        }else{
            $message_to = Auth::user()->id;

            $count = Message::where([
                ['is_seen', '=', 0],
                ['message_to', '=', $message_to]
            ])
                ->groupBy('message_from')
                ->with('messagefrom_user')
                ->orderBy('created_at', 'desc')
                ->get()
                ->count();

            $message = Message::where([
                ['is_seen', '=', 0],
                ['message_to', '=', $message_to]
            ])
                ->groupBy('message_from')
                ->with('messagefrom_user')
                ->orderBy('created_at', 'desc')
                ->get();
            return json_encode(array('message' => $message, 'count' => $count));
        }






    }

    public function messageView($message_from)
    {
      //  dd($message_from);
        $type =  Auth::user()->type;
        if ($type == "School") {
            $schoolId = Auth::user()->school_id;
            $schoolAdmin = User::where([
                ['school_id', '=', $schoolId],
                ['type', '=', 'School']
            ])
                ->with('school')
                ->first();
            $currentId = $schoolAdmin->id;//Admin id get
            $update =    Message::where([
                ['message_to',  $currentId],
                ['message_from', $message_from]
                 ])->update(['is_seen' => 1]);
                 if($update){

                     return json_encode(array('message' => $update, ));
                    // return \Redirect::route('check', $message_from);
                 }
        }else{
            $update =    Message::where([
                ['message_to', Auth::user()->id],
                ['message_from', $message_from]

            ])->update(['is_seen' => 1]);
            if($update){
                return json_encode(array('message' => $update, ));

             }

        }
    }


    public function sentMessageIndex(){
        $data['page_title']     = $this->page_title;
        $data['module_name']    = " Message & Notification";
        $data['sub_module']        = "Sent Message";
        $admin_user_id          = Auth::user()->id;
         $data['studentName']  = User::where([
                                                ['id',$admin_user_id ],

                                                 ])->get();
         $data['teacherName']  = Auth::user()->school->name;
         $data['schoolAdmin']  = Auth::user()->school->name;



        $add_action_id          = 132;
        $add_permission         = $this->PermissionHasOrNot($admin_user_id, $add_action_id);
        $data['actions']['add_permission'] = $add_permission;
        return view('notice.sent-message', $data);
    }




}
