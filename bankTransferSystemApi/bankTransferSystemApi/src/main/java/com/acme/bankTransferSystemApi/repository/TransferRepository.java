package com.acme.bankTransferSystemApi.repository;

import com.acme.bankTransferSystemApi.model.TransferEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferRepository extends JpaRepository<TransferEntity, Long> {
}