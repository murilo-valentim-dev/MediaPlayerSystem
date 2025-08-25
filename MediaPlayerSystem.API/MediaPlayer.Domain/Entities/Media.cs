namespace MediaPlayer.Domain.Entities;

public enum MediaType
{
    Audio,
    Video
}

public class Media
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public MediaType Tipo { get; set; }
}

