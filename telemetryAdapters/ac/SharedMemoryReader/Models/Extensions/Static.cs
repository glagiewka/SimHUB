namespace SharedMemoryReader.Models.Extensions;

static class StaticExtensions {
    public static SharedMemoryReader.Models.Console.Static toConsoleModel(this SharedMemoryReader.Models.SharedMemory.Static model) {
        return new SharedMemoryReader.Models.Console.Static {
            MaxRpm = model.MaxRpm
        };
    }
}
