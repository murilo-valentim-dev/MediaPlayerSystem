using MediaPlayer.Application.DTOs;
using MediaPlayer.Domain.Entities;
using MediaPlayer.Domain.Interfaces;

namespace MediaPlayer.Application.Services
{
    public class PlaylistService
    {
        private readonly IPlaylistRepository _repo;
        private readonly IMediaRepository _meiaRepo;

        public PlaylistService(IPlaylistRepository repo, IMediaRepository meiaRepo)
        {
            _repo = repo;
            _meiaRepo = meiaRepo;
        }

        public async Task<IEnumerable<Playlist>> GetAllAsync() => await _repo.GetAllAsync();
        public async Task<Playlist?> GetByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task<Playlist> AdAsync(CreatePlaylistDto dto)
        {
            var playlist = new Playlist
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao
            };

            await _repo.AddAsync(playlist);
            return playlist;
        } 

        public async Task<bool> UpdateAsync(int id, CreatePlaylistDto dto)
        {
            var playlist = await _repo.GetByIdAsync(id);
            if (playlist == null) return false;

            playlist.Nome = dto.Nome;
            playlist.Descricao = dto.Descricao;

            await _repo.UpdateAsync(playlist);
            return true;
        }

        public async Task<bool> DelteAsync(int id)
        {
            var playlist = await _repo.GetByIdAsync(id);
            if (playlist == null) return false;

            await _repo.DeleteAsync(playlist);
            return true;
        }

        public async Task<bool> AddMediaAsync(int playlistId, int mediaId)
        {
            var media = await _meiaRepo.GetByIdAsync(mediaId);
            if (media == null) return false;

            await _repo.AddMediaAsync(playlistId, media);
            return true;
        }

        public async Task<bool> RemoveMediaAsync(int playlistId, int mediaId)
        {
            var playlist = await _repo.GetByIdAsync(playlistId);
            if (playlist == null) return false;

            var media = playlist.Midias.FirstOrDefault(m => m.Id == mediaId);
            if (media == null) return false;


            await _repo.RemoveMediaAsync(playlist, media);
            return true;
        }

    }
}
