---
layout: Conceptual
title: Quickstart - Generate images from text using AI - .NET | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/dotnet/ai/quickstarts/text-to-image
apiPlatform: dotnet
author: gewarren
breadcrumb_path: /dotnet/breadcrumb/toc.json
feedback_system: OpenSource
feedback_product_url: https://aka.ms/feedback/report?space=61
ms.author: gewarren
ms.devlang: dotnet
ms.service: dotnet
ms.topic: quickstart
show_latex: true
uhfHeaderId: MSDocsHeader-DotNet
ms.subservice: intelligent-apps
ms.collection: ce-skilling-ai-copilot
ms.custom: devx-track-dotnet
ms.update-cycle: 180-days
description: Learn how to use Microsoft.Extensions.AI to generate images from text prompts using AI models in a .NET application.
ms.date: 2026-03-04T00:00:00.0000000Z
ai-usage: ai-assisted
locale: en-us
document_id: 9147fda0-a0f9-fc94-69eb-46912160b871
document_version_independent_id: e00b1ab1-6d87-37e5-24f0-e4b0aab7b8b4
updated_at: 2026-03-13T17:46:00.0000000Z
original_content_git_url: https://github.com/dotnet/docs/blob/live/docs/ai/quickstarts/text-to-image.md
gitcommit: https://github.com/dotnet/docs/blob/6ab2a4c48ddabf5c19c5aa024369b439da0201a0/docs/ai/quickstarts/text-to-image.md
git_commit_id: 6ab2a4c48ddabf5c19c5aa024369b439da0201a0
site_name: Docs
depot_name: VS.core-docs
page_type: conceptual
toc_rel: ../toc.json
pdf_url_template: https://learn.microsoft.com/pdfstore/en-us/VS.core-docs/{branchName}{pdfName}
feedback_help_link_type: ''
feedback_help_link_url: ''
search.mshattr.devlang: csharp
word_count: 1271
asset_id: ai/quickstarts/text-to-image
moniker_range_name: 
monikers: []
item_type: Content
source_path: docs/ai/quickstarts/text-to-image.md
cmProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/7696cda6-0510-47f6-8302-71bb5d2e28cf
- https://authoring-docs-microsoft.poolparty.biz/devrel/68ec7f3a-2bc6-459f-b959-19beb729907d
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/8a6e4dad-7050-4ce7-83f9-eb4123577a54
spProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/69c76c32-967e-4c65-b89a-74cc527db725
- https://authoring-docs-microsoft.poolparty.biz/devrel/90370425-aca4-4a39-9533-d52e5e002a5d
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/0a5fc323-00ce-4c20-9095-41948f54c83f
platformId: 347a8198-c001-ddd6-aa44-41734b17b75e
---

# Quickstart - Generate images from text using AI - .NET | Microsoft Learn

In this quickstart, you use the [Microsoft.Extensions.AI](/en-us/dotnet/api/microsoft.extensions.ai) (MEAI) library to generate images from text prompts using an AI model. The MEAI text-to-image capabilities let you generate images from natural language prompts or existing images using a consistent and extensible API surface.

The [IImageGenerator](/en-us/dotnet/api/microsoft.extensions.ai.iimagegenerator) interface provides a unified, extensible API for working with various image generation services, making it easy to integrate text-to-image capabilities into your .NET apps. The interface supports:

- Text-to-image generation.
- Pipeline composition with middleware (logging, telemetry, caching).
- Flexible configuration options.
- Support for multiple AI providers.

Note

The `IImageGenerator` interface is currently marked as experimental with the `MEAI001` diagnostic ID. You might need to suppress this warning in your project file or code.

## Prerequisites

- .NET 8.0 SDK or higher - [Install the .NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).
- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Developer CLI (optional) - [Install or update the Azure Developer CLI](/en-us/azure/developer/azure-developer-cli/install-azd).

## Configure the AI service

To provision an Azure OpenAI service and model using the Azure portal, complete the steps in the [Create and deploy an Azure OpenAI Service resource](/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) article. In the "Deploy a model" step, select the `gpt-image-1` model.

Note

