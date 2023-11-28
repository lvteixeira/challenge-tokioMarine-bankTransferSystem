package com.acme.bankTransferSystemApi.controller;

import com.acme.bankTransferSystemApi.dto.TransferDTO;
import com.acme.bankTransferSystemApi.model.TransferEntity;
import com.acme.bankTransferSystemApi.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("transfer")
public class TransferController {
    @Autowired
    private TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @PostMapping
    public ResponseEntity<TransferDTO> schedule(@RequestBody TransferDTO createPayload) {
        TransferEntity obj = transferService.convertDTOToEntity(createPayload);
        transferService.create(obj);
        TransferDTO createdTransfer = transferService.convertEntityToDTO(obj);
        return ResponseEntity.status(201).body(createdTransfer);
    }
}
