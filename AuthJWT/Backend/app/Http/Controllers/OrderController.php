<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use stdClass;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }
    public function orderById($user_id)
    {
        $data = [];
        $user = User::find($user_id);
        $orders = Order::where('user_id', $user_id)->get();
        foreach ($orders as $order) {
            $product = Products::find($order->product_id);
            if ($product) {
                $item = new stdClass();
                $item->id = $order->id;
                $item->title = $order->title;
                $item->email = $user->email;
                $item->img_url = $product->img_url;
                $item->quantity = $order->quantity;
                $item->sum = $order->sum;
                $item->status = $order->status;
                $item->created_at = $order->created_at;
                $data[] = $item;
            }
        }
        return response()->json(
            $data
        );
    }
    public function order(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'quantity' => 'numeric|min:1',
            'sum' => 'required',
        ], [
            'quantity.numeric' => '数量を入力てください。',
            'quantity.min' => '数量を一個以上入力してください。。'
        ]);
        $order = Order::create([
            'title' => $request->title,
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'sum' => $request->sum,
            'status' => 0
        ]);
        $user = User::find($request->user_id);
        $user->money = $user->money - $request->sum;
        $user->save();
        $updatedUser = User::find($request->user_id);
        $product = Products::find($order->product_id);
        $product->quantity = $product->quantity - $request->quantity;
        $product->save();
        $updatedProduct = Products::find($order->product_id);
        return response()->json([
            'status' => 200,
            'message' => 'Created!',
            'order' => $order,
            'product' => $updatedProduct,
            'money' => $updatedUser->money
        ]);
    }
}
