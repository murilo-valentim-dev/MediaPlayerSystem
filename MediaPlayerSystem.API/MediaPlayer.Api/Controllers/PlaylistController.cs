using MediaPlayer.Application.DTOs;
using MediaPlayer.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace MediaPlayer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistController : Controller
    {
        private readonly PlaylistService _service;

        public PlaylistController(PlaylistService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var playlist = await _service.GetByIdAsync(id);
            if (playlist == null) return NotFound();
            return Ok(playlist);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePlaylistDto dto)
        {
            var playlist = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = playlist.Id }, playlist);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreatePlaylistDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DelteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpPost("{id}/addMedia/{mediaId}")]
        public async Task<IActionResult> AddMedia(int id, int mediaId)
        {
            var added = await _service.AddMediaAsync(id, mediaId);
            if (!added) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}/removeMedia/{mediaId}")]
        public async Task<IActionResult> RemoveMedia(int id, int mediaId)
        {
            var removed = await _service.RemoveMediaAsync(id, mediaId);
            if (!removed) return NotFound();
            return NoContent();
        }
    }
}
