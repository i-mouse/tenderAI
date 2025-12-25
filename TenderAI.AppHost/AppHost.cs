using YamlDotNet.Serialization;

var builder = DistributedApplication.CreateBuilder(args);

//add Redis
var cache = builder.AddRedis("redis-cache");


var database = builder.AddSqlServer ("sql");

// adding Services
builder.AddProject<Projects.TenderAI_ApiService>("apiservice").WithEnvironment("DEPLOYMENT_REGION","US-East").WithReference(cache);

builder.Build().Run();
