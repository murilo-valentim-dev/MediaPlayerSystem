using MediaPlayer.Application.DTOs;
using MediaPlayer.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace MediaPlayer.Api.Controllers;

[ApiController]
[Route("api/[controller}")]
public class MediaController : ControllerBase
{
    private readonly MediaService _service;

    public MediaController(MediaService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var media = await _service.GetByIdAsync(id);
        if (media == null) return NotFound();
        return Ok(media);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMediaDto dto)
    {
        var media = await _service.AddAsync(dto);
        return CreatedAtAction(nameof(GetById), new {id = media.Id}, media);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateMediaDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.Delete(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}