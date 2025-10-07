<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:15',
        ]);
        $phone = $request->phone;
        // Pastikan 0 diawal nomor diubah ke 62
        if (substr($phone, 0, 1) === '0') {
            $phone = '+62' . substr($phone, 1);
        } elseif (substr($phone, 0, 2) === '62') {
            $phone = '+'.$phone; // Nomor sudah benar
        } else {
            // Jika nomor tidak diawali dengan 0 atau 62, tambahkan 62 di depannya
            $phone = '+62' . $phone;
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, // Default role for new users
            'phone' => $phone,
        ]);

        event(new Registered($user));

        //Auth::login($user);
        return response()->json([
            'message' => 'Staff berhasil ditambahkan!',
            'data' => $user
        ]);
        //return redirect(route('kelolaStaff', absolute: false));
    }
}
