namespace MediaPlayer.Domain.Entities
{
    public class Playlist
    {
        public int id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public List<Media> Midias { get; set; } = new();
    }
}