`gpt-image-1` is a newer model that offers several improvements over DALL-E 3. It's available from OpenAI on a limited basis; apply for access with [this form](https://aka.ms/oai/gptimage1access).

## Create the application

Complete the following steps to create a .NET console application that generates images from text prompts.

1. Create a new console application:

    ```dotnetcli
    dotnet new console -o TextToImageAI
    ```
2. Navigate to the `TextToImageAI` directory, and add the necessary packages to your app:

    ```dotnetcli
    dotnet add package Azure.AI.OpenAI
    dotnet add package Microsoft.Extensions.AI.OpenAI
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```
3. Run the following commands to add [app secrets](/en-us/aspnet/core/security/app-secrets) for your Azure OpenAI endpoint and API key:

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set AZURE_OPENAI_ENDPOINT <your-Azure-OpenAI-endpoint>
    dotnet user-secrets set AZURE_OPENAI_API_KEY <your-azure-openai-api-key>
    ```
4. Open the new app in your editor of choice (for example, Visual Studio).

## Implement basic image generation

1. Update the `Program.cs` file with the following code to get the configuration data and create the [AzureOpenAIClient](/en-us/dotnet/api/azure.ai.openai.azureopenaiclient):

    ```csharp
    using Azure;
    using Azure.AI.OpenAI;
    using Microsoft.Extensions.AI;
    using Microsoft.Extensions.Configuration;
    
    IConfigurationRoot config = new ConfigurationBuilder()
        .AddUserSecrets<Program>()
        .Build();
    
    string endpoint = config["AZURE_OPENAI_ENDPOINT"];
    string apiKey = config["AZURE_OPENAI_API_KEY"];
    string model = "gpt-image-1";
    
    // Create the Azure OpenAI client and convert to IImageGenerator.
    AzureOpenAIClient azureClient = new(
        new Uri(endpoint),
        new AzureKeyCredential(apiKey));
    
    var imageClient = azureClient.GetImageClient(model);
    #pragma warning disable MEAI001 // Type is for evaluation purposes only.
    IImageGenerator generator = imageClient.AsIImageGenerator();
    ```

    The preceding code:

    - Loads configuration from user secrets.
    - Creates an `ImageClient` from the OpenAI SDK.
    - Converts the `ImageClient` to an `IImageGenerator` using the [AsIImageGenerator(ImageClient)](/en-us/dotnet/api/microsoft.extensions.ai.openaiclientextensions.asiimagegenerator#microsoft-extensions-ai-openaiclientextensions-asiimagegenerator%28openai-images-imageclient%29) extension method.
2. Add the following code to implement basic text-to-image generation:

    ```csharp
    // Generate an image from a text prompt
    var options = new ImageGenerationOptions
    {
        MediaType = "image/png"
    };
    string prompt = "A tennis court in a jungle";
    var response = await generator.GenerateImagesAsync(prompt, options);
    
    // Save the image to a file.
    var dataContent = response.Contents.OfType<DataContent>().First();
    string fileName = SaveImage(dataContent, "jungle-tennis.png");
    Console.WriteLine($"Image saved to file: {fileName}");
    
    static string SaveImage(DataContent content, string fileName)
    {
        string userDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var path = Path.Combine(userDirectory, fileName);
        File.WriteAllBytes(path, content.Data.ToArray());
        return Path.GetFullPath(path);
    }
    ```

    The preceding code:

    - Sets the requested image file type by setting [ImageGenerationOptions.MediaType](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.mediatype#microsoft-extensions-ai-imagegenerationoptions-mediatype).
    - Generates an image using the [GenerateImagesAsync(IImageGenerator, String, ImageGenerationOptions, CancellationToken)](/en-us/dotnet/api/microsoft.extensions.ai.imagegeneratorextensions.generateimagesasync#microsoft-extensions-ai-imagegeneratorextensions-generateimagesasync%28microsoft-extensions-ai-iimagegenerator-system-string-microsoft-extensions-ai-imagegenerationoptions-system-threading-cancellationtoken%29) method with a text prompt.
    - Saves the generated image to a file in the local user directory.
3. Run the application, either through the IDE or using `dotnet run`.

    The application generates an image and outputs the file path to the image. Open the file to view the generated image. The following image shows one example of a generated image.

    ![AI-generated image of a tennis court in a jungle.](media/text-to-image/jungle-tennis.png)

## Configure image generation options

You can customize image generation by providing other options such as size, response format, and number of images to generate. The [ImageGenerationOptions](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions) class allows you to specify:

- [AdditionalProperties](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.additionalproperties#microsoft-extensions-ai-imagegenerationoptions-additionalproperties): Provider-specific options.
- [Count](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.count#microsoft-extensions-ai-imagegenerationoptions-count): The number of images to generate.
- [ImageSize](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.imagesize#microsoft-extensions-ai-imagegenerationoptions-imagesize): The dimensions of the generated image as a [System.Drawing.Size](/en-us/dotnet/api/system.drawing.size). For supported sizes, see the [OpenAI API reference](https://platform.openai.com/docs/api-reference/images/create).
- [MediaType](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.mediatype#microsoft-extensions-ai-imagegenerationoptions-mediatype): The media type (MIME type) of the generated image.
- [ModelId](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.modelid#microsoft-extensions-ai-imagegenerationoptions-modelid): The model ID.
- [RawRepresentationFactory](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.rawrepresentationfactory#microsoft-extensions-ai-imagegenerationoptions-rawrepresentationfactory): The callback that creates the raw representation of the image generation options from an underlying implementation.
- [ResponseFormat](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions.responseformat#microsoft-extensions-ai-imagegenerationoptions-responseformat): Options are [Uri](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationresponseformat#microsoft-extensions-ai-imagegenerationresponseformat-uri), [Data](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationresponseformat#microsoft-extensions-ai-imagegenerationresponseformat-data), and [Hosted](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationresponseformat#microsoft-extensions-ai-imagegenerationresponseformat-hosted).

## Use hosting integration

When you build web apps or hosted services, you can integrate image generation using dependency injection and hosting patterns. This approach provides better lifecycle management, configuration integration, and testability.

### Configure hosting services

The `Aspire.Azure.AI.OpenAI` package provides extension methods to register Azure OpenAI services with your application's dependency injection container:

1. Add the necessary packages to your web application:

    ```dotnetcli
    dotnet add package Aspire.Azure.AI.OpenAI --prerelease
    dotnet add package Azure.AI.OpenAI
    dotnet add package Microsoft.Extensions.AI.OpenAI --prerelease
    ```
2. Configure the Azure OpenAI client and image generator in your `Program.cs` file:

    ```csharp
    using Aspire.Azure.AI.OpenAI;
    using Microsoft.Extensions.AI;
    using OpenAI;
    
    WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
    
    // Add the Azure OpenAI client using hosting integration.
    AspireAzureOpenAIClientBuilder openai = builder.AddAzureOpenAIClient("openai");
    ```

    The [AddAzureOpenAIClient(IHostApplicationBuilder, String, Action&lt;AzureOpenAISettings&gt;, Action&lt;IAzureClientBuilder&lt;AzureOpenAIClient,AzureOpenAIClientOptions&gt;&gt;)](/en-us/dotnet/api/microsoft.extensions.hosting.aspireazureopenaiextensions.addazureopenaiclient#microsoft-extensions-hosting-aspireazureopenaiextensions-addazureopenaiclient%28microsoft-extensions-hosting-ihostapplicationbuilder-system-string-system-action%28%28aspire-azure-ai-openai-azureopenaisettings%29%29-system-action%28%28azure-core-extensions-iazureclientbuilder%28%28azure-ai-openai-azureopenaiclient-azure-ai-openai-azureopenaiclientoptions%29%29%29%29%29) method registers the Azure OpenAI client with dependency injection. The connection string (named `"openai"`) is retrieved from configuration, typically from `appsettings.json` or environment variables:

    ```json
    {
      "ConnectionStrings": {
        "openai": "Endpoint=https://your-resource-name.openai.azure.com/;Key=your-api-key"
      }
    }
    ```
3. Register the [IImageGenerator](/en-us/dotnet/api/microsoft.extensions.ai.iimagegenerator) service with dependency injection:

    ```csharp
    // Register the image generator with dependency injection.
    ImageGeneratorBuilder imageBuilder = builder.Services.AddImageGenerator(services =>
    {
        OpenAIClient openAiClient = services.GetRequiredService<OpenAIClient>();
        OpenAI.Images.ImageClient imageClient = openAiClient.GetImageClient("gpt-image-1");
        #pragma warning disable MEAI001 // Type is for evaluation purposes only.
        return imageClient.AsIImageGenerator();
        #pragma warning restore MEAI001
    });
    ```

    The [AddImageGenerator](/en-us/dotnet/api/microsoft.extensions.dependencyinjection.imagegeneratorbuilderservicecollectionextensions.addimagegenerator) method registers the image generator as a singleton service that can be injected into controllers, services, or minimal API endpoints.
4. Add options and logging::

    ```csharp
    imageBuilder.ConfigureOptions(options =>
    {
        options.MediaType = "image/png";
    }).UseLogging();
    ```

    The preceding code:

    - Configures options by calling the [ConfigureOptions(ImageGeneratorBuilder, Action&lt;ImageGenerationOptions&gt;)](/en-us/dotnet/api/microsoft.extensions.ai.configureoptionsimagegeneratorbuilderextensions.configureoptions#microsoft-extensions-ai-configureoptionsimagegeneratorbuilderextensions-configureoptions%28microsoft-extensions-ai-imagegeneratorbuilder-system-action%28%28microsoft-extensions-ai-imagegenerationoptions%29%29%29) extension method on the [ImageGeneratorBuilder](/en-us/dotnet/api/microsoft.extensions.ai.imagegeneratorbuilder). This method configures the [ImageGenerationOptions](/en-us/dotnet/api/microsoft.extensions.ai.imagegenerationoptions) to be passed to the next generator in the pipeline.
    - Adds logging to the image generator pipeline by calling the [UseLogging(ImageGeneratorBuilder, ILoggerFactory, Action&lt;LoggingImageGenerator&gt;)](/en-us/dotnet/api/microsoft.extensions.ai.loggingimagegeneratorbuilderextensions.uselogging#microsoft-extensions-ai-loggingimagegeneratorbuilderextensions-uselogging%28microsoft-extensions-ai-imagegeneratorbuilder-microsoft-extensions-logging-iloggerfactory-system-action%28%28microsoft-extensions-ai-loggingimagegenerator%29%29%29) extension method.

### Use the image generator in endpoints

Once registered, you can inject `IImageGenerator` into your endpoints or services:

```csharp
// Use the image generator in an endpoint.
app.MapPost("/generate-image", async (IImageGenerator generator, string prompt) =>
{
    ImageGenerationResponse response = await generator.GenerateImagesAsync(prompt);
    DataContent dataContent = response.Contents.OfType<DataContent>().First();

    return Results.File(dataContent.Data.ToArray(), dataContent.MediaType);
});
```

This hosting approach provides several benefits:

- **Configuration management**: Connection strings and settings are managed through the .NET configuration system.
- **Dependency injection**: The image generator is available throughout your application via DI.
- **Lifecycle management**: Services are properly initialized and disposed of by the hosting infrastructure.
- **Testability**: Mock implementations can be easily substituted for testing.
- **Integration with .NET Aspire**: When using .NET Aspire, the `AddAzureOpenAIClient` method integrates with service discovery and telemetry.

## Best practices

When implementing text-to-image generation in your applications, consider these best practices:

- **Prompt engineering**: Write clear, detailed prompts that describe the desired image. Include specific details about style, composition, colors, and elements.
- **Cost management**: Image generation can be expensive. Cache results when possible and implement rate limiting to control costs.
- **Content safety**: Always review generated images for appropriate content, especially in production applications. Consider implementing content filtering and moderation.
- **User experience**: Image generation can take several seconds. Provide progress indicators and handle timeouts gracefully.
- **Legal considerations**: Be aware of licensing and usage rights for generated images. Review the terms of service for your AI provider.

## Clean up resources

When you no longer need the Azure OpenAI resource, delete it to avoid incurring charges:

1. In the [Azure portal](https://portal.azure.com), navigate to your Azure OpenAI resource.
2. Select the resource and then select **Delete**.