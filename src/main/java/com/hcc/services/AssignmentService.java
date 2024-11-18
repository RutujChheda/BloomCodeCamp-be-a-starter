package com.hcc.services;

import com.hcc.dto.PostAssignmentRequest;
import com.hcc.dto.UpdateAssignmentRequestDTO;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.enums.AssignmentEnum;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.enums.AuthorityEnum;
import com.hcc.exceptions.AssignmentNotFoundException;
import com.hcc.exceptions.AssignmentUpdateException;
import com.hcc.exceptions.InsufficientPermissionsException;
import com.hcc.repositories.AssignmentRepository;
import com.hcc.utils.DtoConverter;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class AssignmentService {

    private AssignmentRepository assignmentRepository;

    @Transactional
    public List<Assignment> getAllAssignments(Authentication auth) {
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        User user = (User) auth.getPrincipal();

        if (authorities.contains(new SimpleGrantedAuthority(AuthorityEnum.Authority.ROLE_CODE_REVIEWER.toString()))) {

            List<Assignment> codeReviewerOwnedAssignments = assignmentRepository.findByCodeReviewerId(user.getId());
            List<Assignment> submittedAssignments = assignmentRepository.findByStatus("SUBMITTED");
            List<Assignment> resubmittedAssignments = assignmentRepository.findByStatus("RESUBMITTED");

            return Stream.of(codeReviewerOwnedAssignments, submittedAssignments, resubmittedAssignments).flatMap(Collection::stream).collect(Collectors.toList());
        } else {
            return assignmentRepository.findByUserId(user.getId());
        }
    }

    public Assignment updateById(Long assignmentId, UpdateAssignmentRequestDTO request) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow();
        assignment.setGithubUrl(request.getGithubUrl());
        assignment.setBranch(request.getBranch());
        assignment.setStatus(request.getStatus());
        assignment.setReviewVideoUrl(request.getReviewVideoUrl());
        return assignmentRepository.save(assignment);
    }

    public Assignment getAssignmentById(Long assignmentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow(() -> new AssignmentNotFoundException("Assignment not found."));

        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority(AuthorityEnum.Authority.ROLE_CODE_REVIEWER.toString()))
                && !assignment.getUser().getUsername().equals(auth.getName())) {
            throw new InsufficientPermissionsException("You don't have permissions to access this assignment");
        }

        return assignment;
    }

    public Assignment postAssignment(PostAssignmentRequest request) {
        return assignmentRepository.save(
                new Assignment(
                        AssignmentStatusEnum.WIP.toString(),
                        request.getAssignmentNumber(),
                        request.getGithubUrl(),
                        request.getBranch(),
                        null,
                        (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(),
                        null
                )
        );
    }

    public void deleteAssignment(Long assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new AssignmentNotFoundException("Assignment not found."));

        assignmentRepository.deleteById(assignmentId);
    }

}