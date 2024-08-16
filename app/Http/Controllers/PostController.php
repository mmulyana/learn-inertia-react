<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Posts::all();
        return Inertia::render('Posts/Index', ['posts' => $posts]);
    }
}
