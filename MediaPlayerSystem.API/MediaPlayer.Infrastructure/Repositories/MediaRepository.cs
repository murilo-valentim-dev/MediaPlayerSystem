using MediaPlayer.Domain.Entities;
using MediaPlayer.Domain.Interfaces;
using MediaPlayer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace MediaPlayer.Infrastructure.Repositories
{
    public class MediaRepository : IMediaRepository
    {
        private readonly AppDbContext _context;
        public MediaRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Media>> GetAllAsync() => await _context.Midias.ToListAsync();
        public async Task<Media?> GetByIdAsync(int id) => await _context.Midias.FindAsync(id);

        public async Task AddAsync(Media media)
        {
            _context.Midias.Add(media);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Media media)
        {
            _context.Midias.Update(media);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Media media)
        {
            _context.Midias.Remove(media);
            await _context.SaveChangesAsync();
        }
    }
}
