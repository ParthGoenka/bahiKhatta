<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Resources\TransactionResource;
use App\Http\Resources\TransactionCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index()
    {
        return new TransactionCollection(Transaction::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'category' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transaction = Transaction::create($validator->validated());
        return new TransactionResource($transaction);
    }

    public function summary()
    {
        $transactions = Transaction::all();
        $income = $transactions->where('amount', '>', 0)->sum('amount');
        $expenses = $transactions->where('amount', '<', 0)->sum('amount');
        $categories = $transactions->groupBy('category')->map(function($group) {
            return $group->sum('amount');
        });
        return response()->json([
            'total_income' => $income,
            'total_expenses' => $expenses,
            'categories' => $categories,
        ]);
    }

    public function aiCategorize(Request $request)
    {
        // Stub: Replace with real AI integration
        $description = $request->input('description');
        $category = 'Uncategorized';
        if (stripos($description, 'grocery') !== false) {
            $category = 'Groceries';
        } elseif (stripos($description, 'rent') !== false) {
            $category = 'Rent';
        }
        return response()->json(['ai_category' => $category]);
    }
}
