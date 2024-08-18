<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Posts;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Posts::with('user')->latest()->get();
        return Inertia::render('Posts/Index', ['posts' => PostResource::collection($posts)]);
    }

    public function store(StorePostRequest $request)
    {
        auth()->user()->posts()->create(
            $request->validated()
        );

        return redirect()->route('posts.index')
            ->with('success', 'Success!!');
    }
}
