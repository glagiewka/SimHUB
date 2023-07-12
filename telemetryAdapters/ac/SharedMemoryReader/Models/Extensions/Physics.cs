namespace SharedMemoryReader.Models.Extensions;

static class PhysicsExtensions {
    public static SharedMemoryReader.Models.Console.Physics toConsoleModel(this SharedMemoryReader.Models.SharedMemory.Physics model) {
        return new SharedMemoryReader.Models.Console.Physics {
            Rpm = model.Rpms
        };
    }
}
