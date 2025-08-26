using MediaPlayer.Domain.Entities;
using MediaPlayer.Domain.Interfaces;
using MediaPlayer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace MediaPlayer.Infrastructure.Repositories
{
    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly AppDbContext _context;
        public PlaylistRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Playlist>> GetAllAsync() => await _context.Playlists.Include(p => p.Midias).ToListAsync();
        public async Task<Playlist?> GetByIdAsync(int id) => await _context.Playlists.Include(p => p.Midias).FirstOrDefaultAsync(p => p.Id == id);

        public async Task AddAsync(Playlist playlist)
        {
            _context.Playlists.Add(playlist);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Playlist playlist)
        {
            _context.Playlists.Update(playlist);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Playlist playlist)
        {
            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();
        }

        public async Task AddMediaAsync(int playlistId, Media media)
        {
            var playlist = await _context.Playlists.Include(p => p.Midias).FirstOrDefaultAsync(p => p.Id == playlistId);
            if(playlist != null)
            {
                playlist.Midias.Add(media);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveMediaAsync(Playlist playlist, Media media)
        {
                playlist.Midias.Remove(media);
                await _context.SaveChangesAsync();
        }

    }
}
