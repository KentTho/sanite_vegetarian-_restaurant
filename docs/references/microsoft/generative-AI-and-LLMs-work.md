---
layout: Conceptual
title: How Generative AI and LLMs work - .NET | Microsoft Learn
canonicalUrl: https://learn.microsoft.com/en-us/dotnet/ai/conceptual/how-genai-and-llms-work
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
description: Understand how Generative AI and large language models (LLMs) work and how they might be useful in your .NET projects.
ms.date: 2026-03-04T00:00:00.0000000Z
ai-usage: ai-assisted
locale: en-us
document_id: 6bb090a7-725c-e7bc-fb6b-c2f0da19dfea
document_version_independent_id: 2e6caaf9-25ab-335b-aafe-d1aed966b7fc
updated_at: 2026-03-13T17:46:00.0000000Z
original_content_git_url: https://github.com/dotnet/docs/blob/live/docs/ai/conceptual/how-genai-and-llms-work.md
gitcommit: https://github.com/dotnet/docs/blob/1e50cdad984ce8cc68e4fd9fd56b69694b1d045e/docs/ai/conceptual/how-genai-and-llms-work.md
git_commit_id: 1e50cdad984ce8cc68e4fd9fd56b69694b1d045e
site_name: Docs
depot_name: VS.core-docs
page_type: conceptual
toc_rel: ../toc.json
pdf_url_template: https://learn.microsoft.com/pdfstore/en-us/VS.core-docs/{branchName}{pdfName}
feedback_help_link_type: ''
feedback_help_link_url: ''
search.mshattr.devlang: csharp
word_count: 1218
asset_id: ai/conceptual/how-genai-and-llms-work
moniker_range_name: 
monikers: []
item_type: Content
source_path: docs/ai/conceptual/how-genai-and-llms-work.md
cmProducts:
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/c6f99e62-1cf6-4b71-af9b-649b05f80cce
spProducts:
- https://microsoft-devrel.poolparty.biz/DevRelOfferingOntology/3f56b378-07a9-4fa1-afe8-9889fdc77628
platformId: 57a28347-1ee9-fd28-0f83-5d1f1d7bb3a5
---

# How Generative AI and LLMs work - .NET | Microsoft Learn

Generative AI is a type of artificial intelligence that can create original content, such as natural language, images, audio, and code. The output depends on the inputs you provide. Users commonly interact with generative AI through chat applications that use natural language as input. ChatGPT, developed by OpenAI, is a popular example. Generative AI applications that use natural language as input are powered by large language models (LLMs) to perform natural language processing (NLP).

## How generative AI works

All generative AI is built on models. These models are trained with large sets of data in the form of content, such as natural language, images, audio, and code. Generative AI models use the patterns identified in the training data to produce new, statistically similar content.

The AI model uses your input to build an output. The model first parses the input into a form it can understand. The model then uses that data to identify matching patterns from its training that it combines to build the final output. Generative AI models are designed to produce unique content, so they won't generate the same output for identical inputs.

Generative AI applications that support natural language as input or output use LLMs to do so. The LLM performs NLP, which classifies the input text and determines its sentiment. The generative AI model uses that classification and sentiment analysis to identify patterns and build the output. If the output is text, the LLM alone generates it. If the output is audio or images, additional models provide the data and patterns for generating outputs in that format.

## Common uses of generative AI

Generative AI applications support a variety of use cases and outputs, described in the following sections.

### Natural language generation

Some generative AI applications can produce natural language outputs, such as:

- Professionally worded summaries for a LinkedIn profile
- Rich descriptions of items in an online storefront
- Ideas for healthy meals

For example, given the user input *Give me three ideas for a healthy breakfast including peppers*, a generative AI application might produce the following output:

*OK, here are three healthy breakfasts that include peppers:*

