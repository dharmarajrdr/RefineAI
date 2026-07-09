package com.dharmaraj.RefineAI.controllers;

import com.dharmaraj.RefineAI.dtos.ApiResponseDto;
import com.dharmaraj.RefineAI.services.GroqAiService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/groq")
public final class GroqAiController {

    private final GroqAiService groqAiService;

    @GetMapping("/response")
    public ResponseEntity<ApiResponseDto> getResponse(@RequestParam String prompt) {

        ApiResponseDto responseDto = new ApiResponseDto();
        responseDto.setRefinedText(groqAiService.getResponse(prompt));
        return ResponseEntity.status(200).body(responseDto);
    }
}