<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Products::all();
        return response()->json($products);
    }
    public function store(Request $request)
    {
        $request->validate([
            'img_url' => 'required',
            'name' => 'unique:products,name|required',
            'price' => 'required',
            'quantity'=> 'required'
        ], [
            'img_url.required' => 'イメージをいれてください。',
            'name.unique' => 'この商品は存在されています。',
            'name.required' => '商品名を入力してください。',
            'price.required' => '価格を入力してください。',
            'quantity.required' => '数量を入力してください。',
        ]);
        $product = Products::create([
            'img_url' => $request->img_url,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Created!',
            'product' => $product
        ]);
    }
    public function edit(Request $request)
    {
        $request->validate([
            'img_url' => 'required',
            'name' => 'required',
            'price' => 'required'
        ], [
            'img_url.required' => 'イメージをいれてください。',
            'name.required' => '商品名を入力してください。',
            'price.required' => '価格を入力してください。',
        ]);
        $product = Products::find($request->id);
        $product->img_url = $request->img_url;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();
        $updatedProduct = Products::find($request->id);
        return response()->json([
            'status' => 200,
            'message' => 'Updated!',
            'product' => $updatedProduct
        ]);
    }
    public function delete(Request $request)
    {
        $product = Products::find($request->id);
        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Deleted!'
        ]);
    }
    public function charge(Request $request)
    {
        $product = Products::find($request->id);
        $product->quantity = $request->quantity;
        $product->save();
        $updatedProduct = Products::find($request->id);
        return response()->json([
            'status' => 200,
            'message' => 'Updated!',
            'product' => $updatedProduct
        ]);
    }
}
