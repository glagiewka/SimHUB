using System.Text.Json;
using Microsoft.Extensions.Logging;
using SharedMemoryReader.Models.Extensions;

namespace SharedMemoryReader;

class Program
{
    private static string APP_VERSION = "1.0.0";
    private static string APP_NAME = "Assetto Corsa Shared Memory Reader";

    static int Main(string[] args)
    {
        var isSilent = args.Contains("--silent") || args.Contains("-s");

        using var loggerFactory = LoggerFactory.Create(builder =>
        {
            builder
                .AddFilter("Microsoft", LogLevel.Warning)
                .AddFilter("System", LogLevel.Warning)
                .AddFilter("NonHostConsoleApp.Program", LogLevel.Debug)
                .AddConsole();

                if (isSilent) {
                    builder.AddFilter("Program", LogLevel.None);
                }
        });
        ILogger logger = loggerFactory.CreateLogger("Program");

        var fileName = args[0];
        logger.LogInformation($"{Program.APP_NAME} v{Program.APP_VERSION}");
        logger.LogInformation($"Reading memory file: {fileName}");
        
        try {
            System.Console.WriteLine(Read(fileName));
        } catch (FileNotFoundException ex) {
            logger.LogWarning(ex, $"Memory file not found. Is the game running?");
            System.Console.WriteLine(Serialize<Object>(null));
        } catch (Exception ex) {
            logger.LogError(ex, $"Unable to read memory file: {fileName}");
            System.Console.Error.WriteLine(ex);
        }

        return 1;
    }

    static string Read(string fileType) {
        var reader = new Reader();

        switch (fileType) {
            case "physics":
                return Serialize(reader.ReadPhysicsFile().toConsoleModel());
            case "static":
                return Serialize(reader.ReadStaticFile().toConsoleModel());
            case "graphics":
                return Serialize(reader.ReadGraphicsFile().toConsoleModel());
            default:
                throw new ArgumentException("Unsupported file type");
        }
    }

    static string Serialize<T>(T? value) {
        return JsonSerializer.Serialize(value, new JsonSerializerOptions {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        });
    }
}
