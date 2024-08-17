<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Posts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Posts::with('user')->get();
        return Inertia::render('Posts/Index', ['posts' => PostResource::collection($posts)]);
    }

    public function store(Request $request)
    {
        dd($request->all());
    }
}
