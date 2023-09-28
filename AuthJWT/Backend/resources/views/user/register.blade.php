@extends('layout')

@section('content')
    <div class="container">
        <h1>Register</h1>
        @foreach ($errors->all() as $error)
                <li class="alert alert-danger">{{ $error }}</li>
        @endforeach
        <form action="{{ route('auth.register') }}" method="POST">
            @csrf
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="email" value="{{ old('email')}}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
                <label for="confirmationPassword" class="form-label">Confirmation Password</label>
                <input type="password" name="password_confirmation" class="form-control" id="confirmationPassword" aria-describedby="confirmationPassword">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="name" name="name" value="{{ old('name')}}" class="form-control" id="name" aria-describedby="name">
            </div>
            <div class="form-text"><a href="/" class="link">Login</a></div><br>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
@endsection
