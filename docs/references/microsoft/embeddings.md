---
layout: Conceptual
title: How Embeddings Extend Your AI Model's Reach - .NET | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/dotnet/ai/conceptual/embeddings
apiPlatform: dotnet
author: gewarren
breadcrumb_path: /dotnet/breadcrumb/toc.json
feedback_system: OpenSource
feedback_product_url: https://aka.ms/feedback/report?space=61
ms.author: gewarren
ms.devlang: dotnet
ms.service: dotnet
ms.topic: concept-article
show_latex: true
uhfHeaderId: MSDocsHeader-DotNet
ms.subservice: intelligent-apps
ms.collection: ce-skilling-ai-copilot
ms.custom: devx-track-dotnet
ms.update-cycle: 180-days
description: Learn how embeddings extend the limits and capabilities of AI models in .NET.
ms.date: 2026-03-04T00:00:00.0000000Z
ai-usage: ai-assisted
locale: en-us
document_id: d70b2cc0-9695-e722-aae7-f9457b481685
document_version_independent_id: 1049f19b-7e78-6f00-8a76-5735ba840d8b
updated_at: 2026-04-08T00:11:00.0000000Z
original_content_git_url: https://github.com/dotnet/docs/blob/live/docs/ai/conceptual/embeddings.md
gitcommit: https://github.com/dotnet/docs/blob/bb8af03bbed912214e4a7ca4a15fe9d86dd3fb86/docs/ai/conceptual/embeddings.md
git_commit_id: bb8af03bbed912214e4a7ca4a15fe9d86dd3fb86
site_name: Docs
depot_name: VS.core-docs
page_type: conceptual
toc_rel: ../toc.json
pdf_url_template: https://learn.microsoft.com/pdfstore/en-us/VS.core-docs/{branchName}{pdfName}
feedback_help_link_type: ''
feedback_help_link_url: ''
search.mshattr.devlang: csharp
word_count: 696
asset_id: ai/conceptual/embeddings
moniker_range_name: 
monikers: []
item_type: Content
source_path: docs/ai/conceptual/embeddings.md
cmProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/7696cda6-0510-47f6-8302-71bb5d2e28cf
- https://authoring-docs-microsoft.poolparty.biz/devrel/a8711e05-df51-442a-970f-935304535b39
spProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/69c76c32-967e-4c65-b89a-74cc527db725
- https://authoring-docs-microsoft.poolparty.biz/devrel/3d3c20d8-79ed-4203-aee0-ffb9c9bafe72
platformId: 0c96bdf1-5d2c-2e90-2053-16773283c7bc
---

# How Embeddings Extend Your AI Model's Reach - .NET | Microsoft Learn

Embeddings are the way LLMs capture semantic meaning. They're numeric representations of non-numeric data that an LLM can use to determine relationships between concepts. Use embeddings to help an AI model understand the meaning of inputs so that it can perform comparisons and transformations, such as summarizing text or creating images from text descriptions. LLMs can use embeddings immediately, and you can store embeddings in vector databases to provide semantic memory for LLMs as needed.

## Use cases for embeddings

### Use your own data to improve completion relevance

Use your own databases to generate embeddings for your data and integrate it with an LLM to make it available for completions. This use of embeddings is an important component of [retrieval-augmented generation](rag).

### Increase the amount of text you can fit in a prompt

Use embeddings to increase the amount of context you can fit in a prompt without increasing the number of tokens required.

For example, suppose you want to include 500 pages of text in a prompt. The number of tokens for that much raw text exceeds the input token limit, making it impossible to directly include in a prompt. You can use embeddings to summarize and break down large amounts of that text into pieces that are small enough to fit in one input, and then assess the similarity of each piece to the entire raw text. Then you can choose a piece that best preserves the semantic meaning of the raw text and use it in your prompt without hitting the token limit.

### Perform text classification, summarization, or translation

Use embeddings to help a model understand the meaning and context of text, and then classify, summarize, or translate that text. For example, you can use embeddings to help models classify texts as positive or negative, spam or not spam, or news or opinion.

### Generate and transcribe audio

Use audio embeddings to process audio files or inputs in your app.

For example, [Azure Speech in Foundry Tools](/en-us/azure/ai-services/speech-service/) supports a range of audio embeddings, including [speech to text](/en-us/azure/ai-services/speech-service/speech-to-text) and [text to speech](/en-us/azure/ai-services/speech-service/text-to-speech). You can process audio in real-time or in batches.

### Turn text into images or images into text

Semantic image processing requires image embeddings, which most LLMs can't generate. Use an image-embedding model such as [ViT](https://huggingface.co/docs/transformers/main/en/model_doc/vit) to create vector embeddings for images. Then you can use those embeddings with an image generation model to create or modify images using text or vice versa. For example, you can [use the DALL·E model to generate images](/en-us/azure/ai-services/openai/dall-e-quickstart?tabs=dalle3%2Ccommand-line&amp;pivots=programming-language-csharp) such as logos, faces, animals, and landscapes.

### Generate or document code

Use embeddings to help a model create code from text or vice versa, by converting different code or text expressions into a common representation. For example, you can use embeddings to help a model generate or document code in C# or Python.

## Choose an embedding model

You generate embeddings for your raw data by using an AI embedding model, which can encode non-numeric data into a vector (a long array of numbers). The model can also decode an embedding into non-numeric data that has the same or similar meaning as the original, raw data. OpenAI's `text-embedding-3-small` and `text-embedding-3-large` are the currently recommended embedding models, replacing the older `text-embedding-ada-002`. For more examples, see the list of [Embedding models available on Azure OpenAI](/en-us/azure/ai-services/openai/concepts/models#embeddings).

### Store and process embeddings in a vector database

After you generate embeddings, you need a way to store them so you can later retrieve them with calls to an LLM. Vector databases are designed to store and process vectors, so they're a natural home for embeddings. Different vector databases offer different processing capabilities, so you should choose one based on your raw data and your goals. For information about your options, see [Vector databases for .NET + AI](../vector-stores/overview).

### Using embeddings in your LLM solution

When building LLM-based applications, you can use Agent Framework to integrate embedding models and vector stores, so you can quickly pull in text data, and generate and store embeddings. This lets you use a vector database solution to store and retrieve semantic memories.