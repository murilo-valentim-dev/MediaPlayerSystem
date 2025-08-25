using MediaPlayer.Domain.Entities;

namespace MediaPlayer.Domain.Interfaces
{
    public interface IMediaRepository
    {
        Task<IEnumerable<Media>> GetAllAsync();
        Task<Media?> GetByIdAsync(int id);
        Task AddAsync(Media media);
        Task UpdateAsync(Media media);
        Task DeleteAsync(Media media);
    }
}
