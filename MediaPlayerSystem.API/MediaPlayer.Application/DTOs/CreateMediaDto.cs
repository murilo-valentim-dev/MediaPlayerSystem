namespace MediaPlayer.Application.DTOs
{
    public class CreateMediaDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Tipo { get; set; } = "Video";
    }
}
