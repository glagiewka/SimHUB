using System.Text.Json;
using SharedMemoryReader.Models.Extensions;

namespace SharedMemoryReader;

class Program
{
    static int Main(string[] args)
    {
        System.Console.WriteLine(Read(args[0]));
        return 1;
    }

    static string Read(string fileType) {
        var reader = new Reader();

        switch (fileType) {
            case "physics":
                return JsonSerializer.Serialize(reader.ReadPhysicsFile().toConsoleModel());
            case "static":
                return JsonSerializer.Serialize(reader.ReadStaticFile().toConsoleModel());
            case "graphics":
                return JsonSerializer.Serialize(reader.ReadGraphicsFile().toConsoleModel());
            default:
                throw new ArgumentException("Unsupported file type");
        }
    }
}
