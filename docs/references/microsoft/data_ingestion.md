---
layout: Conceptual
title: Data ingestion - .NET | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/dotnet/ai/conceptual/data-ingestion
apiPlatform: dotnet
author: luisquintanilla
breadcrumb_path: /dotnet/breadcrumb/toc.json
feedback_system: OpenSource
feedback_product_url: https://aka.ms/feedback/report?space=61
ms.author: luquinta
ms.devlang: dotnet
ms.service: dotnet
ms.topic: concept-article
show_latex: true
uhfHeaderId: MSDocsHeader-DotNet
ms.subservice: intelligent-apps
ms.collection: ce-skilling-ai-copilot
ms.custom: devx-track-dotnet
ms.update-cycle: 180-days
description: Introduction to data ingestion
ms.date: 2025-12-02T00:00:00.0000000Z
ai-usage: ai-assisted
locale: en-us
document_id: ae02fe77-9818-6d66-8db1-8f31bc9b3011
document_version_independent_id: f7b283fa-738f-04b2-fed0-bbda5a114da7
updated_at: 2026-05-13T20:49:00.0000000Z
original_content_git_url: https://github.com/dotnet/docs/blob/live/docs/ai/conceptual/data-ingestion.md
gitcommit: https://github.com/dotnet/docs/blob/66c7421f73be03f2f839bc8e70bdc3a709905068/docs/ai/conceptual/data-ingestion.md
git_commit_id: 66c7421f73be03f2f839bc8e70bdc3a709905068
site_name: Docs
depot_name: VS.core-docs
page_type: conceptual
toc_rel: ../toc.json
pdf_url_template: https://learn.microsoft.com/pdfstore/en-us/VS.core-docs/{branchName}{pdfName}
feedback_help_link_type: ''
feedback_help_link_url: ''
search.mshattr.devlang: csharp
word_count: 1008
asset_id: ai/conceptual/data-ingestion
moniker_range_name: 
monikers: []
item_type: Content
source_path: docs/ai/conceptual/data-ingestion.md
cmProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/7696cda6-0510-47f6-8302-71bb5d2e28cf
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/12ed19f9-ebdf-4c8a-8bcd-7a681836774d
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/c6f99e62-1cf6-4b71-af9b-649b05f80cce
spProducts:
- https://authoring-docs-microsoft.poolparty.biz/devrel/69c76c32-967e-4c65-b89a-74cc527db725
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/3a764584-4f97-452b-8f1d-36f19b12f6ae
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/3f56b378-07a9-4fa1-afe8-9889fdc77628
platformId: 5df75ff7-87ec-ef26-316b-14c868beec16
---

# Data ingestion - .NET | Microsoft Learn

Data ingestion is the process of collecting, reading, and preparing data from different sources such as files, databases, APIs, or cloud services so it can be used in downstream applications. In practice, this process follows the Extract-Transform-Load (ETL) workflow:

- **Extract** data from its original source, whether that is a PDF, Word document, audio file, or web API.
- **Transform** the data by cleaning, chunking, enriching, or converting formats.
- **Load** the data into a destination like a database, vector store, or AI model for retrieval and analysis.

For AI and machine learning scenarios, especially retrieval-augmented generation (RAG), data ingestion is not just about converting data from one format to another. It is about making data usable for intelligent applications. This means representing documents in a way that preserves their structure and meaning, splitting them into manageable chunks, enriching them with metadata or embeddings, and storing them so they can be retrieved quickly and accurately.

## Why data ingestion matters for AI applications

Imagine you're building a RAG-powered chatbot to help employees find information across your company's vast collection of documents. These documents might include PDFs, Word files, PowerPoint presentations, and web pages scattered across different systems.

Your chatbot needs to understand and search through thousands of documents to provide accurate, contextual answers. But raw documents aren't suitable for AI systems. You need to transform them into a format that preserves meaning while making them searchable and retrievable.

This is where data ingestion becomes critical. You need to extract text from different file formats, break large documents into smaller chunks that fit within AI model limits, enrich the content with metadata, generate embeddings for semantic search, and store everything in a way that enables fast retrieval. Each step requires careful consideration of how to preserve the original meaning and context.

## Data ingestion building blocks

The [Microsoft.Extensions.DataIngestion](medi-library) library is built around several key components that work together to create a complete data processing pipeline. This section explores each component and how they fit together.

### Documents and document readers

At the foundation of the library is the [IngestionDocument](/en-us/dotnet/api/microsoft.extensions.dataingestion.ingestiondocument) type, which provides a unified way to represent any file format without losing important information. `IngestionDocument` is Markdown-centric because large language models work best with Markdown formatting.

The [IngestionDocumentReader](/en-us/dotnet/api/microsoft.extensions.dataingestion.ingestiondocumentreader) abstraction handles loading documents from various sources, whether local files or streams. A few readers are available:

