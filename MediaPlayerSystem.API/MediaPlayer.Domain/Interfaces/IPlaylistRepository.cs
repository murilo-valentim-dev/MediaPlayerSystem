using MediaPlayer.Domain.Entities;
namespace MediaPlayer.Domain.Interfaces
{
    public interface IPlaylistRepository
    {
        Task<IEnumerable<Playlist>> GetAllAsync();
        Task<Playlist?> GetByIdAsync(int id);
        Task AddAsync(Playlist playlist);
        Task UpdateAsync(Playlist playlist);
        Task DeleteAsync(Playlist playlist);
        Task AddMediaAsync(int playlistId, Media media);
        Task RemoveMediaAsync(Playlist playlist, Media media);
    }
}
