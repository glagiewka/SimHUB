using System.Runtime.InteropServices;
using System.IO.MemoryMappedFiles;
using SharedMemoryReader.Models.SharedMemory;

namespace SharedMemoryReader;

class Reader
{

    public Graphics ReadGraphicsFile()
    {
        return ReadFile<Graphics>("Local\\acpmf_graphics");
    }

    public Physics ReadPhysicsFile()
    {
        return ReadFile<Physics>("Local\\acpmf_physics");
    }

    public Static ReadStaticFile()
    {
        return ReadFile<Static>("Local\\acpmf_static");
    }

    private T ReadFile<T>(string fileName) where T : struct
    {
        var file = MemoryMappedFile.OpenExisting(fileName);

        using (var stream = file.CreateViewStream())
        {
            using (var reader = new BinaryReader(stream))
            {
                var size = Marshal.SizeOf(typeof(T));
                var bytes = reader.ReadBytes(size);
                var handle = GCHandle.Alloc(bytes, GCHandleType.Pinned);
                var data = (T)Marshal.PtrToStructure(handle.AddrOfPinnedObject(), typeof(T));
                handle.Free();

                return data;
            }
        }
    }
}