- **[MarkItDown](https://www.nuget.org/packages/Microsoft.Extensions.DataIngestion.MarkItDown)**
- **[Markdig](https://www.nuget.org/packages/Microsoft.Extensions.DataIngestion.Markdig/)**

More readers (including **LlamaParse** and **Azure Document Intelligence**) will be added in the future.

This design means you can work with documents from different sources using the same consistent API, making your code more maintainable and flexible.

### Document processing

Document processors apply transformations at the document level to enhance and prepare content. The library provides the [ImageAlternativeTextEnricher](/en-us/dotnet/api/microsoft.extensions.dataingestion.imagealternativetextenricher) class as a built-in processor that uses large language models to generate descriptive alternative text for images within documents.

### Chunks and chunking strategies

Once you have a document loaded, you typically need to break it down into smaller pieces called chunks. Chunks represent subsections of a document that can be efficiently processed, stored, and retrieved by AI systems. This chunking process is essential for retrieval-augmented generation scenarios where you need to find the most relevant pieces of information quickly.

The library provides several chunking strategies to fit different use cases:

- **Header-based chunking** to split on headers.
- **Section-based chunking** to split on sections (for example, pages).
- **Semantic-aware chunking** to preserve complete thoughts.

These chunking strategies build on the Microsoft.ML.Tokenizers library to intelligently split text into appropriately sized pieces that work well with large language models. The right chunking strategy depends on your document types and how you plan to retrieve information.

```csharp
Tokenizer tokenizer = TiktokenTokenizer.CreateForModel("gpt-5");
IngestionChunkerOptions options = new(tokenizer)
{
    MaxTokensPerChunk = 2000,
    OverlapTokens = 0
};
IngestionChunker<string> chunker = new HeaderChunker(options);
```

### Chunk processing and enrichment

After documents are split into chunks, you can apply processors to enhance and enrich the content. Chunk processors work on individual pieces and can perform:

- **Content enrichment** including automatic summaries (`SummaryEnricher`), sentiment analysis (`SentimentEnricher`), and keyword extraction (`KeywordEnricher`).
- **Classification** for automated content categorization based on predefined categories (`ClassificationEnricher`).

These processors use [Microsoft.Extensions.AI.Abstractions](https://www.nuget.org/packages/Microsoft.Extensions.AI.Abstractions) to leverage large language models for intelligent content transformation, making your chunks more useful for downstream AI applications.

### Document writer and storage

[IngestionChunkWriter&lt;T&gt;](/en-us/dotnet/api/microsoft.extensions.dataingestion.ingestionchunkwriter-1) stores processed chunks into a data store for later retrieval. The library, which uses [Microsoft.Extensions.AI](/en-us/dotnet/api/microsoft.extensions.ai) and [Microsoft.Extensions.VectorData](/en-us/dotnet/api/microsoft.extensions.vectordata), provides the [VectorStoreWriter&lt;T&gt;](/en-us/dotnet/api/microsoft.extensions.dataingestion.vectorstorewriter-1) class. This writer supports storing chunks in any [vector store](../vector-stores/overview) supported by [Microsoft.Extensions.VectorData](/en-us/dotnet/api/microsoft.extensions.vectordata).

Vector stores include popular options like [Qdrant](https://www.nuget.org/packages/Microsoft.SemanticKernel.Connectors.Qdrant), [SQL Server](https://www.nuget.org/packages/Microsoft.SemanticKernel.Connectors.SqlServer), [CosmosDB](https://www.nuget.org/packages/Microsoft.SemanticKernel.Connectors.CosmosNoSQL), [MongoDB](https://www.nuget.org/packages/Microsoft.SemanticKernel.Connectors.MongoDB), and [ElasticSearch](https://www.nuget.org/packages/Elastic.SemanticKernel.Connectors.Elasticsearch). For more information about providers, see [Out-of-the-box Vector Store providers](/en-us/semantic-kernel/concepts/vector-store-connectors/out-of-the-box-connectors/). (Despite the inclusion of "SemanticKernel" in the package names, these providers have nothing to do with Semantic Kernel and are usable anywhere in .NET, including Agent Framework.)

The writer can also automatically generate embeddings for your chunks using [Microsoft.Extensions.AI](/en-us/dotnet/api/microsoft.extensions.ai), readying them for semantic search and retrieval scenarios.

```csharp
OpenAIClient openAIClient = new(
    new ApiKeyCredential(Environment.GetEnvironmentVariable("GITHUB_TOKEN")!),
    new OpenAIClientOptions { Endpoint = new Uri("https://models.github.ai/inference") });

IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator =
    openAIClient.GetEmbeddingClient("text-embedding-3-small").AsIEmbeddingGenerator();

using SqliteVectorStore vectorStore = new(
    "Data Source=vectors.db;Pooling=false",
    new()
    {
        EmbeddingGenerator = embeddingGenerator
    });

// The writer requires the embedding dimension count to be specified.
// For OpenAI's `text-embedding-3-small`, the dimension count is 1536.
using VectorStoreWriter<string> writer = new(vectorStore, dimensionCount: 1536);
```

### Document processing pipeline

The [IngestionPipeline&lt;T&gt;](/en-us/dotnet/api/microsoft.extensions.dataingestion.ingestionpipeline-1) API allows you to chain together the various data ingestion components into a complete workflow. You can combine:

- **Readers** to load documents from various sources.
- **Processors** to transform and enrich document content.
- **Chunkers** to break documents into manageable pieces.
- **Writers** to store the final results in your chosen data store.

This pipeline approach reduces boilerplate code and makes it easy to build, test, and maintain complex data ingestion workflows.

```csharp
using IngestionPipeline<string> pipeline = new(reader, chunker, writer, loggerFactory: loggerFactory)
{
    DocumentProcessors = { imageAlternativeTextEnricher },
    ChunkProcessors = { summaryEnricher }
};

await foreach (var result in pipeline.ProcessAsync(new DirectoryInfo("."), searchPattern: "*.md"))
{
    Console.WriteLine($"Completed processing '{result.DocumentId}'. Succeeded: '{result.Succeeded}'.");
}
```

A single document ingestion failure shouldn't fail the whole pipeline. That's why [IngestionPipeline&lt;T&gt;.ProcessAsync](/en-us/dotnet/api/microsoft.extensions.dataingestion.ingestionpipeline-1.processasync) implements partial success by returning `IAsyncEnumerable<IngestionResult>`. The caller is responsible for handling any failures (for example, by retrying failed documents or stopping on first error).