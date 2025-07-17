<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AIChatController extends Controller
{
    /**
     * Handle chat requests to Qwen/Ollama.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string',
        ]);

        $userPrompt = $request->input('prompt');
        $userId = Auth::id();

        // System instruction for the AI model
        $systemInstruction = <<<EOT
You are an AI assistant. Always respond in English.

Use the context data provided below to answer user questions about their transactions. 
If the answer is not found in the data, reply: "Sorry, I couldn't find the answer in the provided context."
EOT;

        // Get context data for the current user
        $contextData = $this->getDatabaseContext($userId);

        // ✅ Debug: Log context from DB
        Log::debug("Context fetched from DB for user $userId:\n" . $contextData);

        // Final prompt with context and user input
        $fullPrompt = <<<PROMPT
        You are a personal finance assistant and your name is munshi ji.
Question: $userPrompt , $contextData
PROMPT;

        // ✅ Debug: Log full prompt
        Log::debug("Full prompt sent to Qwen:\n" . $fullPrompt);

        // Optionally write to file for detailed inspection
        file_put_contents(storage_path('logs/qwen_full_prompt.log'), $fullPrompt);

        $response = $this->queryQwen($fullPrompt);

        return response()->json(['response' => $response]);
    }

    /**
     * Query the local Qwen model via Ollama API.
     */
    private function queryQwen($prompt)
    {
        $url = 'http://localhost:11434/api/generate';
        $data = [
            'model' => 'qwen',
            'prompt' => $prompt,
            'stream' => false
        ];

        // ✅ Debug: Log payload being sent to Ollama
        Log::debug("Payload to Ollama:", $data);
        file_put_contents(storage_path('logs/qwen_payload.json'), json_encode($data, JSON_PRETTY_PRINT));

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // ✅ Debug: Log response from Ollama
        Log::debug("Response from Ollama (HTTP $http_code):\n" . $response);
        file_put_contents(storage_path('logs/qwen_response.json'), $response);

        if ($http_code === 200) {
            $decoded = json_decode($response, true);
            return $decoded['response'] ?? 'Error: Response key not found.';
        } else {
            return 'Error: Unable to generate response. HTTP Status Code: ' . $http_code;
        }
    }

    /**
     * Fetch recent transactions for the given user and convert to context string.
     */
    private function getDatabaseContext($userId)
    {
        $rows = DB::table('transactions')
            ->where('user_id', $userId)
            ->select('description', 'amount', 'date', 'category')
            ->orderByDesc('date')
            ->limit(20)
            ->get();

        $context = '';
        foreach ($rows as $row) {
            $context .= "- Transaction: {$row->description}, Amount: {$row->amount}, Date: {$row->date}, Category: {$row->category}";
        }

        // ✅ Debug: Log inside getDatabaseContext directly
        Log::debug("getDatabaseContext output:\n" . $context);

        return $context;
    }
}
