### Compile Shared Memory Reader

```
dotnet build
dotnet publish -c Release -r win10-x64 --self-contained
```

### Install packages

```
npm install
```

### Run adapter
```
// precompiled
npx ts-node .\cmd.ts ./binaries/SharedMemoryReader/SharedMemoryReader.exe
// or
npx ts-node .\cmd.ts ./SharedMemoryReader/bin/Release/net7.0/win10-x64/SharedMemoryReader.exe
```
