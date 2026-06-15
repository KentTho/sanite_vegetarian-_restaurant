---
layout: Conceptual
title: Quickstart - Generate images using OpenAI.Images.ImageClient - .NET | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/dotnet/ai/quickstarts/generate-images
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
description: Create a simple app using to generate images using OpenAI.Images.ImageClient in .NET.
ms.date: 2026-03-04T00:00:00.0000000Z
zone_pivot_groups: openai-library
ai-usage: ai-assisted
locale: en-us
document_id: 95714f9e-65fc-1c4e-51b6-053878e299e8
document_version_independent_id: e361c9c1-290b-287e-56d2-f7fd87be5e03
updated_at: 2026-03-11T00:26:00.0000000Z
original_content_git_url: https://github.com/dotnet/docs/blob/live/docs/ai/quickstarts/generate-images.md
gitcommit: https://github.com/dotnet/docs/blob/445380c0eb5c35ea1494005eef6e247c5ddae818/docs/ai/quickstarts/generate-images.md
git_commit_id: 445380c0eb5c35ea1494005eef6e247c5ddae818
site_name: Docs
depot_name: VS.core-docs
page_type: conceptual
toc_rel: ../toc.json
pdf_url_template: https://learn.microsoft.com/pdfstore/en-us/VS.core-docs/{branchName}{pdfName}
feedback_help_link_type: ''
feedback_help_link_url: ''
search.mshattr.devlang: csharp
word_count: 803
asset_id: ai/quickstarts/generate-images
moniker_range_name: 
monikers: []
item_type: Content
source_path: docs/ai/quickstarts/generate-images.md
cmProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/7696cda6-0510-47f6-8302-71bb5d2e28cf
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/8a6e4dad-7050-4ce7-83f9-eb4123577a54
spProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/69c76c32-967e-4c65-b89a-74cc527db725
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/0a5fc323-00ce-4c20-9095-41948f54c83f
platformId: 800518c0-181b-692d-23cc-ba07cb9a7862
---

# Quickstart - Generate images using OpenAI.Images.ImageClient - .NET | Microsoft Learn

In this quickstart, you create a .NET console app that uses `OpenAI.Images.ImageClient` to generate images using an OpenAI or Azure OpenAI DALL-E AI model. These models generate images from text prompts.

::: zone pivot="openai"

## Prerequisites

