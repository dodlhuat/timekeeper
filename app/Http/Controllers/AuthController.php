<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller {
    /**
     * Handles Login Request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request) {
        $credentials = ['email' => $request->email, 'password' => $request->password];

        if (auth()->attempt($credentials)) {
            $tokens = auth()->user()->tokens;
            foreach ($tokens as $token) {
                // remove all old tokens
                $token->delete();
            }

            $token = auth()->user()->createToken('Timekeeper')->accessToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
