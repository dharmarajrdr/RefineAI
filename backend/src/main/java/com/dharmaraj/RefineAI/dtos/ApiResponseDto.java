package com.dharmaraj.RefineAI.dtos;

import com.dharmaraj.RefineAI.enums.Status;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseDto {

    private String refinedText;

    private Status status = Status.SUCCESS;

    private String errorMessage;
}
