<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Resources\TransactionResource;
use App\Http\Resources\TransactionCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use League\Csv\Reader;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())->get();
        return new TransactionCollection($transactions);
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

        $data = $validator->validated();
        $data['user_id'] = Auth::id(); // Link to current user

        $transaction = Transaction::create($data);
        return new TransactionResource($transaction);
    }

    public function summary()
    {
        $transactions = Transaction::where('user_id', Auth::id())->get();
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

    /**
     * Upload and import transactions from CSV or Excel file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadTransactions(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,xls,xlsx',
        ]);

        $file = $request->file('file');
        $userId = Auth::id();
        $inserted = 0;
        $skipped = 0;
        $rows = [];

        if ($file->getClientOriginalExtension() === 'csv') {
            // Parse CSV using League\Csv
            $csv = Reader::createFromPath($file->getRealPath(), 'r');
            $csv->setHeaderOffset(0);
            foreach ($csv->getRecords() as $record) {
                $row = [
                    'date' => $record['date'] ?? null,
                    'amount' => $record['amount'] ?? null,
                    'description' => $record['description'] ?? null,
                    'category' => $record['category'] ?? null,
                    'user_id' => $userId,
                ];
                if (!$row['date'] || !$row['amount'] || !$row['description']) {
                    $skipped++;
                    continue;
                }
                $rows[] = $row;
            }
        } else {
            // Parse Excel using Maatwebsite\Excel
            $data = Excel::toArray([], $file);
            $sheet = $data[0];
            $header = array_map('strtolower', $sheet[0]);
            foreach (array_slice($sheet, 1) as $row) {
                $rowAssoc = array_combine($header, $row);
                $entry = [
                    'date' => $rowAssoc['date'] ?? null,
                    'amount' => $rowAssoc['amount'] ?? null,
                    'description' => $rowAssoc['description'] ?? null,
                    'category' => $rowAssoc['category'] ?? null,
                    'user_id' => $userId,
                ];
                if (!$entry['date'] || !$entry['amount'] || !$entry['description']) {
                    $skipped++;
                    continue;
                }
                $rows[] = $entry;
            }
        }

        foreach ($rows as $row) {
            try {
                Transaction::create($row);
                $inserted++;
            } catch (\Exception $e) {
                Log::error('Failed to insert transaction row', ['row' => $row, 'error' => $e->getMessage()]);
                $skipped++;
            }
        }

        return response()->json([
            'message' => "Upload complete. Inserted: $inserted, Skipped: $skipped."
        ]);
    }
}