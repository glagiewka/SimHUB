namespace SharedMemoryReader.Models.Extensions;

static class GraphicsExtensions {
    public static SharedMemoryReader.Models.Console.Graphics toConsoleModel(this SharedMemoryReader.Models.SharedMemory.Graphics model) {
        return new SharedMemoryReader.Models.Console.Graphics {
        };
    }
}
