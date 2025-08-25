using MediaPlayer.Domain.Entities;
namespace MediaPlayer.Domain.Interfaces
{
    public interface IPlaylistRepository
    {
        Task<IEnumerable<Playlist>> GtAllAsync();
        Task<Playlist?> GetByIdAsync(int id);
        Task AddAsync(Playlist playlist);
        Task AddMediaAsync(int playlistId, Media media);
    }
}
