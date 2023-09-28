<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'login',
                'register'
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|min:4|max:20',
            'email' => 'unique:users,email|required|email',
            'password' => 'required|min:6|max:12|confirmed'
        ], [
            'name.required' => 'お名前を入力してください。',
            'name.min' => 'お名前を4文字以上入力してください。',
            'name.max' => 'お名前を20文字以下入力してください。',
            'email.unique' => 'このメールアドレスはすでに登録しました。',
            'email.required' => 'メールアドレスを入力してください。',
            'email.email' => 'メールアドレスの形ではないです。',
            'password.required' => 'パスワードを入力してください。',
            'password.min' => 'パスワードを6文字以上入力してください。',
            'password.max' => 'パスワードを12文字以上入力してください。',
            'password.confirmed' => 'パスワードとパスワードの確認が一致しません。',
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Register Succed!',
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        $email = $request->email;
        $password = $request->password;

        if ($token = Auth::attempt(['email' => $email, 'password' => $password], true)) {
            return $this->respondWithToken($token);
        } else {
            return response()->json(['error' => 'Wrong email or password!'], 401);
        }
    }

    public function profile()
    {
        return response()->json(auth()->user());
    }

    public function refresh()
    {
        $newToken = Auth::refresh();
        return $this->respondWithToken($newToken);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'message' => 'Loged out'
        ]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
        ])->withCookie(Cookie::make('token', $token, 1));
    }
}
