using System;

namespace Application.Core;

public class Results<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int Code { get; set; }
    
    public static Result <T> Success(T value) => new () {IsSuccess = true , Value = value};
}
