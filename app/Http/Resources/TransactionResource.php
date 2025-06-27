<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'amount' => $this->amount,
            'date' => $this->date,
            'category' => $this->category,
            'ai_category' => $this->ai_category,
            'created_at' => $this->created_at,
        ];
    }
}