- .NET 8.0 SDK or higher - [Install the .NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).
- An [API key from OpenAI](https://platform.openai.com/docs/libraries#create-and-export-an-api-key) so you can run this sample.

::: zone-end

::: zone pivot="azure-openai"

## Prerequisites

- .NET 8.0 SDK or higher - [Install the .NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).
- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Developer CLI (optional) - [Install or update the Azure Developer CLI](/en-us/azure/developer/azure-developer-cli/install-azd).

::: zone-end

## Create the app

Complete the following steps to create a .NET console app to connect to an AI model.

1. In an empty directory on your computer, use the `dotnet new` command to create a new console app:

    ```dotnetcli
    dotnet new console -o ImagesAI
    ```
2. Change directory into the app folder:

    ```dotnetcli
    cd ImagesAI
    ```
3. Install the required packages:

::: zone pivot="azure-openai"

    ```bash
    dotnet add package Azure.AI.OpenAI
    dotnet add package Azure.Identity
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```

::: zone-end

::: zone pivot="openai"

    ```bash
    dotnet add package OpenAI
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```

::: zone-end
4. Open the app in Visual Studio Code or your editor of choice.

    ```bash
    code .
    ```

::: zone pivot="azure-openai"

## Create the AI service

1. To provision an Azure OpenAI service and model, complete the steps in the [Create and deploy an Azure OpenAI Service resource](/en-us/azure/ai-services/openai/how-to/create-resource) article.
2. From a terminal or command prompt, navigate to the root of your project directory.
3. Run the following commands to configure your Azure OpenAI endpoint and model name for the sample app:

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set AZURE_OPENAI_ENDPOINT <your-Azure-OpenAI-endpoint>
    dotnet user-secrets set AZURE_OPENAI_GPT_NAME <your-Azure-OpenAI-model-name>
    dotnet user-secrets set AZURE_OPENAI_API_KEY <your-Azure-OpenAI-key>
    ```

::: zone-end

::: zone pivot="openai"

## Configure the app

1. Navigate to the root of your .NET project from a terminal or command prompt.
2. Run the following commands to configure your OpenAI API key as a secret for the sample app:

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set OpenAIKey <your-OpenAI-key>
    dotnet user-secrets set ModelName <your-OpenAI-model-name>
    ```

::: zone-end

## Add the app code

1. In the `Program.cs` file, add the following code to connect and authenticate to the AI model.

::: zone pivot="azure-openai"

    ```csharp
    using Microsoft.Extensions.Configuration;
    using OpenAI.Images;
    using System.ClientModel;
    using Azure.AI.OpenAI;
    using Azure.Identity;
    
    // Retrieve the local secrets saved during the Azure deployment. If you skipped the deployment
    // because you already have an Azure OpenAI available, edit the following lines to use your information,
    // e.g. string openAIEndpoint = "https://cog-demo123.openai.azure.com/";
    var config = new ConfigurationBuilder().AddUserSecrets<Program>().Build();
    string endpoint = config["AZURE_OPENAI_ENDPOINT"];
    string deployment = config["AZURE_OPENAI_DALLE_NAME"];
    
    // Create the Azure OpenAI ImageClient
    ImageClient client =
        new AzureOpenAIClient(new Uri(endpoint), new DefaultAzureCredential())
            .GetImageClient(deployment);
    
    // Generate the image
    GeneratedImage generatedImage = await client.GenerateImageAsync("""
        A postal card with an happy hiker waving and a beautiful mountain in the background.
        There is a trail visible in the foreground.
        The postal card has text in red saying: 'You are invited for a hike!'
        """, new ImageGenerationOptions { Size = GeneratedImageSize.W1024xH1024 });
    
    Console.WriteLine($"The generated image is ready at:\n{generatedImage.ImageUri}");
    ```

Note

[DefaultAzureCredential](/en-us/dotnet/api/azure.identity.defaultazurecredential) searches for authentication credentials from your local tooling. If you aren't using the `azd` template to provision the Azure OpenAI resource, you'll need to assign the `Azure AI Developer` role to the account you used to sign in to Visual Studio or the Azure CLI. For more information, see [Authenticate to Foundry tools with .NET](../azure-ai-services-authentication).

::: zone-end

::: zone pivot="openai"

    ```csharp
    ﻿// Licensed to the .NET Foundation under one or more agreements.
    // The .NET Foundation licenses this file to you under the MIT license.
    // See the LICENSE file in the project root for more information.
    using Microsoft.Extensions.Configuration;
    using OpenAI.Images;
    // Retrieve the local secrets that were set from the command line, using:
    // dotnet user-secrets init
    // dotnet user-secrets set OpenAIKey <your-openai-key>
    var config = new ConfigurationBuilder().AddUserSecrets<Program>().Build();
    string key = config["OpenAIKey"];
    string modelName = config["ModelName"];
    
    // Create the OpenAI ImageClient
    ImageClient client = new(modelName, key);
    
    // Generate the image
    GeneratedImage generatedImage = await client.GenerateImageAsync("""
        A postal card with a happy hiker waving and a beautiful mountain in the background.
        There is a trail visible in the foreground.
        The postal card has text in red saying: 'You are invited for a hike!'
        """,
        new ImageGenerationOptions 
        {
            Size = GeneratedImageSize.W1024xH1024 
        });
    
    Console.WriteLine($"The generated image is ready at:\n{generatedImage.ImageUri}");
    ```

::: zone-end

    The preceding code:

    - Reads essential configuration values from the project user secrets to connect to the AI model.
    - Creates an `OpenAI.Images.ImageClient` to connect to the AI model.
    - Sends a prompt to the model that describes the desired image.
    - Prints the URL of the generated image to the console output.
2. Run the app:

    ```dotnetcli
    dotnet run
    ```

    Navigate to the image URL in the console output to view the generated image. Customize the text content of the prompt to create new images or modify the original.

::: zone pivot="azure-openai"

## Clean up resources

If you no longer need them, delete the Azure OpenAI resource and GPT-4 model deployment.

1. In the [Azure portal](https://aka.ms/azureportal), navigate to the Azure OpenAI resource.
2. Select the Azure OpenAI resource, and then select **Delete**.

::: zone-end