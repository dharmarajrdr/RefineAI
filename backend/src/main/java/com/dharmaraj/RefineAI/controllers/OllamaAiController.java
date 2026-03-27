package com.dharmaraj.RefineAI.controllers;

import com.dharmaraj.RefineAI.dtos.ApiResponseDto;
import com.dharmaraj.RefineAI.services.OllamaAiService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/ollama")
public final class OllamaAiController {

    private final OllamaAiService ollamaAiService;

    @GetMapping("/response")
    public ResponseEntity<ApiResponseDto> getResponse(@RequestParam String prompt) {

        ApiResponseDto responseDto = new ApiResponseDto();
        responseDto.setRefinedText(ollamaAiService.getResponse(prompt));
        return ResponseEntity.status(200).body(responseDto);
    }
}
