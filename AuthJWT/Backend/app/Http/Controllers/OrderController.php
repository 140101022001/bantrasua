<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

class OrderController extends Controller
{
    public function index()
    {
        $data = [];
        $orders = Order::orderBy('created_at', 'desc')->get();
        foreach($orders as $order) {
            $product = Products::find($order->product_id);
            $user = User::find($order->user_id);
            if($product && $user) {
                $item = new stdClass();
                $item->id = $order->id;
                $item->title = $order->title;
                $item->email = $user->email;
                $item->name = $product->name;
                $item->img_url = $product->img_url;
                $item->price = $product->price;
                $item->quantity = $order->quantity;
                $item->sum = $order->sum;
                $item->status = $order->status;
                $item->created_at = $order->created_at;
                $data[] = $item;
            }
        }
        return response()->json($data);
    }
    public function orderById($user_id)
    {
        $data = [];
        $user = User::find($user_id);
        $orders = Order::where('user_id', $user_id)->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $product = Products::find($order->product_id);
            if ($product) {
                $item = new stdClass();
                $item->id = $order->id;
                $item->title = $order->title;
                $item->email = $user->email;
                $item->name = $product->name;
                $item->img_url = $product->img_url;
                $item->price = $product->price;
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
    public function deposit(Request $request, $user_id)
    {
        $request->validate([
            'deposit' => 'numeric|min:99'
        ],[
            'deposit.min' => '100円以上を入力してください。'
        ]);
        $user = User::find($user_id);
        $user->money = $user->money + $request->deposit;
        $user->save();
        $updatedUser = User::find($user_id);
        return response()->json([
            'status' => 200,
            'message' => 'Updated!',
            'money' => $updatedUser->money
        ]);
    }
    public function updateStatus(Request $request)
    {
        $order = Order::find($request->id);
        if ($request->type == 'DONE') {
            $order->status = 1;
            $order->save();
        } else {
            $user = User::find($request->user_id);
            $user->money = $user->money + ($request->sum / 2);
            $user->save();
            $order->status = 2;
            $order->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Updated!',
        ]);
    }
    public function benefit()
    {
        $allSum = 0;
        $todaySum = 0;
        $thisMonthSum = 0;
        $lastMonthSum = 0;
        $currentDate = now()->toDateString();
        $currentYear = date('Y');
        $currentMonth = date('m');
        $lastMonth = 0;
        if ($currentMonth - 1 === 0) {
            $lastMonth = 1;
        } else {
            $lastMonth = $currentMonth - 1;
        }
        $allOrders = Order::where('status', '=', 1)->get();
        foreach($allOrders as $allOrder) {
            if ($allOrder) {
                $allSum += $allOrder->sum;
            }
        }
        $todayOrders = DB::table('orders')
        ->where('status', 1)
        ->whereDate('created_at', $currentDate)
        ->get();
        foreach($todayOrders as $todayOrder) {
            if ($todayOrder) {
                $todaySum += $todayOrder->sum;
            }
        }
        $thisMonthOrders = DB::table('orders')
        ->where('status', 1)
        ->whereYear('created_at', $currentYear)
        ->whereMonth('created_at', $currentMonth)
        ->get();
        foreach($thisMonthOrders as $thisMonthOrder) {
            if ($thisMonthOrder) {
                $thisMonthSum += $thisMonthOrder->sum;
            }
        }
        $lastMonthOrders = DB::table('orders')
        ->where('status', 1)
        ->whereYear('created_at', $currentYear)
        ->whereMonth('created_at', $lastMonth)
        ->get();
        foreach($lastMonthOrders as $lastMonthOrder) {
            if ($lastMonthOrder) {
                $lastMonthSum += $lastMonthOrder->sum;
            }
        }
        $growth = 0;
        if ($thisMonthSum && $lastMonthSum) {
            $growth = ($thisMonthSum / $lastMonthSum) * 100;
        }
        return response()->json([
            'status' => 200,
            'allSum' => $allSum,
            'todaySum' => $todaySum,
            'thisMonthSum' => $thisMonthSum,
            'lastMonthSum' => $lastMonthSum,
            'growth' => $growth,
        ]);
    }
}
