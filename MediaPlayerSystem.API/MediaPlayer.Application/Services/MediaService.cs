using MediaPlayer.Application.DTOs;
using MediaPlayer.Domain.Entities;
using MediaPlayer.Domain.Interfaces;

namespace MediaPlayer.Application.Services
{
    public class MediaService
    {
        private readonly IMediaRepository _repo;

        public MediaService(IMediaRepository repo) => _repo = repo;

        public async Task<IEnumerable<Media>> GetAllAsync() =>
            await _repo.GetAllAsync();

        public async Task<Media?> GetByIdAsync(int id) =>
            await _repo.GetByIdAsync(id);

        public async Task<Media> AddAsync(CreateMediaDto dto)
        {
            var media = new Media
            {
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Url = dto.Url,
                Tipo = dto.Tipo.ToLower() == "audio" ? MediaType.Audio : MediaType.Video
            };

            await _repo.AddAsync(media);
            return media;
        }

        public async Task<bool> UpdateAsync(int id, CreateMediaDto dto)
        {
            var media = await _repo.GetByIdAsync(id);
            if (media == null) return false;

            media.Titulo = dto.Titulo;
            media.Descricao = dto.Descricao;
            media.Url = dto.Url;
            media.Tipo = dto.Tipo.ToLower() == "audio" ? MediaType.Audio : MediaType.Video;

            await _repo.UpdateAsync(media);
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var media = await _repo.GetByIdAsync(id);
            if (media == null) return false;

            await _repo.DeleteAsync(media);
            return true;
        }
    }
}