1. *Egg and Pepper Scramble: Dice up some bell peppers and sauté them in a pan until they're slightly softened. Then, add in some beaten eggs and scramble everything together. Serve with whole-grain toast for a nutritious breakfast.*
2. *Pepper and Avocado Toast: Toast a slice of whole-grain bread and top it with sliced bell peppers, mashed avocado, and a sprinkle of salt and pepper. This is a great way to get some healthy fats from the avocado along with the vitamin C from the peppers.*
3. *Breakfast Burrito with Peppers: Sauté some diced bell peppers, onions, and scrambled eggs together in a pan. Then, spoon the mixture onto a whole-grain tortilla and top with some salsa or hot sauce. Roll it up and enjoy a satisfying and nutritious breakfast.*

### Image generation

Some generative AI applications produce image outputs from natural language inputs. Depending on the application and its models, users might be able to specify:

- The people or things to appear in the image
- The artistic style to create the image in
- References for generating similar images

Image generation can create virtual avatars for online accounts, design logos for a business, or provide artistic inspiration for creators. For example, a user might input the request, *Create an image of an elephant eating a burger*. A generative AI application might produce the following output:

[![Example AI generated image of an elephant eating a hamburger.](../media/how-genai-and-llms-work/generated-image.png)](../media/how-genai-and-llms-work/generated-image.png#lightbox)

### Audio generation

Some generative AI applications produce audio outputs from natural language inputs. Depending on the application and its models, users might be able to:

- Synthesize natural sounding voices from input text
- Create music in a specific style or featuring certain instruments
- Modify input audio files based on set criteria provided in natural language

Audio generation can provide spoken responses from digital voice assistants, add backing instruments to songs for music production, or reproduce a user's original voice from reference recordings.

### Code generation

Some generative AI applications produce code from natural language inputs. Depending on the application and its models, users might be able to generate code that:

- Is in the language of their choice
- Accepts a specific input and output structure
- Uses specific technologies based on their reference documentation

Code generation can provide quick implementations of common operations, such as sort or filter data, speed up translating code from one language to another, or answer questions about a technology based on specified reference documentation. For example, given the input "Show me how to code a game of tic-tac-toe with C#", a generative AI application might produce the following output:

*Here's a simple example of how you can code a game of tic-tac-toe in C#:*

```csharp
using System;

namespace TicTacToe
{
    class Program
    {
        static char[] board = { '1', '2', '3', '4', '5', '6', '7', '8', '9' };
        static int player = 1; // Player 1 will start
        static int choice; // The number the player chooses
        static int flag = 0; // Set the flag value to 0

        // Check if the position is already marked or not
        private static int CheckPosition(char mark)
        {
            for (int i = 0; i < 9; i++)
            {
                if (board[i] == mark)
                {
                    return 1;
                }
            }
            return 0;
        }

        // The rest of the generated code has been omitted for brevity
        // ...
    }
}
```

*This code creates a simple console-based tic-tac-toe game in C#. It uses a single-dimensional array to represent the board and checks for a win or draw after each move.*

## How LLMs work

When training an LLM, the training text is first broken down into [tokens](understanding-tokens). Each token identifies a unique text value. A token can be a distinct word, a partial word, or a combination of words and punctuation. Each token is assigned an ID, which enables the text to be represented as a sequence of token IDs.

After the text has been broken down into tokens, a contextual vector, known as an [embedding](embeddings), is assigned to each token. These embedding vectors are multi-valued numeric data where each element of a token's vector represents a semantic attribute of the token. The elements of a token's vector are determined based on how commonly tokens are used together or in similar contexts.

The goal is to predict the next token in the sequence based on the preceding tokens. The model assigns a weight to each token in the existing sequence, representing its relative influence on the next token. The model then uses the preceding tokens' weights and embeddings to calculate and predict the next vector value. The model then selects the most probable token to continue the sequence based on the predicted vector.

This process continues iteratively for each token in the sequence, with the output sequence being used regressively as the input for the next iteration. The output is built one token at a time. This strategy is analogous to how auto-complete works, where suggestions are based on what's been typed so far and updated with each new input.

During training, the model knows the complete token sequence but ignores all tokens after the one currently being considered. The model compares the predicted vector value to the actual value and calculates the loss. Training then incrementally adjusts the weights to reduce the loss and improve the model.