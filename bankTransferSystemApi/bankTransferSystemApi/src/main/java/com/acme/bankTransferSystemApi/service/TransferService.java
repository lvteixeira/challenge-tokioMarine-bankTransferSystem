package com.acme.bankTransferSystemApi.service;

import com.acme.bankTransferSystemApi.dto.TransferDTO;
import com.acme.bankTransferSystemApi.model.TransferEntity;
import com.acme.bankTransferSystemApi.repository.TransferRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransferService {
    @Autowired
    private TransferRepository transferRepository;

    @Autowired
    private ModelMapper modelMapper;

    public TransferService(TransferRepository transferRepository, ModelMapper modelMapper) {
        this.transferRepository = transferRepository;
        this.modelMapper = modelMapper;

        TypeMap<TransferDTO, TransferEntity> typeMap = this.modelMapper.createTypeMap(TransferDTO.class, TransferEntity.class);

        typeMap.addMappings(mapper -> mapper.skip(TransferEntity::setId));
    }

    public TransferDTO convertEntityToDTO(TransferEntity entity) {
        return modelMapper.map(entity, TransferDTO.class);
    }

    public TransferEntity convertDTOToEntity(TransferDTO dto) {
        return modelMapper.map(dto, TransferEntity.class);
    }

    public List<TransferDTO> convertEntityListToDTOList(List<TransferEntity> entityList) {
        java.lang.reflect.Type targetListType = new TypeToken<List<TransferDTO>>() {
        }.getType();
        return modelMapper.map(entityList, targetListType);
    }

    public List<TransferEntity> getAll() {
        return transferRepository.findAll();
    }

    public Optional<TransferEntity> findById(Long id) {
        return transferRepository.findById(id);
    }

    public void create(TransferEntity transfer) {
        transferRepository.save(transfer);
        transferRepository.flush();
    }

    public void update(TransferEntity updated, Long id) {
        List<TransferEntity> transfers = this.getAll();
        transfers.stream()
                .filter(transfer -> transfer.getId().equals(id))
                .findFirst()
                .ifPresent(transfer -> {
                    transfer.setAmount(updated.getAmount());
                    transferRepository.flush();
                });
    }

    public void delete(Long id) {
        Optional<TransferEntity> transferToDelete = this.findById(id);
        transferToDelete.ifPresent(transfer -> transferRepository.deleteById(id));
        transferRepository.flush();
    }

    public void clear() {
        transferRepository.deleteAll();
        transferRepository.flush();
    }
}