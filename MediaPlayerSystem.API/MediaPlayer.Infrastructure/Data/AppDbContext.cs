using MediaPlayer.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MediaPlayer.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Media> Midias { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
    }
}
