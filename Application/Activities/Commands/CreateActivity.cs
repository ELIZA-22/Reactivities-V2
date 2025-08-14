using System;
using MediatR;
using Persistence;
using Domain;
using Application.Activities.DTOs;
using AutoMapper;
using Microsoft.VisualBasic;
using FluentValidation;
using Application.Core; // Add this to import Domain.Activity

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; } 
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {                               
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create activity", 400);
            
            return Result<string>.Success(activity.Id);

        }
    }
}