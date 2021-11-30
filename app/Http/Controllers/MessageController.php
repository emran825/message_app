<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function loadUser()
    {
        $userId = Auth::user()->id;
        $allUser = User::where('id', '!=', $userId)->get();
        return json_encode(array('data' =>  $allUser));
    }
    ## Load app user for message


    public function userView($id)
    {
        $data = User::where('id', '=', $id)->first();
        return response()->json(['data' => $data]);
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
                ->orderBy('created_at', 'desc')
                ->offset($start)
                ->limit($end)
                ->get();
            return response()->json(['data' => $message, 'id' => $id]);
        }








        else if ($messageLoadType == 2) {
            $type =  Auth::user()->type;


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
                   // ->groupBy('id')
                    // ->with('messagefrom_user')

                    // ->groupBy('id')
                    // ->with('messagefrom_user')
                    ->orderBy('id', 'desc')
                    ->limit(1)

                    ->get();

                return response()->json(['data' => $message, 'id' => $id]);

        }







        else if ($messageLoadType == 3) {

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
                    ->orderBy('id', 'desc')
                    ->limit(5)
                    ->get();

                return response()->json(['data' => $message, 'id' => $id, 'row' => $lastUserMessageId]);

        }










        else if ($messageLoadType == 4) {

            $type =  Auth::user()->type;
            // if ($type == "School") {

            //     $schoolId = Auth::user()->school_id;
            //     $schoolAdmin = User::where([
            //         ['school_id', '=', $schoolId],
            //         ['type', '=', 'School']
            //     ])
            //         ->with('school')
            //         ->first();
            //     $currentId = $schoolAdmin->id;


            //     $userId =  $appUserIdLoadMsg;

            //     $message = Message::where([
            //         ['message_from', '=',  $userId],
            //         ['message_to', '=', $currentId],
            //         ['id', '>', $lastUserMessageId]

            //     ])
            //         ->groupBy('id')
            //         ->with('messagefrom_user')

            //         ->groupBy('id')
            //         ->with('messagefrom_user')
            //         ->orderBy('created_at', 'desc')

            //         ->get();

            //     return response()->json(['data' => $message, 'id' => $currentId]);
            // } else {
                $id = Auth::user()->id;
                $userId =  $appUserIdLoadMsg;
                $message = Message::where([
                    ['message_from', '=',  $userId],
                    ['message_to', '=',  $id],
                    ['id', '>', $lastUserMessageId]

                ])
                    // ->groupBy('id')
                    // ->with('messagefrom_user')

                    // ->groupBy('id')
                    // ->with('messagefrom_user')
                    ->orderBy('id', 'desc')

                    ->get();

                return response()->json(['data' => $message, 'id' => $id]);
            // }
        }
    }


    public function newMsgSent(Request $r)
    {
 //return $r['app_user_id'];
        $message_from = Auth::user()->id;
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
